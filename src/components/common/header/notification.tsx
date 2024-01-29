import { useState } from "react"
import { Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

const initialNotifications = [
  {
    id: 1,
    avatarColor: "primary",
    icon: "ti-gift",
    text1: "Your Order Has Been Shipped",
    text2: "Order No: 123456 Has Shipped To YourDelivery Address",
    class: "",
    class1: "",
  },
  {
    id: 2,
    avatarColor: "secondary",
    icon: "ti-discount-2",
    text1: "Discount Available",
    text2: "Discount Available On Selected Products",
    class: "",
    class1: "",
  },
  {
    id: 3,
    avatarColor: "pink",
    icon: "ti-user-check",
    text1: "Account Has Been Verified",
    text2: "Your Account Has Been Verified Successfully",
    class: "",
    class1: "",
  },
  {
    id: 4,
    avatarColor: "warning",
    icon: "ti-circle-check",
    text1: "Order Placed ",
    text2: "Order Placed Successflly",
    class: "text-warning",
    class1: " ID:1116773",
  },
  {
    id: 5,
    avatarColor: "success",
    icon: "ti-clock",
    text1: "Order Delayed",
    text2: "Order Delayed Unfortunately",
    class: "text-success",
    class1: " ID:7731116",
  },
]

export default function Notification() {
  const [notifications, setNotifications] = useState([...initialNotifications])

  const handleNotificationClose = (index: any) => {
    // Create a copy of the notifications array and remove the item at the specified index
    const updatedNotifications = [...notifications]
    updatedNotifications.splice(index, 1)
    setNotifications(updatedNotifications)
  }
  return (
    <>
      <Dropdown className="header-element notifications-dropdown" autoClose="outside">
        <Dropdown.Toggle
          variant=""
          className="header-link dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          id="messageDropdown"
          aria-expanded="false"
        >
          <i className="bx bx-bell header-link-icon"></i>
          <span
            className="badge bg-secondary rounded-pill header-icon-badge pulse pulse-secondary"
            id="notification-icon-badge"
          >
            {notifications.length}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu
          align="end"
          className="main-header-dropdown dropdown-menu dropdown-menu-end"
          data-popper-placement="none"
        >
          <div className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0 fs-17 fw-semibold">Notifications</p>
              <span
                className="badge bg-secondary-transparent"
                id="notifiation-data"
              >{`${notifications.length} Unread`}</span>
            </div>
          </div>
          <Dropdown.Divider className="dropdown-divider"></Dropdown.Divider>
          <ul className="list-unstyled mb-0" id="header-notification-scroll">
            {notifications.map((notification, index) => (
              <Dropdown.Item as="li" className="dropdown-item" key={index}>
                <div className="d-flex align-items-start">
                  <div className="pe-2">
                    <span className={`avatar avatar-md bg-${notification.avatarColor}-transparent avatar-rounded`}>
                      <i className={`ti ${notification.icon} fs-18`}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 d-flex align-items-center justify-content-between text-wrap">
                    <div>
                      <p className="mb-0 fw-semibold">
                        <Link to="#">{notification.text1}</Link>
                        <span className={notification.class}>{notification.class1}</span>
                      </p>
                      <span className="text-muted fw-normal fs-12 header-notification-text">
                        {notification.text2}
                      </span>
                    </div>
                    <div>
                      <Link
                        to="#"
                        className="min-w-fit-content text-muted me-1 dropdown-item-close1"
                        onClick={() => handleNotificationClose(index)}
                      >
                        <i className="ti ti-x fs-16"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </Dropdown.Item>
            ))}
          </ul>
          <div
            className={`p-3 empty-header-item1 border-top ${notifications.length === 0 ? "d-none" : "d-block"}`}
          >
            <div className="d-grid">
              <Link to="#" className="btn btn-primary">
                View All
              </Link>
            </div>
          </div>
          <div className={`p-5 empty-item1 ${notifications.length === 0 ? "d-block" : "d-none"}`}>
            <div className="text-center">
              <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                <i className="ri-notification-off-line fs-2"></i>
              </span>
              <h6 className="fw-semibold mt-3">No New Notifications</h6>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
