/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config()
const path = require("path")
const queries = require("./src/utils/algolia")


module.exports = {
  siteMetadata: {
    title: "ÚjGeo",
    author: "Gulácsi András",
    description: "Egy volt geográfus webfejlesztő és designer blogja",
    firstName: "András",
    lastName: "Gulácsi",
    url: "https://www.newgeographer.com",
    image: "/meandering-river.jpg",
    email: "guland@protonmail.com",
    socialMedia: {
      github: "https://github.com/SalsaBoy990",
      linkedin: "https://www.linkedin.com/in/andr%C3%A1s-gul%C3%A1csi/",
    },
    cv: "https://www.docdroid.net/YIFs1FI/gulacsi-andras-resume-2019.pdf",
    designPortfolio: "https://uifactory.design/",
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Prompt`,
            variants: [`600`, `700`, `700i`],
            subsets: [`latin-ext`],
          },
          {
            family: `Poppins`,
            variants: [`400`, `400i`, `700`],
            subsets: [`latin-ext`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: path.join(__dirname, `src`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/featured/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: "gatsby-remark-normalize-paths",
            options: {
              pathFields: ["featuredImage"],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
          {
            resolve: `gatsby-plugin-algolia`,
            options: {
              appId: process.env.GATSBY_ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_ADMIN_KEY,
              queries,
              chunkSize: 10000, // default: 1000
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Új Geográfus`,
        short_name: `ÚjGeo`,
        start_url: `/`,
        background_color: `#0B6052`,
        theme_color: `#0B6052`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
