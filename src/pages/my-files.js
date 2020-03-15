/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link, graphql } from "gatsby"

import Container from "../components/container/container.js"
import Row from "../components/row/row.js"
import Header from "../components/header/header.js"
import Footer from "../components/footer/footer.js"
import Breadcrumb from "../components/breadcrumb/breadcrumb.js"
import NavLink from "../components/nav-link/nav-link.js"

const Home = ({ user }) => {
  return (
    <p>
      <i className="fas fa-user"></i>Szia, {user.name ? user.name : "barátom"}!
    </p>
  )
}
const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const MyFiles = ({ data }) => {
  // console.log(data)
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <Container>
      <Header>
        <NavLink to="/">Főoldal</NavLink>
        <NavLink to="/rolam/">Rólam</NavLink>
        <NavLink to="/kapcsolat/">Kapcsolat</NavLink>
      </Header>
      <Row>
        <>
          <div className="col-12 p0">
                  <Home path="/my-files" user={user} />
            <div className="row m0">
              <div className="col-12 p0">
                <Router>
                  <Settings path="/my-files/settings" />
                  <Billing path="/my-files/billing" />
                </Router>
              </div>
            </div>
            <div className="row m0">
          <a
            href="#logout"
            onClick={e => {
              logout()
              e.preventDefault()
            }}
          >
            Log Out
          </a>

            </div>
          </div>


          <nav>
            <Link to="/my-files">Home</Link>{" "}
            <Link to="/my-files/settings">Settings</Link>{" "}
            <Link to="/my-files/billing">Billing</Link>{" "}
          </nav>
        </>
        <div
          className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 xl-offset-1 p0 mb2 mt2`}
        >
          <Breadcrumb>Az oldalam fájljai</Breadcrumb>
          <h1>Az oldalam fájljai</h1>
          <hr></hr>
          <table>
            <thead
              css={css`
                background: #c88e78;
                color: #fff;
                letter-spacing: 1px;
              `}
            >
              <tr>
                <th>Elérési útvonal</th>
                <th>Kiterj.</th>
                <th>Fájlméret</th>
                <th>Létrehozva</th>
              </tr>
            </thead>
            <tbody>
              {data.allFile.edges.map(({ node }, index) => (
                <tr key={index}>
                  <td>{node.relativePath}</td>
                  <td className={`gray-green small-size`}>{node.extension}</td>
                  <td className={`gray-green small-size`}>{node.prettySize}</td>
                  <td className={`gray-green small-size`}>{node.birthTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>
      <Footer></Footer>
    </Container>
  )
}

export default MyFiles

export const query = graphql`
  query {
    allFile(sort: { fields: birthTime, order: DESC }) {
      edges {
        node {
          base
          birthTime(fromNow: true, locale: "hu")
          prettySize
          relativePath
          extension
        }
      }
    }
  }
`
