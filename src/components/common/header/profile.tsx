import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { IReducer } from "../../../redux/interface"
import { PAGE_URL } from "../../../resources/page_url"
import face9 from "../../../assets/images/faces/9.jpg"
import { useNavigate } from "react-router-dom"
import { useApolloClient, useLazyQuery } from "@apollo/client"
import { LOGOUT } from "../../../api/query"
import { setAuthentication, setAlertSnackbar } from "../../../redux/action"
import { queryOptions } from "../../../resources"

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout] = useLazyQuery(LOGOUT, queryOptions)
  const client = useApolloClient()

  const admin_user = useSelector((state: IReducer) => state.userReducer.admin_user)
  const { username, role } = admin_user.data

  const logOut = async () => {
    const response = await logout() 
    const { data, error } = response
    if (data.logout?.status) {
      client.clearStore()
      localStorage.removeItem("auth_token")
      dispatch(setAuthentication(false))
      dispatch(setAlertSnackbar({ type: "success", message: data.logout.message, visible: true }))
    } else {
      dispatch(setAlertSnackbar({ type: "danger", message: error?.message, visible: true }))
    }
  }

  return (
    <>
      <Dropdown className="header-element header-profile">
        <Dropdown.Toggle
          variant=""
          className="header-link dropdown-toggle"
          id="mainHeaderProfile"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          <div className="d-flex align-items-center">
            <div className="me-sm-2 me-0">
              <img src={face9} alt="img" width="32" height="32" className="rounded-circle" />
            </div>
            <div className="d-sm-block d-none">
              <p className="fw-semibold mb-0">{username}</p>
              <span className="op-7 fw-normal d-block fs-11">{role.role}</span>
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          align="end"
          as="ul"
          className="main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown"
          aria-labelledby="mainHeaderProfile"
        >
          <Dropdown.Item className="d-flex" onClick={() => navigate(PAGE_URL.profile)}>
            <i className="ti ti-user-circle fs-18 me-2 op-7"></i>Profile
          </Dropdown.Item>
          <Dropdown.Item className="d-flex" href="#">
            <i className="ti ti-adjustments-horizontal fs-18 me-2 op-7"></i>Settings
          </Dropdown.Item>
          <Dropdown.Item className="d-flex" onClick={logOut}>
            <i className="ti ti-logout fs-18 me-2 op-7"></i>Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
