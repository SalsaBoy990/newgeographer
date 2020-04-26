// eslint-disable-next-line no-unused-vars
import React from "react"
import containerStyles from "./container.module.scss"

export default ({ children }) => (
  <div className={`container-fluid p0 ${containerStyles.container}`}>{ children }</div>
)