/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { Link } from "gatsby"
import { Highlight, Snippet } from "react-instantsearch-dom"


const PostPreview = ({ hit }) => {
  return (
    <article>
      <div className="mb1">
        <h3 className="mt0 h4 mb0">
          <Link to={hit.fields.slug}>
            <Highlight hit={hit} attribute="title" tagName="mark" />
          </Link>
        </h3>
        <small className="small-size" css={css`color: #777;`}>
          <Highlight hit={hit} attribute="date" tagName="mark" />
        </small>
      </div>
      <div className="medium-size mthalf">
        <Snippet
          hit={hit}
          attribute="excerpt"
          tagName="mark"
          className="medium-size"
        />
      </div>
    </article>
  )
}
export default PostPreview
