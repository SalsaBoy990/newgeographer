import React from "react"
import { Link } from "gatsby"

export default ({ children }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb p0 m0 mbhalf small-size">
      <li className="breadcrumb-item">
        <Link to="/">Főoldal</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to="/cimke">Címkék</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        {children}
      </li>
    </ol>
  </nav>
)
