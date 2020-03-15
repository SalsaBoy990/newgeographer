/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import React from "react"
import { useFormik } from "formik"

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "Kötelező mező"
  } else if (values.name.length > 40) {
    errors.name = "40 karakternél rövidebb lehet csak"
  } else if (values.name.length < 4) {
    errors.name = "3 betűnél hosszabb lehet csak"
  }

  if (!values.email) {
    errors.email = "Kötelező mező"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "A megadott e-mail érvénytelen"
  }

  if (!values.message) {
    errors.message = "Kötelező szöveg"
  } else if (values.message.length < 80) {
    errors.message = "Minimum 80 karakter hosszú legyen"
  } else if (values.message.length > 600) {
    errors.message = "Maximum 600 karakter hosszú lehet az üzenet"
  }

  return errors
}

const FormComponent = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      name="contact"
      className="custom-form ws-validate"
      method="POST"
      action="#"
      netlify-honeypot="bot-field"
      netlify
    >
      <p className="hidden">
        <label>
          Ha ember vagy, ezt ne töltsd ki: <input name="bot-field" />
        </label>
      </p>
      <div className="form-group mb2">
        <label
          htmlFor="inputName"
          className="form-label gray-green medium-size bold-700"
        >
          Add meg a neved{" "}
        </label>
        <br></br>
        <input
          id="inputName"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="border-round input-lg expanded"
          required="required"
          placeholder=""
        />
        <p className="small-size">
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </p>
      </div>
      <div className="form-group mb2">
        <label
          htmlFor="inputEmail"
          className="form-label gray-green medium-size bold-700"
        >
          Az e-mail címed{" "}
        </label>
        <br></br>
        <input
          id="inputEmail"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="border-round input-lg expanded"
          required="required"
          placeholder=""
        />
        <p className="small-size">
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </p>
      </div>

      <div className="form-group">
        <label
          htmlFor="message"
          className="form-label gray-green medium-size bold-700"
        >
          Írd meg az üzenetedet{" "}
        </label>
        <br></br>
        <textarea
          id="message"
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          required="required"
          placeholder=""
        ></textarea>
        <p className="small-size">
          {formik.errors.message ? <div>{formik.errors.message}</div> : null}
        </p>
      </div>

      <div className="text-left clearfix">
        <button
          type="submit"
          css={css`
            border-radius: 10px;
            background: #c83904;
            padding: 0.75rem 0.5rem;
            color: #fff;
            letter-spacing: 1px;
            font-family: "Prompt", "Helvetica Neue", Helvetica, Arial,
              sans-serif;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
          `}
          className="float-left btn btn-lg btn-text no-visited no-underline mb0 mr1"
        >
          Üzenet küldése
        </button>
      </div>
    </form>
  )
}

export default FormComponent
