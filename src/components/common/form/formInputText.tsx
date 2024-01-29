import { Form } from "react-bootstrap"
import { IFormTypes } from "../../../interface"

type IFormText  = IFormTypes & {
    
}


export default function FormInputText(props: IFormText) {
  const { formProps, error, apiError, className } = props
  return (
    <>
      <Form.Control type="text" className={className ? className : ""} {...formProps} autoComplete="off" />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">{apiError}</Form.Control.Feedback>
    </>
  )
}
