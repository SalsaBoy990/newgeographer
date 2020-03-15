/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import NavLink from "../components/nav-link/nav-link.js"

import startrekGIF from '../gifs/warp-jump.gif'

export default () => {
  return (
    <Container>
      <SEO title={`Oldal nem található`} website={true} description={"Ez az oldal nem létezik. :( Ugorj vissza a főoldalra."}/>
      <Header>
        <NavLink to="/">
          Főoldal <span className="sr-only">(aktuális)</span>
        </NavLink>
        <NavLink to="/rolam/">Rólam</NavLink>
        <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
      </Header>

      <Row>
        <div className="col-12 p0 mb2 align-center">
         <h1 className="mt2 mb0">A keresett oldal nem található</h1>
         <span css={css`color: #bd4429;`}>(404 hiba)</span>
         <img className="mt1 mx-auto" src={startrekGIF} alt="Star Trek térváltás"></img>
         <Link to="/">Vissza a főoldalra</Link>
        </div>
      </Row>
      <Footer></Footer>
    </Container>
  )
}

