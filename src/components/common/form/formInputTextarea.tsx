import { Form } from "react-bootstrap"
import { IFormTypes } from "../../../interface"

type IFormText = IFormTypes & {
  rows?: number
}

export default function FormInputTextarea(props: IFormText) {
  const { formProps, error, apiError, rows } = props
  return (
    <>
      <Form.Control as="textarea" rows={rows} {...formProps} autoComplete="off" />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{apiError}</Form.Control.Feedback>
    </>
  )
}
