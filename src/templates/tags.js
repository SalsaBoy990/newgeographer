// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb-tags.js"
import NavLink from "../components/nav-link/nav-link.js"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} bejegyzésem van a "${tag}" témakörben`

  return (
    <Container>
      <Header>
        <NavLink to="/">Főoldal</NavLink>
        <NavLink to="/rolam/">Rólam</NavLink>
        <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
      </Header>
      <Row>
        <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 xl-offset-1 p0 mb2 mt2`}
        >
          <Breadcrumb>{tag}</Breadcrumb>
          <h1>{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter
              return (
                <li key={slug}>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            })}
          </ul>
          {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
          <Link to="/cimke">Az összes címke</Link>
        </div>
      </Row>
    </Container>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 500
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
