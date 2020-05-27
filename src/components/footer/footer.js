/** @jsx jsx */
import { jsx, css } from "@emotion/core"
// eslint-disable-next-line no-unused-vars
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Container from "../container/container.js"
import Row from "../row/row.js"
import footerStyles from "./footer.module.scss"

import Img from "gatsby-image"

// import ccLicense from "../../images/gatsby-small.png"

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site: site {
        siteMetadata {
          title
          author
          designPortfolio
          email
          socialMedia {
            github
            linkedin
          }
        }
      }
      profileImg: file(relativePath: { eq: "images/profile2.png" }) {
        childImageSharp {
          fixed(width: 164, height: 166, grayscale: true, pngQuality: 85) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      gatsbyImg: file(relativePath: { eq: "images/gatsby-icon.png" }) {
        childImageSharp {
          fixed(width: 24, height: 24, pngQuality: 85) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      netlifyImg: file(relativePath: { eq: "images/netlify.png" }) {
        childImageSharp {
          fixed(width: 24, height: 24, pngQuality: 85) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      forestryImg: file(relativePath: { eq: "images/forestry.jpg" }) {
        childImageSharp {
          fixed(width: 24, height: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  // console.log(data)
  return (
    <footer>
      <div className={`${footerStyles.bgGreen} container-max-width`}>
        <Container>
          <Row>
            <div className="col-12 col-sm-12 col-md-8 col-lg-7 col-xl7 pt2 pb0 pl0 pr0 clearfix">
              <Img
                className="float-left mr1"
                fixed={data.profileImg.childImageSharp.fixed}
                alt="Profilkép rólam"
              />
              <h1
                css={css`
                  letter-spacing: 1px;
                `}
                className={`h3 mb0 bold-500 ${footerStyles.lightGray}`}
              >
                {data.site.siteMetadata.author}
              </h1>
              <p
                css={css`
                  color: #ccc;
                `}
                className={`${footerStyles.mediumSize}`}
              >
                {data.site.siteMetadata.email}
              </p>

              <nav>
                <a
                  href={data.site.siteMetadata.socialMedia.github}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={`mrhalf ${footerStyles.lightBlueLink}`}
                  title="Github"
                >
                  <i className="fab fa-github fa-2x"></i>
                </a>

                <a
                  href={data.site.siteMetadata.socialMedia.linkedin}
                  rel="noreferrer noopener"
                  target="_blank"
                  title="Linkedin"
                  className={`mrhalf ${footerStyles.lightBlueLink}`}
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              </nav>
              <p
                css={css`
                  color: #ccc;
                `}
                className={`pt1 pb1 ${footerStyles.mediumSize}`}
              >
                Frontend, UI/UX design, Gatsby.js, Node, Wordpress
              </p>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 offset-lg-1 offset-xl-1 p0 m-pl0 pl1 pt2 pb1 m-pt0">
              <a href="#">
                <span
                  css={css`
                    color: #ccc;
                  `}
                  className={`${footerStyles.mediumSize}`}
                >
                  <i className="fas fa-file-download"></i> Önéletrajz letöltése
                  (feltöltés alatt)
                </span>
              </a>
            </div>
          </Row>
          <Row>
            <div className="col-12 p0"></div>
          </Row>
        </Container>
      </div>
      <div className={`${footerStyles.bgBlack} container-max-width`}>
        <Container>
          <Row>
            <div className={`col-12 p0 mthalf mbhalf`}>
              <p
                className={`inline m0 ${footerStyles.lightGray2} ${footerStyles.minSize}`}
              >
                &copy; 2019–{new Date().getFullYear()} ÚjGeo – Gulácsi András. Minden jog fenntarva. Az oldalt működteti:
              </p>
              <div className={`inline mlquarter`}>
                <a
                  href="https://www.gatsbyjs.org/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Img
                    className="mrquarter"
                    css={css`
                      margin-bottom: -5px !important;
                    `}
                    fixed={data.gatsbyImg.childImageSharp.fixed}
                    alt="Gatsby ikon"
                    title="Gatsby.js"
                  />
                </a>

                <a
                  href="https://www.netlify.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Img
                    css={css`
                      margin-bottom: -5px !important;
                    `}
                    fixed={data.netlifyImg.childImageSharp.fixed}
                    alt="Netlify ikon"
                    title="Netlify"
                    className="mrquarter"
                  />
                </a>
                <a
                  href="https://forestry.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Img
                    css={css`
                      margin-bottom: -5px !important;
                    `}
                    fixed={data.forestryImg.childImageSharp.fixed}
                    alt="Forestry.io ikon"
                    title="Forestry"
                  />
                </a>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </footer>
  )
}
