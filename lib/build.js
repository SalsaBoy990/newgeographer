(function () {
  'use strict'
  // store start time
  const startTime = process.hrtime()

  // logger funtion on command line with styling
  const log = require('./utils/logger')

  log.info('Building site...')

  // load utility functions
  const ssg = require('./utils/utils')

  // file system module with extended functionality
  const fse = require('fs-extra')
  const path = require('path')

  // search for matching files, returns array of filenames
  const glob = require('glob')

  // site configuration properties
  const config = require('../site.config')

  // source directory
  const srcPath = './src'
  // destination folder to where the static site will be generated
  const distPath = './public'

  // renders ejs layouts to html
  const ejsRender = require('ejs').render

  // render markdown to HTML
  const md = require('markdown-it')()
  const implicitFigures = require('markdown-it-implicit-figures')
  const markdownItTable = require('markdown-it-multimd-table')
  const markdownItSup = require('markdown-it-sup')
  const markdownItSub = require('markdown-it-sub')
  const markdownItAttrs = require('markdown-it-attrs')
  const markdownItHighlightjs = require('markdown-it-highlightjs')

  md.use(implicitFigures, {
    dataType: false, // <figure data-type="image">, default: false
    figcaption: true, // <figcaption>alternative text</figcaption>, default: false
    tabindex: false, // <figure tabindex="1+n">..., default: false
    link: false // <a href="img.png"><img src="img.png"></a>, default: false
  })

  md.use(markdownItTable)
  md.use(markdownItSup)
  md.use(markdownItSub)
  md.use(markdownItAttrs)
  md.use(markdownItHighlightjs)

  // Store the paths to the blogposts for the links in the index page
  const postsDataForIndexPage = []

  // clear destination folder first, it needs to be synchronous
  fse.emptyDirSync(distPath)

  // copy assets folder (contains images, scripts and css) and favicon folder to destination
  ssg.copyAssetsFaviconFolders(srcPath, distPath)

  // copy _headers file to the root of /public folder
  ssg.copyHeadersFile(srcPath, distPath)

  // copy admin folder to the root of /public folder
  ssg.copyAdminFolder(srcPath, distPath)

  // Build the blogposts
  // cwd: current working directory
  const files = glob.sync('**/*.@(ejs|md)', {
    cwd: `${srcPath}/posts`
  })

  const articlesPerPage = 4
  // Get the number of index pages needed for pagination
  let pageNumber = Math.ceil(files.length / articlesPerPage)
  console.log({pageNumber})

  try {
    files.forEach((file) => {
      const fileData = path.parse(file)

      // generate canonical url for the post
      const canonicalUrl = ssg.generateCanonicalURL(fileData, config)

      // generate postid for the post (needed for disqus)
      const postId = ssg.generatePostId(fileData)

      // make output directories for the posts
      const destPath = path.join(distPath, fileData.dir)
      fse.mkdirsSync(destPath)

      // file path
      const pathToFile = `${srcPath}/posts/${file}`

      // read data from file and then render post
      const postData = ssg.getPostDataFromMarkdown(pathToFile)

      // change date format
      const dateFormatted = ssg.convertDateFormat(postData, pathToFile, [
        'január', 'február', 'március',
        'április', 'május', 'június',
        'július', 'augusztus', 'szeptember',
        'október', 'november', 'december'
      ])

      // convert md to HTML
      const postContents = md.render(postData.body)

      const templateConfig = Object.assign({}, config, {
        title: postData.attributes.title,
        date: dateFormatted,
        excerpt: postData.attributes.excerpt,
        comments: (postData.attributes.comments) ? postData.attributes.comments : false,
        topic: (postData.attributes.topic) ? postData.attributes.topic : false,
        body: postContents,
        canonicalUrl: canonicalUrl,
        postId: postId,
        postTitleMeta: config.site.title + ': ' + postData.attributes.title
      })

      // save postdata for the index page
      ssg.savePostDataForIndexPage(fileData, dateFormatted, postData, postsDataForIndexPage)

      // read layout data from file and then render layout with post contents
      const layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/blogpost.ejs`, 'utf-8'),
        templateConfig, { filename: `${srcPath}/layouts/blogpost.ejs` })

      // save the rendered blogposts to destination folder
      ssg.saveBlogpostsHTML(fileData, destPath, layoutContent)
    })
    console.log('Posts OK...')
  } catch (err) {
    console.error(err)
    console.error('Build posts failed...')
  }

  let blogArchive = []

  // get the postsData for the archive on the index page grouped by year
  ssg.getDataForArchive(postsDataForIndexPage, config, blogArchive)

  // Build subpages (in our example the index, about, book pages)
  // cwd: current working directory
  const paginator = glob.sync('**/*.ejs', {
    cwd: `${srcPath}/paginator`
  })

  try {
    paginator.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // make directory
      fse.mkdirsSync(destPath)

      // read data from file and then render page
      let layoutContent
      let startIndex = 0
      let i
      for (i = 0; i < pageNumber; i++) {
        let indexPage = false
        if (i === 0) {
          indexPage = true
        }
        const pageContents = ejsRender(fse.readFileSync(`${srcPath}/paginator/${file}`, 'utf-8'), Object.assign({}, config, {
          postsDataForIndexPage: postsDataForIndexPage,
          blogArchive: blogArchive,
          startIndex: startIndex,
          maxIndex: ((startIndex + articlesPerPage) < postsDataForIndexPage.length) ? (startIndex + articlesPerPage) : (postsDataForIndexPage.length),
          pageNumber: i + 1,
          maxPages: pageNumber,
          indexPage: indexPage
        }))

        // The next index page in the paginator starts with the first element of the next 'articlesPerPage'
        startIndex += articlesPerPage

        // read layout data from file and then render layout with page contents
        layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/home.ejs`, 'utf-8'), Object.assign({}, config, postsDataForIndexPage, {
          title: config.site.title,
          body: pageContents,
          canonicalUrl: config.site.url + `index/${i + 1}`,
          description: config.site.quote
        }), { filename: `${srcPath}/layouts/home.ejs` })

        // save the html file
        if (i === 0) {
          fse.writeFileSync(`${destPath}/index.html`, layoutContent)
        } else {
          fse.writeFileSync(`${destPath}/${i + 1}.html`, layoutContent)
        }
      }
    })
    console.log('Paginator OK...')
  } catch (err) {
    console.error(err)
    console.error('Build paginator failed...')
  }

  // Build subpages (in our example the index, about, book pages)
  // cwd: current working directory
  const pages = glob.sync('**/*.ejs', {
    cwd: `${srcPath}/pages`
  })

  try {
    pages.forEach((file) => {
      const fileData = path.parse(file)
      const destPath = path.join(distPath, fileData.dir)

      // read data from file and then render page
      const pageContents = ejsRender(fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8'), Object.assign({}, config, {
        postsDataForIndexPage: postsDataForIndexPage,
        blogArchive: blogArchive
      }))

      const name = fileData.base
      let layoutContent

      // read layout data from file and then render layout with page contents
      switch (name) {
        default:
          layoutContent = ejsRender(fse.readFileSync(`${srcPath}/layouts/not-found.ejs`, 'utf-8'), Object.assign({}, config, {
            title: '404: A keresett oldal nem található / ' + config.site.title,
            body: pageContents,
            canonicalUrl: config.site.url + '/' + fileData.name,
            description: 'Are you sure this is the right url?'
          }), { filename: `${srcPath}/layouts/not-found.ejs` })
          break
      }
      // save the html file
      fse.writeFileSync(`${destPath}/${fileData.name}.html`, layoutContent)
    })
    console.log('Pages OK...')
  } catch (err) {
    console.error(err)
    console.error('Build pages failed...')
  }

  // display build time
  const timeDiff = process.hrtime(startTime)
  const duration = timeDiff[0] * 1000 + timeDiff[1] / 1e6
  log.success(`Site built successfully in ${duration}ms`)
})()
