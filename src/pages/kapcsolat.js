/** @jsx jsx */
import { jsx, css } from "@emotion/core"
// eslint-disable-next-line no-unused-vars
import React from "react"

import SEO from "../components/seo"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb.js"
import NavLink from "../components/nav-link/nav-link.js"
import FormValidated from "../components/form-validate/form-validate.js"

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
      <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 p0 mt2">
        <Breadcrumb>Kapcsolat</Breadcrumb>
        <h1>Kapcsolat</h1>

        <div className="row m0 p0">
          <div
            className="col-12 p0 mt0 mb2"
            css={css`
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
              padding: 15px;
              margin-left: -15px;
            `}
          >
            <FormValidated></FormValidated>
          </div>
        </div>
      </div>
    </Row>
    <Footer></Footer>
  </Container>
)
