import { ACTION } from "./actionType"
import { IUserReducer, IDispatch } from "./interface"

const initialState: IUserReducer = {
  is_authenticated: false,
  admin_user: {
    status: false,
    data: {
      id: "",
      username: "",
      email: "",
      role: {
        role: "",
        permissions: [
          {
            label: "",
            access: {
              add: false,
              view: false,
              edit: false,
              delete: false,
            },
          },
        ],
      },
    },
  },
}
export default function UserReducer(state = initialState, action: IDispatch) {
  const { type } = action

  switch (type) {
    case ACTION.IS_AUTHENTICATED:
      return {
        ...state,
        is_authenticated: action.payload,
      }
    case ACTION.ADMIN_USER:
      return {
        ...state,
        admin_user: action.payload,
      }
      break
    default:
      return state
  }
}
