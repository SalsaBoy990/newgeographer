/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import kebabCase from "lodash/kebabCase"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { motion } from "framer-motion"

import SEO from "../components/seo"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import Intro from "../components/intro/intro.js"
import Tag from "../components/tag-icon/tag-icon.js"
import NavLink from "../components/nav-link/nav-link.js"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    // console.log(data)
    const posts = data.allMarkdownRemark

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Container>
        <SEO title={`Főoldal`} website={true} />
        <Header>
          <NavLink to="/">
            Főoldal <span className="sr-only">(aktuális)</span>
          </NavLink>
          <NavLink to="/rolam/">Rólam</NavLink>
          <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
        </Header>
        <Row>
          <Intro></Intro>
        </Row>
        <Row>
          <div className="col-12 p0 mb0">
            {posts.edges.map(({ node }) => (
              <div
                key={node.id}
                className="row m0 p0 mb2"
                css={css`
                  background-color: #fff;
                `}
              >
                <div className="col-12 col-sm-12 col-md-6 p0">
                  <motion.div
                    whileHover={{
                      scale: 0.99,
                      transition: {
                        type: "tween",
                        damping: 9,
                        stiffness: 95,
                        duration: 1,
                      },
                    }}
                  >
                    <Link to={node.fields.slug}>
                      <Img
                        fluid={
                          node.frontmatter.featuredImage.childImageSharp.fluid
                        }
                        alt={`${node.frontmatter.title} borító`}
                      ></Img>
                    </Link>
                  </motion.div>
                  <hr></hr>

                  {node.frontmatter.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/cimke/${kebabCase(tag)}`}
                      className={`no-underline d-none d-sm-none d-md-inline`}
                    >
                      <Tag
                        css={css`
                          color: #999;
                        `}
                        className={`small-size`}
                      >{`${tag} `}</Tag>
                    </Link>
                  ))}
                </div>
                <div className="col-12 col-sm-12 col-md-6 p1 m-phalf">
                  <motion.div
                    whileHover={{
                      y: -1,
                      transition: { type: "spring", duration: 1 },
                    }}
                  >
                    <Link
                      to={node.fields.slug}
                      className={`no-underline black`}
                    >
                      <h2 className={`mb0 mt0`}>{node.frontmatter.title}</h2>
                    </Link>
                  </motion.div>
                  <span
                    css={css`
                      color: #aaa;
                    `}
                    className={`small-size`}
                  >
                    {node.frontmatter.date}
                  </span>
                  <p className={`mt1 mb0`}>{node.frontmatter.excerpt}</p>
                  <motion.div
                    whileTap={{
                      x: 2,
                      transition: {
                        type: "tween",
                        damping: 9,
                        stiffness: 95,
                        duration: 1,
                      },
                    }}
                    whileHover={{
                      x: 2,
                      transition: {
                        type: "tween",
                        damping: 9,
                        stiffness: 95,
                        duration: 1,
                      },
                    }}
                    className={`clearfix`}
                  >
                    <Link
                      to={node.fields.slug}
                      className={`float-right mbhalf`}
                    >
                      {node.timeToRead} perc olvasás{" "}
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </Row>
        <Row>
          <div className="p0 mb2">
            <ul
              className="mt0"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                listStyle: "none",
                padding: "0",
              }}
            >
              {!isFirst && (
                <Link to={prevPage} rel="prev">
                  ← Előző oldal
                </Link>
              )}
              {Array.from({ length: numPages }, (_, i) => (
                <li
                  key={`pagination-number${i + 1}`}
                  style={{
                    margin: 0,
                  }}
                >
                  <Link
                    to={`/${i === 0 ? "" : i + 1}`}
                    style={{
                      padding: " 0.25rem .5rem",
                      textDecoration: "none",
                      color: i + 1 === currentPage ? "#ffffff" : "",
                      background: i + 1 === currentPage ? "#007acc" : "",
                    }}
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
              {!isLast && (
                <Link to={nextPage} rel="next">
                  Következő oldal →
                </Link>
              )}
            </ul>
          </div>
        </Row>
        <Footer></Footer>
      </Container>
    )
  }
}

export default BlogIndex

export const query = graphql`
  query PostQuery2($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            date(locale: "hu", formatString: "YYYY. MMMM D.")
            excerpt
            title
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          timeToRead
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
