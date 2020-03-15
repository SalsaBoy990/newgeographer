/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"

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
      <NavLink to="/kapcsolat/">
        Kapcsolat <span className="sr-only">(aktuális)</span>
      </NavLink>
    </Header>
    <Row>
      <div className="col-12 p0 mt2">
        <Breadcrumb>Kapcsolat</Breadcrumb>
        <h1>Kapcsolat</h1>
        <hr></hr>
        <div className="row m0 p0">
          <div
            className="col-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 p0 p1 m-phalf mt0 mb2"
            css={css`
              background-color: #fffffe;
              border: 1px solid #ededed;
              border-radius: 5px;
              box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
            `}
          >
            <img className="mb1" src={contactGIF} alt="Üzenj nekem"></img>
            <FormValidated></FormValidated>
          </div>
        </div>
      </div>
    </Row>
    <Footer></Footer>
  </Container>
)
