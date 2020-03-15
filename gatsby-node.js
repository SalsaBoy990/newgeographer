const path = require("path")
const fetch = require("node-fetch")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/blog-post.js")
  const tagTemplate = path.resolve("src/templates/tags.js")

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___date }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges

  // console.log(JSON.stringify(result, null, 4))
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: post.node.fields.slug,
        next,
        previous,
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    createPage({
      path: `/cimke/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

    // Create blog-list pages
    const postsPerPage = 4
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve("./src/templates/index.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

}

// ./gatsby-node.js
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/my-files/)) {
    page.matchPath = "/my-files/*"

    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  try {
    const { createNode } = actions

    // Fetch the data from api
    const res = await fetch(
      `https://m2.mtmt.hu/api/publication?cond=published;eq;true&cond=core;eq;true&cond=authors.mtid;eq;10059234&sort=publishedYear,desc&sort=firstAuthor,asc&size=20&fields=template&labelLang=hun&cite_type=2&page=1&format=json`
    )

    // Transform data to json
    const data = await res.json()

    // console.log(data.content)

    // Map over the results array, calling action.createNode on each item in the array
    data.content.forEach(publication => {
      const node = {
        ...publication, // We copy all of the properties from the publication object
        id: createNodeId(`publication${publication.mtid}`), // Needs to be unique
        internal: {
          type: 'Publication',
          contentDigest: createContentDigest(publication) // We pass in the publication object to make sure it's unique
        }
      }

      // Create the actual data node
      createNode(node)
    })
  } catch (error) {
    console.error(err)
  }
}
