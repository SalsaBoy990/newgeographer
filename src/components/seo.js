import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, lang, meta, image, pathname, article, website }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            author
            siteUrl: url
            defaultImage: image
          }
        }
      }
    `
  )

  const seo = {
    title: title || site.siteMetadata.defaultTitle,
    description: description || site.siteMetadata.defaultDescription,
    image: `${site.siteMetadata.siteUrl}${image || site.siteMetadata.defaultImage}`,
    url: `${site.siteMetadata.siteUrl}${pathname || "/"}`,
  }

  // console.log(seo)

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={seo.title}
      titleTemplate={`%s | ${site.siteMetadata.defaultTitle}`}
    >
      <meta name="description" content={seo.description} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}
      {(website ? true : null) && <meta property="og:type" content="website" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}
      
      <meta name="twitter:card" content="summary_large_image" />

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}

      <meta name="twitter:creator" content={site.siteMetadata.author} />
    </Helmet>
  )
}

SEO.defaultProps = {
  title: null,
  description: ``,
  lang: `hu`,
  meta: [],
  image: null,
  pathname: null,
  article: false,
  website: false,
}
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  website: PropTypes.bool,
}

export default SEO
