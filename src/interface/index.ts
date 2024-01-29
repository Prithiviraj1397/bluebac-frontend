import { FormControlProps } from "react-bootstrap"

export interface IBasicRouting {
  path: string
  element: any
}

export interface IFormTypes {
  className?:string
  formProps: FormControlProps & {
    name: string
    placeholder?: string
  }
  error?: string
  apiError?: string
}

export type IChangeEvent = React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>


