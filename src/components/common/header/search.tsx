import { useState } from "react"
import { Modal, Dropdown, ButtonGroup, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Search() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="header-element header-search">
        <Link
          to="#"
          className="header-link"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
          onClick={handleShow}
        >
          <i className="bx bx-search-alt-2 header-link-icon"></i>
        </Link>
      </div>

      <Modal
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="searchModal"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <div className="input-group">
            <Link to="#" className="input-group-text" id="Search-Grid">
              <i className="fe fe-search header-link-icon fs-18"></i>
            </Link>
            <Form.Control
              type="search"
              className="form-control border-0 px-2"
              placeholder="Search"
              aria-label="Username"
              autoComplete="off"
            />

            <Link to="#" className="input-group-text" id="voice-search">
              <i className="fe fe-mic header-link-icon"></i>
            </Link>
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                className="btn btn-light btn-icon no-caret"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fe fe-more-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu" as="ul">
                <Dropdown.Item as="li" className="dropdown-item" href="#">
                  Action
                </Dropdown.Item>
                <Dropdown.Item as="li" className="dropdown-item" href="#">
                  Another action
                </Dropdown.Item>
                <Dropdown.Item as="li" className="dropdown-item" href="#">
                  Something else here
                </Dropdown.Item>
                <Dropdown.Divider as="li">
                  <hr className="dropdown-divider" />
                </Dropdown.Divider>
                <Dropdown.Item as="li" className="dropdown-item" href="#">
                  Separated link
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mt-4">
            <p className="font-weight-semibold text-muted mb-2">Are You Looking For...</p>
            <span className="search-tags">
              <i className="fe fe-user me-2"></i>People
              <Link to="#" className="tag-addon">
                <i className="fe fe-x"></i>
              </Link>
            </span>
            <span className="search-tags">
              <i className="fe fe-file-text me-2"></i>Pages
              <Link to="#" className="tag-addon">
                <i className="fe fe-x"></i>
              </Link>
            </span>
            <span className="search-tags">
              <i className="fe fe-align-left me-2"></i>Articles
              <Link to="#" className="tag-addon">
                <i className="fe fe-x"></i>
              </Link>
            </span>
            <span className="search-tags">
              <i className="fe fe-server me-2"></i>Tags
              <Link to="#" className="tag-addon">
                <i className="fe fe-x"></i>
              </Link>
            </span>
          </div>
          <div className="my-4">
            <p className="font-weight-semibold text-muted mb-2">Recent Search :</p>
            <div className="p-2 border br-5 d-flex align-items-center text-muted mb-2 alert">
              <Link to="#">
                <span>Notifications</span>
              </Link>
              <Link className="ms-auto lh-1" to="#" data-bs-dismiss="alert" aria-label="Close">
                <i className="fe fe-x text-muted"></i>
              </Link>
            </div>
            <div className="p-2 border br-5 d-flex align-items-center text-muted mb-2 alert">
              <Link to="#">
                <span>Alerts</span>
              </Link>
              <Link className="ms-auto lh-1" to="#" data-bs-dismiss="alert" aria-label="Close">
                <i className="fe fe-x text-muted"></i>
              </Link>
            </div>
            <div className="p-2 border br-5 d-flex align-items-center text-muted mb-0 alert">
              <Link to="#">
                <span>Mail</span>
              </Link>
              <Link className="ms-auto lh-1" to="#" data-bs-dismiss="alert" aria-label="Close">
                <i className="fe fe-x text-muted"></i>
              </Link>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup className="btn-group ms-auto">
            <Button variant="primary-light" className="btn btn-sm">
              Search
            </Button>
            <Button variant="primary" className="btn btn-sm -">
              Clear Recents
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </>
  )
}
