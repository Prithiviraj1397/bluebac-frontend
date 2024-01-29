export interface IReducer {
  basicReducer: IBasicReducer
  userReducer: IUserReducer
}

export interface IBasicReducer {
  lang: string
  dir: string
  dataThemeMode: string
  dataMenuStyles: string
  dataNavLayout: string
  dataHeaderStyles: string
  dataNavStyle: string
  dataVerticalStyle: string
  StylebodyBg: string
  StyleDarkBg: string
  toggled: string
  horStyle: string
  dataPageStyle: string
  dataWidth: string
  dataMenuPosition: string
  dataHeaderPosition: string
  loader: string
  iconOverlay: string
  colorPrimaryRgb: string
  bodyBg1: string
  bodyBg2: string
  darkBg: string
  inputBorder: string
  bgImg: string
  iconText: string
  body: {
    class: string
  }
  alertSnackBar: ISnackBar
  sideModalHeader: number
  sideModalFooter: number
}

export interface IUserReducer {
  is_authenticated: boolean
  admin_user: IAdminUser
}

export interface IDispatch {
  type: string
  payload: any
}

export interface IAccess {
  label: string
  access: {
    add: boolean
    view: boolean
    edit: boolean
    delete: boolean
  }
} 

export interface IAdminUser {
  status:boolean
  data:{
    id: string
    username: string
    email: string
    role: {
      role: string
      permissions: IAccess[]
    }
  }
}

export type ISnacKType = "success" | "danger" | "info"

export interface ISnackBar {
  type: ISnacKType
  message?: string
  visible: boolean
}
