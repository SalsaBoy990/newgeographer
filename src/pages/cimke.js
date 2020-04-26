// eslint-disable-next-line no-unused-vars
import React from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb.js"
import NavLink from "../components/nav-link/nav-link.js"
import Search from "../components/search/search.js"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Container>
    <Header>
      <NavLink to="/">Főoldal</NavLink>
      <NavLink to="/rolam/">Rólam</NavLink>
      <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
    </Header>
    <Row>
      <Helmet title={title} />
      <div
        className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 xl-offset-1 p0 mb2 mt2`}
      >
        <Breadcrumb>Címkék</Breadcrumb>
        <h1>Címkék</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/cimke/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <h1 className="h2">Keresés</h1>
          <Search />
        </div>
      </div>
    </Row>
    <Footer></Footer>
  </Container>
)
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}
export default TagsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
