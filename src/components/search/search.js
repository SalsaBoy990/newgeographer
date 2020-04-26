/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import algoliasearch from "algoliasearch/lite"
// eslint-disable-next-line no-unused-vars
import React from "react"
import {
  InstantSearch,
  SearchBox,
  Hits,
  PoweredBy,
} from "react-instantsearch-dom"

// include the full Algolia theme
import "instantsearch.css/themes/reset-min.css"
import "../../styles/algolia.css"

import PostPreview from "./post-preview"

const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
const searchClient = algoliasearch(appId, searchKey)

const Search = ({ hit }) => (
  <InstantSearch
    searchClient={searchClient}
    indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
  >
    <SearchBox
      translations={{ placeholder: "Keresés a cikkek közt" }}
      className="mb1"
      submit={
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="search"
          width="16px"
          className="svg-inline--fa fa-search mb08"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          ></path>
        </svg>
      }
    />

    <Hits hitComponent={PostPreview}
    css={css`
      li { 
        background-color: #fefefe;
      }
      [class^='ais-'] {
        font-size: inherit !important;
      }
      
      .ais-InfiniteHits-item,
      .ais-InfiniteResults-item,
      .ais-Hits-item,
      .ais-Results-item {
        width: calc(100% - 1rem) !important;
      }`
    } 
    />

    <div className="small-size mt1">
      <PoweredBy translations={{ searchBy: "Keresőszolgáltatás: " }} />
    </div>
  </InstantSearch>
)
export default Search
