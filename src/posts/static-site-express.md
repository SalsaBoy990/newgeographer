---
title: static-site-express, a Node.js-based static site generator
date: '2019-09-11'
excerpt: >-
  static-site-express is a simple Node.js based static-site generator that uses
  EJS and Markdown. You can deploy your static site to the Netlify or to the
  Heroku cloud platform.
tags:
 - statikus oldalgenerátor
 - in English
 - JavaScript
featuredImage: ../images/lightning-strike.jpg
attachments:
---

Let's write about frontend development using the JAMStack.

There are two distinct approaches when it comes to websites:

1. either you build a **static website**,
2. or a **dynamic website**.


I will cover the first one here. Generally, you need to use some kind of a **static site generator** (SSG) to generate your website into a specific folder. You need a way to effectively manage your posts, various assets and files.

There are countless SSGs in the market, the most popular ones are:

- [Jekyll](https://jekyllrb.com/) (based on Ruby, templates: Liquid)
- [Hugo](https://gohugo.io/) (based on Go, templates: Go)
- [Next.js](https://nextjs.org/) (based on JavaScript, templates: React)
- [Gatsby](https://www.gatsbyjs.org/) (based on JavaScript, templates: React)
- you can [check out the rest here.](https://www.staticgen.com/)

## The JAMStack

Static site generators are using the JAMStack architecture. The short definition is:

A modern architecture
Create fast and secure sites and dynamic apps with **J**avaScript, **A**PIs, and prerendered **M**arkup, served without web servers.

The three core component of JAMstack are:

### 1. JavaScript
Any dynamic programming during the request/response cycle is handled by JavaScript, running entirely on the client. This could be any frontend framework, library, or even vanilla JavaScript.

### 2. APIs
All server-side processes or database actions are abstracted into reusable APIs, accessed over HTTPS with JavaScript. These can be custom-built or leverage third-party services.

### 3. Markup
Templated markup should be prebuilt at deploy time, usually using a site generator for content sites, or a build tool for web apps.

The JAMStack approach has many advantages:
- Better Performance
- Cheaper, Easier Scaling
- Higher Security
- Better Developer Experience

For more information, please [check out this resource](https://jamstack.org/).

### Short history of the JAMStack

**2015:**
Static sites are becoming popular due to the popularity of certain SSG such as [Jekyll](https://jekyllrb.com/).

**2016:**
A small group of developers believe that Static sites don't have to be static and the term "JAMstack" comes to life.

**2017:**
The modern web revolution starts prioritising the importance of performance, scalability and developer experience. The term JAMstack starts to be adopted by a wider group of developers and the first enterprise JAMstack projects are announced.

**2018:**
Tools like [Netlify](https://www.netlify.com/), [Gatsby](https://www.gatsbyjs.org/) and Contentful have helped promote the term and the community is rapidly growing. This was also the year of the first JAMstack Conference.

For more information, please [check out this resource](https://jamstack.wtf/).

## static-site-express is a SSG written in Node.js

### The beginnings
My first encounter with static site generators was around 2017. I found [the blog of Michael Lee](https://michaelsoolee.com/jekyll-field-guide/), a NYC-based web developer where I read about Jekyll, one of the most-widely used SSGs out there. My first websites were based on Jekyll and I used [Github Pages](https://pages.github.com/). I use GitHub for version control.

After that, I switched to using the [Netlify cloud platform](https://www.netlify.com/). Netlify is a San Francisco-based cloud computing company that offers hosting and serverless backend services for static websites. At that time, I was wondering what if I could use a custom-made SSG to build my static site using Netlify. It turned out it is easy to do: just need to tell Netlify the build command (the script to run) and the name of your folder to where your site is generated. Just create a configuration file with the name and extension in the root of your website: `netlify.toml`, and set these properties:

```toml
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
```
Netlify will automatically install Node.js and your npm packages listed in your `package.json` file, and run your script. The idea of making a static site generator in Node.js came from this good article by Douglas Matoso: [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22).


## Documentation

Check out my [project's website](https://static-site-express.netlify.com/) and [GitHub repository](https://github.com/SalsaBoy990/static-site-express) for more details.

### Install static-site-express

You have to options:

a) Clone my repository:

```
git clone https://github.com/SalsaBoy990/static-site-express name-of-your-site
```

b) Use the 'Deploy to Netlify' button on the [example website](https://static-site-express.netlify.com/)


### Build your site locally

a) Build site from `./src` into `./public` folder:

```
npm run build
```

b) Serve website on `localhost:4000`:

```
npm run serve
```

c) Or you can watch for changes and trigger re-build with nodemon:

```
npm run watch
```

You need to add `sudo` before the commands on Linux system.

#### Important notes

- `nodemon` not trigger re-build on Linux on file changes (this behavior was experienced on Ubuntu 18.04 LTS Bionic Beaver)
- On Ubuntu, you can run `npm run watch-exp` command which uses the [chokidar](https://github.com/paulmillr/chokidar) package. *Experimental!*

Inspect `package.json` for more info. The `./lib` folder contains the JavaScript files used for building and serving the website. Check them out.

The `site.config.js` file contains some of the site properties (like site title, author, description, social media links etc.) that are used in the EJS partials.


### Register at Netlify and publish your website

- Register on [Netlify](https://www.netlify.com/), and [see this tutorial video](https://www.netlify.com/docs/continuous-deployment/) if you are unfamiliar with the procedure. You can publish your site in a minute.

- The `netlify.toml` configuration file contains important properties:

```toml
[build]
  base    = "/"
  publish = "public"
  command = "npm run build"
```

The base path, the build command, and the publish directory. You can keep those settings.

In the `_headers` file you can specify the HTTP headers and set Content Security Policy (CSP) rules for the Netlify server. Currently, CSP rules are not set because I don't know which domains you want to whitelist when you create your own website. I recommend you the [CSP Evaluator by Google](https://csp-evaluator.withgoogle.com/).

The `_redirects` file is currently empty. When you have a custom domain, you can make a redirect from *.netlify.com to your custom domain.

`sitemap.xml` is self-explanatory. Empty by default.
`robots.txt` is for search engines. Default settings:

```
# Disallow login page
User-agent: *
Disallow: /admin/

# Rule 2
User-agent: *
Allow: /
```

For [Google Search Console](https://search.google.com/search-console/about) verification, you should have an HTML file from Google included in the root of your Netlify publish folder (in our case, public). The build script copies this file from `./src` to `./public`. Change line 87 in `./lib/build.js`: 

```javascript
ssg.copyRootFile('FILENAME.html', srcPath, distPath)
```

### Alternatively, you can use the Express server app on Heroku (not recommended)

A `Procfile` is already supplied for you with the command to build the site, and after that, to run the app server:

```
web: npm run heroku
```

You need improve security! I already set security headers with the `helmet` npm package, just 2 lines:

```javascript
// Set Security Headers.
const helmet = require('helmet')
app.use(helmet())
```

Also, you can set Content Security Policy (CSP) rules using the `helmet-csp` package.

Keep in mind that the contact form on the example site only works on Netlify!!

### Q&A

If you have a problem or a question about static-site-express, [open an issue here](https://github.com/SalsaBoy990/static-site-express/issues).


*To be continued...*

