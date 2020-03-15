import './node_modules/bootstrap/dist/css/bootstrap.min.css'
import './src/styles/global.scss'
import './node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './node_modules/@popperjs/core/dist/umd/popper.min.js'
import './node_modules/jquery/dist/jquery.slim.min.js'
import './node_modules/bootstrap/dist/js/bootstrap.min.js'

import React from "react"
import { silentAuth } from "./src/utils/auth"

require("prismjs/themes/prism-tomorrow.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    )
  }
}

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}