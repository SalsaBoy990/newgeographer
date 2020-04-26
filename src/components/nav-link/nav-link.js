// eslint-disable-next-line no-unused-vars
import React from "react"
import { Link } from "gatsby"

const activeStyles = {
  fontWeight: 700,
  color: "#FFF",
}

const NavLink = ({ children, to }) => (
  <Link to={to} className={`nav-item nav-link m-border-top`} activeClassName={"active"}>
    {children}
  </Link>
)

export default NavLink
