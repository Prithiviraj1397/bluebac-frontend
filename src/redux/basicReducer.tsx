import { ACTION } from "./actionType"
import { IBasicReducer, IDispatch } from "./interface"

const initialState: IBasicReducer = {
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "light",
  dataNavLayout: "horizontal",
  dataHeaderStyles: "light",
  dataNavStyle: "menu-click",
  dataVerticalStyle: "",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  loader: "disable",
  iconOverlay: "",
  colorPrimaryRgb: "",
  bodyBg1: "",
  bodyBg2: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },
  alertSnackBar: {
    type: "success",
    visible: false,
    message: "",
  },
  sideModalHeader: 0,
  sideModalFooter: 0,
}
export default function reducer(state = initialState, action: IDispatch) {
  const { type, payload } = action

  switch (type) {
    case "ThemeChanger":
      state = payload
      return state
    case ACTION.ALERT_SNACK_BAR:
      return {
        ...state,
        alertSnackBar: action.payload,
      }
    case ACTION.SIDE_MODAL_HEADER:
      return {
        ...state,
        sideModalHeader: action.payload,
      }
    case ACTION.SIDE_MODAL_FOOTER:
      return {
        ...state,
        sideModalFooter: action.payload,
      }
      break
    default:
      return state
  }
}
