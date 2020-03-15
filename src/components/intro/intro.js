/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        totalCount
      }
    }
  `)

  return (
    <div className="col-12 p0 mt2 mb1">
      <h1 className="h1">
        Egy geográfus webfejlesztő blogja
      </h1>
      <span
          className={`medium-size`}
          css={css`color: #999;
            font-weight: 400 !important;
          `}
        >
          {data.allMarkdownRemark.totalCount} bejegyzés
        </span>
      <hr></hr>
    </div>
  )
}
