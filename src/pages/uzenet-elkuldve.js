/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb.js"
import NavLink from "../components/nav-link/nav-link.js"
import FormValidated from "../components/form-validate/form-validate.js"

import contactGIF from '../gifs/contact-me.gif'

export default () => (
  <Container>
    <SEO title={`Kapcsolat`} pathname={`/kapcsolat/`} website={true} description={"Vedd fel velem a kapcsolatot az űrlapon keresztül, e-mail-ben, Linkedin-en."} />
    <Header>
      <NavLink to="/">Főoldal</NavLink>
      <NavLink to="/rolam/">Rólam </NavLink>
      <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
    </Header>
    <Row>
      <div className="col-12 p0 mt2 mb2">
        <Breadcrumb>Üzenet elküldve</Breadcrumb>
        <h1>Kösz az érdeklődést!</h1>
        <hr></hr>
        <p>Amint tudok, válaszolok rá.</p>
        <Link to="/">Vissza a főoldalra</Link>  
      </div>
    </Row>
    <Footer></Footer>
  </Container>
)
