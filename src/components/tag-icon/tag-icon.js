import React from "react"
import tagStyles from "./tag-icon.module.scss"

export default ({ children }) => (
  <span className={tagStyles.tagContainer}>{ children }</span>
)