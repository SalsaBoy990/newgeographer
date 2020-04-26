/** @jsx jsx */
import { jsx, css } from "@emotion/core"
// eslint-disable-next-line no-unused-vars
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

  if (!values.subjectList) {
    errors.subjectList = "Kötelező mező"
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
      subjectList: "",
      message: "",
    },
    validate,
  })

  function encode(data) {
    const formData = new FormData()
    for (const key of Object.keys(data)) {
      formData.append(key, data[key])
    }
    return formData
  }

  const [msg, setMsg] = React.useState(null)


  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target

    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        name: form.name.value,
        email: form.email.value,
        subjectList: form.subjectList.value,
        message: form.message.value,
      }),
    })
    .then( () => setMsg('Sikeresen elküldted az üzenetet! Kösz az érdeklődést!'))
    .catch( (err) => console.error(err))

  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Ha ember vagy, ezt ne töltsd ki: <input name="bot-field" />
        </label>
      </p>
      <div className="form-group mb1">
        <label
          htmlFor="inputName"
          className="form-label gray-green medium-size bold-700"
        >
          Teljes név{" "}
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
          css={css`
            min-width: 400px;
            @media (max-width: 500px) {
              min-width: 100%;
            }
          `}
        />
        <p className="small-size">
          {formik.errors.name ? <span><i class="fas fa-exclamation-circle"></i>{" "}{formik.errors.name}</span> : null}
        </p>
      </div>
      <div className="form-group mb1">
        <label
          htmlFor="inputEmail"
          className="form-label gray-green medium-size bold-700"
        >
          E-mail cím{" "}
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
          css={css`
            min-width: 400px;
            @media (max-width: 500px) {
              min-width: 100%;
            }
          `}
        />
        <p className="small-size">
          {formik.errors.email ? <span><i class="fas fa-exclamation-circle"></i>{" "}{formik.errors.email}</span> : null}
        </p>
      </div>
      <div className="form-group mb1">
        <label
          htmlFor="inputSubject"
          className="form-label gray-green medium-size bold-700"
        >
          Tárgy{" "}
        </label>
        <br></br>
        <select
          id="inputSubject"
          name="subjectList"
          onChange={formik.handleChange}
          required>
          <option value="" disabled="">Válassz a listából</option>
          <option value="allasajanlat">Állásajánlat</option>
          <option value="kerdes">Kérdés</option>
          <option value="egyeb">Egyéb</option>
        </select>
        <p className="small-size">
          {formik.errors.subjectList ? <span><i class="fas fa-exclamation-circle"></i>{" "}{formik.errors.subjectList}</span> : null}
        </p>
      </div>

      <div className="form-group">
        <label
          htmlFor="message"
          className="form-label gray-green medium-size bold-700"
        >
          Üzenet{" "}
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
          {formik.errors.message ? <span><i class="fas fa-exclamation-circle"></i>{" "}{formik.errors.message}</span> : null}
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
    <p css={css`margin-top: 15px; background-color: #77D6A3;`}>{msg ? msg : ""}</p>
    </>
  )
}

export default FormComponent
