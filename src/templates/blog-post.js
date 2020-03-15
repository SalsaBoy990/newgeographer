/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import Tag from "../components/tag-icon/tag-icon.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb.js"
import NavLink from "../components/nav-link/nav-link.js"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { next, previous } = pageContext

  const nextArticle = next && (
    <Container>
      <div className="align-right">
        <span
          className=" smallSize mrhalf"
          css={css`
            padding-top: 0.5rem;
            color: #687270;
          `}
        >
          Újabb:
        </span>
        <br></br>
        <Link to={next.fields.slug} className="align-right mediumSize">
          {next.frontmatter.title}{" "}
          <i className="fas fa-long-arrow-alt-right"></i>
        </Link>
      </div>
    </Container>
  )

  const prevArticle = previous && (
    <Container>
      <div className="align-left">
        <span
          className=" smallSize mrhalf"
          css={css`
            padding-top: 0.5rem;
            color: #687270;
          `}
        >
          Régebbi:
        </span>
        <br></br>
        <Link to={previous.fields.slug} className="mediumSize">
          <i className="fas fa-long-arrow-alt-left"></i>{" "}
          {previous.frontmatter.title}
        </Link>
      </div>
    </Container>
  )

  return (
    <div
      css={css`
        background-color: #fffffe;
      `}
    >
      <Container>
        <Header>
          <NavLink to="/">Főoldal</NavLink>
          <NavLink to="/rolam/">Rólam</NavLink>
          <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
        </Header>
        <Row>
          <SEO title={post.frontmatter.title} description={post.excerpt} image={post.frontmatter.featuredImage.publicURL} pathname={post.fields.slug} article={true} />
          <div className={`col-12 m0 p0 mb1 mt2`}>
            <Breadcrumb>{post.frontmatter.title}</Breadcrumb>
            <h1 className={`mbhalf`}>{post.frontmatter.title}</h1>
            <p
              css={css`
                color: #aaa;
              `}
              className={`small-size mb0`}
            >
              {post.frontmatter.date}
            </p>
            <hr></hr>

            <div
              className={`mt1 mb2`}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <hr></hr>
            <div className="row m0 p0">
              <div
                className={`col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb1 p0`}
              >
                <h1 className="h5 bold-500">Címkék:</h1>
                {post.frontmatter.tags.map(tag => (
                  <Link
                    to={`/cimke/${kebabCase(tag)}`}
                    key={tag}
                    className={`no-underline`}
                  >
                    <Tag
                      css={css`
                        color: #999;
                      `}
                      className={`smallSize`}
                    >{`${tag} `}</Tag>
                  </Link>
                ))}
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p0">
                {post.frontmatter.attachments ? (
                  <h1 className="h5 bold-500 m0">Mellékletek:</h1>
                ) : (
                  ""
                )}
                <ul className="no-bullets mt0 mb0">
                  {post.frontmatter.attachments
                    ? post.frontmatter.attachments.map(attachment => (
                        <li key={attachment.base}>
                          <a href={attachment.publicURL} className="small-size">
                            {attachment.ext === ".zip" ? (
                              <i className="far fa-file-archive"></i>
                            ) : (
                              <i className="far fa-file-pdf"></i>
                            )}{" "}
                            {attachment.base}{" "}
                            <span>({attachment.prettySize})</span>
                          </a>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
            <div className="row m0 mt1">
              <span
                className="uppercase smallSize mrhalf"
                css={css`
                  padding-top: 0.5rem;
                  color: #687270;
                `}
              >
                Megosztás:
              </span>
              <a
                href={`https://facebook.com/sharer.php?u=${post.fields.slug}`}
                rel="noreferrer noopener"
                className="no-underline"
                target="_blank"
                title="Megosztás a Facebook-on"
                css={css`
                  padding: 0.25rem 0.5rem;
                  border: 1px solid #ccc;
                  border-radius: 10px;
                `}
              >
                <i className="fab fa-facebook-f"></i>
                <span
                  className="smallSize"
                  css={css`
                    padding-left: 0.15rem;
                  `}
                >
                  Facebook
                </span>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${post.fields.slug}`}
                rel="noreferrer noopener"
                className="no-underline mlhalf"
                target="_blank"
                title="Megosztás a Linkedin-en"
                css={css`
                  padding: 0.25rem 0.5rem;
                  border: 1px solid #ccc;
                  border-radius: 10px;
                `}
              >
                <i className="fab fa-linkedin-in"></i>
                <span
                  className="smallSize"
                  css={css`
                    padding-left: 0.2rem;
                  `}
                >
                  Linkedin
                </span>
              </a>
            </div>
            <div className="row m0 mt3">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p0 clearfix mb1">
                {prevArticle}
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p0 clearfix mb0">
                {nextArticle}
              </div>
            </div>
          </div>
        </Row>
        <Footer></Footer>
      </Container>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(locale: "hu", formatString: "YYYY. MMMM D.")
        tags
        featuredImage {
          publicURL
        }
        attachments {
          publicURL
          ext
          prettySize
          name
          base
        }
      }
      excerpt(pruneLength: 160)
    }
  }
`
