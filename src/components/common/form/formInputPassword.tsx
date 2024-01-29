import { Button, Form, InputGroup } from "react-bootstrap"
import { IFormTypes } from "../../../interface"
import { useState } from "react"

type IFormPassword = IFormTypes & {}

export default function FormInputPassword(props: IFormPassword) {
  const { formProps, error, apiError, className } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <>
      <InputGroup>
        <Form.Control type={showPassword ? "text" : "password"} className={className ? className : ""} {...formProps} />

        <Button variant="light" className="btn" onClick={() => setShowPassword(!showPassword)}>
          <i className={`${showPassword ? "ri-eye-line" : "ri-eye-off-line"} align-middle`} aria-hidden="true"></i>
        </Button>

        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">{apiError}</Form.Control.Feedback>
      </InputGroup>
    </>
  )
}
