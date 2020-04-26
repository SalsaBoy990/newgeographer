// eslint-disable-next-line no-unused-vars
import React from "react"
import { handleAuthentication } from "../utils/auth"

const Callback = () => {
  handleAuthentication()

  return <p>Loading...</p>
}

export default Callback