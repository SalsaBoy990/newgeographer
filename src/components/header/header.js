/** @jsx jsx */
import { jsx, css } from "@emotion/core"
// eslint-disable-next-line no-unused-vars
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"

import Container from "../container/container.js"
import Row from "../row/row.js"

const { useState } = React

const GreenBox = styled.div`
  background-color: #0b6052;
`

const BlueLink = styled.a`
  padding-top: 9px;
  padding-bottom: 9px;
  // color: #9bd9fd;
  color: rgba(255, 255, 255, 0.7);
  /* pseudo selectors work as well */
  &:hover {
    color: #fff !important;
  }
`

const HamburgerMenu = props => {
  const [open, setOpen] = useState(false)

  const replaceIconOnClick = () => {
    setOpen(!open)
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.5 },
      }}
      whileTap={{
        scale: 1.1,
        transition: { duration: 0.5 },
      }}
      className="navbar-toggler"
      onClick={replaceIconOnClick}
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="">
        <i className={"fas fa-bars" + (open ? " close" : " open")}></i>
        <i
          className={"fas fa-times initialClose" + (open ? " open" : " close")}
        ></i>
      </span>
    </motion.button>
  )
}

const ResponsiveHeader = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          designPortfolio
          email
          socialMedia {
            github
            linkedin
          }
        }
      }
    }
  `)

  // console.log(data)

  return (
    <header>
      <GreenBox className="container-max-width">
        <Container>
          <Row>
            <div className="col-12 p0">
              <nav className="navbar navbar-dark mr-auto navbar-expand-sm pl0 pr0">
                <a className="navbar-brand no-underline" href="/">
                  <svg
                    style={{ marginTop: `0px`, width: `34px`, height: `34px` }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill="#EFEFEF"
                      d="M 15.529297 2.5820312 A 1.0001 1.0001 0 0 0 14.998047 2.7695312 C 5.4915948 9.391426 3.1476064 22.495458 9.7695312 32.001953 C 13.637372 37.55466 19.717759 40.64121 26 40.947266 L 26 44.054688 C 21.981857 44.326073 17.634766 46.070312 17.634766 46.070312 A 1.0001 1.0001 0 0 0 18 48 L 26.832031 48 A 1.0001 1.0001 0 0 0 27.158203 48 L 36 48 A 1.0001 1.0001 0 0 0 36.365234 46.070312 C 36.365234 46.070312 32.018143 44.326073 28 44.054688 L 28 40.951172 C 31.819889 40.774193 35.636606 39.574664 39.001953 37.230469 A 1.0001 1.0001 0 1 0 37.859375 35.589844 C 34.587242 37.869108 30.852685 38.972488 27.150391 39 A 1.0001 1.0001 0 0 0 26.984375 38.986328 A 1.0001 1.0001 0 0 0 26.902344 38.990234 C 20.937516 38.95657 15.083973 36.13354 11.410156 30.859375 C 5.4060817 22.239871 7.5210769 10.414262 16.140625 4.4101562 A 1.0001 1.0001 0 0 0 15.628906 2.5820312 A 1.0001 1.0001 0 0 0 15.529297 2.5820312 z M 27 3 C 23.460666 3 20.173178 4.0888535 17.449219 5.9453125 C 17.394173 5.9806476 17.337301 6.0111454 17.283203 6.0488281 C 17.121626 6.1613786 16.971169 6.2846396 16.826172 6.4121094 C 12.691225 9.5154363 10 14.441369 10 20 C 10 20.350717 10.031714 20.69356 10.052734 21.039062 A 1.0221232 1.0221232 0 0 0 10.107422 21.857422 C 10.742616 27.676272 14.32562 32.60796 19.326172 35.150391 A 1.0216021 1.0216021 0 0 0 20.15625 35.550781 C 22.252453 36.476647 24.564224 37 27 37 C 30.565936 37 33.875478 35.893781 36.611328 34.011719 C 36.645711 33.988961 36.680838 33.969 36.714844 33.945312 C 36.861675 33.843034 37.001641 33.733771 37.134766 33.619141 C 41.29245 30.517717 44 25.576552 44 20 C 44 19.657865 43.96923 19.323508 43.949219 18.986328 A 1.0216021 1.0216021 0 0 0 43.886719 18.091797 C 43.235087 12.285501 39.647317 7.3691197 34.648438 4.8378906 A 1.0216021 1.0216021 0 0 0 33.857422 4.4570312 C 31.757434 3.5271563 29.441355 3 27 3 z M 27 5 C 28.634082 5 30.202356 5.2688815 31.673828 5.75 L 28.126953 8.2207031 C 27.303164 7.5979699 26.475459 7.0518525 25.652344 6.6035156 C 24.804422 6.141667 23.952285 5.7840927 23.113281 5.5253906 C 24.354446 5.1938119 25.653006 5 27 5 z M 33.902344 6.6875 C 35.768915 7.6556566 37.403463 8.9996888 38.707031 10.626953 L 33.789062 14.052734 C 32.525219 12.350676 31.165037 10.841813 29.757812 9.5742188 L 33.902344 6.6875 z M 20.308594 7.0996094 C 21.532179 7.0447482 23.03034 7.4524933 24.695312 8.359375 C 25.249721 8.6613521 25.81773 9.0273167 26.388672 9.4316406 L 22.664062 12.025391 L 19.34375 7.2597656 C 19.642874 7.1715279 19.963345 7.1150891 20.308594 7.0996094 z M 17.708984 8.4121094 L 21.023438 13.169922 L 17.300781 15.761719 C 17.119541 15.086364 16.971912 14.427151 16.880859 13.802734 C 16.530288 11.398588 16.862813 9.548481 17.708984 8.4121094 z M 28.066406 10.753906 C 29.472273 11.973025 30.861828 13.474855 32.146484 15.195312 L 27.248047 18.607422 L 23.832031 13.703125 L 28.066406 10.753906 z M 14.771484 11.322266 C 14.721983 12.203078 14.76228 13.131271 14.902344 14.091797 C 15.037529 15.018871 15.264107 15.984551 15.5625 16.972656 L 12.029297 19.433594 C 12.141886 16.413831 13.134633 13.626997 14.771484 11.322266 z M 39.84375 12.271484 C 40.901011 14.027019 41.61037 16.012194 41.873047 18.142578 L 37.732422 21.027344 C 37.031221 19.267556 36.094282 17.46811 34.933594 15.691406 L 39.84375 12.271484 z M 22.191406 14.847656 L 25.607422 19.751953 L 20.712891 23.162109 C 19.544089 21.360389 18.615384 19.536523 17.958984 17.794922 L 22.191406 14.847656 z M 33.292969 16.833984 C 34.464751 18.638391 35.384945 20.463446 36.041016 22.207031 L 31.808594 25.154297 L 28.392578 20.248047 L 33.292969 16.833984 z M 16.265625 18.972656 C 16.966717 20.731573 17.91027 22.531277 19.068359 24.306641 L 14.15625 27.728516 C 13.09867 25.972452 12.389441 23.986578 12.126953 21.855469 L 16.265625 18.972656 z M 41.970703 20.566406 C 41.858041 23.588118 40.863337 26.376047 39.224609 28.681641 C 39.275062 27.797897 39.236297 26.866505 39.095703 25.902344 C 38.960798 24.977191 38.735091 24.013361 38.4375 23.027344 L 41.970703 20.566406 z M 26.751953 21.392578 L 30.167969 26.296875 L 25.935547 29.244141 C 24.528739 28.024578 23.13712 26.528299 21.851562 24.804688 L 26.751953 21.392578 z M 36.697266 24.238281 C 36.877687 24.911614 37.024452 25.568842 37.115234 26.191406 C 37.465905 28.596234 37.131863 30.444295 36.285156 31.580078 L 32.976562 26.830078 L 36.697266 24.238281 z M 20.208984 25.949219 C 21.473143 27.6536 22.836793 29.156664 24.244141 30.423828 L 20.097656 33.3125 C 18.231085 32.344343 16.596537 31.000311 15.292969 29.373047 L 20.208984 25.949219 z M 31.335938 27.972656 L 34.644531 32.724609 C 33.285415 33.124741 31.434195 32.796799 29.300781 31.634766 C 28.748251 31.333812 28.18223 30.969123 27.613281 30.566406 L 31.335938 27.972656 z M 25.873047 31.777344 C 26.695034 32.398372 27.522333 32.943214 28.34375 33.390625 C 29.19631 33.855 30.052828 34.213765 30.896484 34.472656 C 29.652449 34.805891 28.350468 35 27 35 C 25.365271 35 23.796194 34.731485 22.324219 34.25 L 25.873047 31.777344 z"
                    />
                  </svg>
                  <span>{data.site.siteMetadata.title}</span>
                </a>
                <HamburgerMenu></HamburgerMenu>
                <div
                  className="collapse navbar-collapse m-align-center"
                  id="navbarNavAltMarkup"
                >
                  <div className="navbar-nav">{children}</div>
                  <div
                    className="navbar-nav flex-row ml-sm-auto mr1 m-mrhalf m-mr0 m-border-top"
                    css={css`
                      justify-content: center;
                    `}
                  >
                    <BlueLink
                      href={data.site.siteMetadata.designPortfolio}
                      rel="noreferrer noopener"
                      target="_blank"
                      title="Design portfólió"
                      className={`mrhalf`}
                    >
                      <i className="fas fa-link fa-lg"></i>
                    </BlueLink>
                    <BlueLink
                      href={data.site.siteMetadata.socialMedia.github}
                      rel="noreferrer noopener"
                      target="_blank"
                      title="Github"
                      className={`mrhalf`}
                    >
                      <i className="fab fa-github fa-lg"></i>
                    </BlueLink>
                    <BlueLink
                      href={data.site.siteMetadata.socialMedia.linkedin}
                      rel="noreferrer noopener"
                      target="_blank"
                      title="Linkedin"
                    >
                      <i className="fab fa-linkedin fa-lg"></i>
                    </BlueLink>
                  </div>

                  <Link
                    to="/my-files"
                    css={css`
                      border-radius: 5px;
                      padding: 0.5rem 0.25rem;
                      color: #fff;
                      letter-spacing: 1px;
                      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
                    `}
                    className="btn btn-sm btn-green btn-text uppercase small-size no-visited no-underline mb0"
                  >
                    Belépés
                  </Link>
                </div>
              </nav>
            </div>
          </Row>
        </Container>
      </GreenBox>
    </header>
  )
}

export default ResponsiveHeader
