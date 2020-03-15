import React from "react"
import containerStyles from "./container.module.scss"

export default ({ children }) => (
  <div className={`container-fluid p0 ${containerStyles.container}`}>{ children }</div>
)