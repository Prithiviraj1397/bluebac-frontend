import { Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap"
import FormInputText from "../../components/common/form/formInputText"
import { useState } from "react"
import { IChangeEvent } from "../../interface"
import FormInputTextarea from "../../components/common/form/formInputTextarea"
import SideModalContent from "../../components/common/sideModal/sideModalContent"
import SideModalHeader from "../../components/common/sideModal/sideModalHeader"
import SideModalFooter from "../../components/common/sideModal/sideModalFooter"
import { permissionArray } from "../../resources"
import { IAccess } from "../../redux/interface"

interface IPermission {
  label: string
  access: {
    add: boolean
    view: boolean
    edit: boolean
    delete: boolean
  }
}

interface IFormData {
  firstName: string
  lastName: string
  type: string
  email: string
  gender: string
  phoneNo: string
  country: string
  address: string
  permissions: IPermission[]
}

interface IState {
  formData: IFormData
  errorData: {
    firstName: string
    email: string
    phoneNo: string
    country: string
    address: string
  }
  disableLoader: boolean
  selectedPermission: string
}

const intialFormState: IFormData = {
  firstName: "",
  lastName: "",
  type: "",
  email: "",
  gender: "",
  phoneNo: "",
  country: "",
  address: "",
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
}

export default function CreateSubAdmin() {
  const [state, setState] = useState<IState>({
    formData: intialFormState,
    errorData: {
      firstName: "",
      email: "",
      phoneNo: "",
      country: "",
      address: "",
    },
    disableLoader: false,
    selectedPermission: "",
  })

  const { formData, errorData, disableLoader, selectedPermission } = state

  const changeHandler = (e: IChangeEvent) => {
    const { name, value } = e.target
    setState(state => ({
      ...state,
      formData: {
        ...state.formData,
        [name]: value,
      },
      errorData: {
        ...state.errorData,
        [name]: "",
      },
    }))
  }

  return (
    <>
      <SideModalHeader>
        <h4 className="modal_title">Create Sub-Admin</h4>
      </SideModalHeader>
      <SideModalContent>
        <Card className="custom-card mt-3">
          <Card.Header className=" justify-content-between">
            <Card.Title>Personal Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">First Name</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "firstName",
                      value: formData.firstName,
                      onChange: changeHandler,
                      isInvalid: errorData.firstName.length > 0,
                      disabled: disableLoader,
                    }}
                    error={errorData.firstName}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">Last Name</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "lastName",
                      value: formData.lastName,
                      onChange: changeHandler,
                      disabled: disableLoader,
                    }}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">Email</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "email",
                      value: formData.email,
                      onChange: changeHandler,
                      isInvalid: errorData.email.length > 0,
                      disabled: disableLoader,
                    }}
                    error={errorData.email}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">Phone No</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "phoneNo",
                      value: formData.phoneNo,
                      onChange: changeHandler,
                      isInvalid: errorData.phoneNo.length > 0,
                      disabled: disableLoader,
                    }}
                    error={errorData.phoneNo}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">User Type</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "type",
                      value: formData.type,
                      onChange: changeHandler,
                      disabled: disableLoader,
                    }}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">Gender</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "gender",
                      value: formData.gender,
                      onChange: changeHandler,
                      disabled: disableLoader,
                    }}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">Country</Form.Label>
                  <FormInputText
                    formProps={{
                      name: "country",
                      value: formData.country,
                      onChange: changeHandler,
                      disabled: disableLoader,
                    }}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label text-default">Address</Form.Label>
                  <FormInputTextarea
                    formProps={{
                      name: "address",
                      value: formData.address,
                      onChange: changeHandler,
                      disabled: disableLoader,
                    }}
                    rows={4}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="custom-card">
          <Card.Header className=" justify-content-between">
            <Card.Title>Permissions</Card.Title>
          </Card.Header>
          <Card.Body>
            <ButtonGroup className="select_button_groups">
              {permissionArray.map((item: IAccess, i: number) => {
                return (
                  <Button
                    key={i}
                    variant={selectedPermission === item.label ? "primary" : "light"}
                    onClick={() => setState(state => ({ ...state, selectedPermission: item.label }))}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </ButtonGroup>

            <div className="d-flex justify-content-center mt-4">
              <Form.Check type="switch" id="add" label="Add" className="me-3" />
              <Form.Check type="switch" id="edit" label="Edit" className="me-3" />
              <Form.Check type="switch" id="delete" label="Delete" className="me-3" />
              <Form.Check type="switch" id="read" label="Read" />
            </div>
          </Card.Body>
        </Card>
      </SideModalContent>

      <SideModalFooter>
        <div className="d-flex justify-content-end">
          <Button variant="light" className="me-2">
            Cancel
          </Button>
          <Button>Submit</Button>
        </div>
      </SideModalFooter>
    </>
  )
}
