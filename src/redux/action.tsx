import { ACTION } from "./actionType"
import { IAdminUser, IDispatch, ISnackBar } from "./interface"

const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: "ThemeChanger",
    payload: value,
  })
}

const setSideModalHeader = (sideModalHeader: number) => {
  return {
    type: ACTION.SIDE_MODAL_HEADER,
    payload: sideModalHeader,
  }
}
const setSideModalFooter = (sideModalFooter: number) => {
  return {
    type: ACTION.SIDE_MODAL_FOOTER,
    payload: sideModalFooter,
  }
}

const setAlertSnackbar = (alertSnackBar: ISnackBar): IDispatch => {
  return {
    type: ACTION.ALERT_SNACK_BAR,
    payload: alertSnackBar,
  }
}

const setAuthentication = (is_authenticated: boolean): IDispatch => {
  return {
    type: ACTION.IS_AUTHENTICATED,
    payload: is_authenticated,
  }
}

const setAdminUser = (admin_user: IAdminUser): IDispatch => {
  return {
    type: ACTION.ADMIN_USER,
    payload: admin_user,
  }
}

export { ThemeChanger, setAlertSnackbar, setAuthentication, setAdminUser, setSideModalHeader, setSideModalFooter }
