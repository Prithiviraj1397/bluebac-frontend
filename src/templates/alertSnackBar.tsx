import { useDispatch, useSelector } from "react-redux"
import { setAlertSnackbar } from "../redux/action"
import { IReducer } from "../redux/interface"
import { ToastContainer, Toast, Button } from "react-bootstrap"

export default function AlertSnackBar() {
  const dispatch = useDispatch()
  const alertSnackBar = useSelector((state: IReducer) => state.basicReducer.alertSnackBar)

  return (
    <>
      <ToastContainer position="bottom-end" className={`p-4 alert_snack_bar ${alertSnackBar.type}`}>
        <Toast
          onClose={() => dispatch(setAlertSnackbar({ ...alertSnackBar, visible: false }))}
          show={alertSnackBar.visible}
          delay={3000}
          autohide
        >
          <div className="alert_container">
            <div className="snackMessage">
              <div className="statusIcon">
                {alertSnackBar.type === "success" && <i className="bx bx-check-circle"></i>}
                {alertSnackBar.type === "danger" && <i className="ri-close-circle-line"></i>}
                {alertSnackBar.type === "info" && <i className="ri-error-warning-line"></i>}
              </div>

              <div className="statusContent">{alertSnackBar.message}</div>
            </div>

            <div className="close_btn">
              <Button
                variant=""
                type="button"
                className="btn-close btn-sm"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></Button>
            </div>
          </div>
        </Toast>
      </ToastContainer>
    </>
  )
}
