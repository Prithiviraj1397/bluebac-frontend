import { useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { Helmet } from "react-helmet"
//Redux
import { useDispatch } from "react-redux"
import { setAlertSnackbar } from "../../redux/action"
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
//Images
import desktoplogo from "../../assets/images/brand-logos/logo1.svg"
import desktopdarklogo from "../../assets/images/brand-logos/logo2.svg"
import img1 from "../../assets/images/authentication/2.jpg"
import img2 from "../../assets/images/authentication/3.jpg"
import img3 from "../../assets/images/authentication/4.jpg"
import check_mail from "../../assets/images/authentication/check_mail.svg"
//Interface
import { IChangeEvent } from "../../interface"
//API
import { useLazyQuery } from "@apollo/client"
import { FORGET_PASSWORD } from "../../api/query"
//Resources
import { queryOptions } from "../../resources"
//Utilities
import { validator } from "../../utilities/errorHandler"
import { formValid } from "../../utilities/formValidation"
import FormInputText from "../../components/common/form/formInputText"

interface IFormValue {
  email: string
}

interface IState {
  formData: IFormValue
  errorData: IFormValue
  disableLoader: boolean
  mailSend: boolean
}

const formValue = {
  email: "",
}

export default function ForgetPassword() {
  const dispatch = useDispatch()
  const [forgotPassword] = useLazyQuery(FORGET_PASSWORD, queryOptions)
  const [state, setState] = useState<IState>({
    formData: formValue,
    errorData: formValue,
    disableLoader: false,
    mailSend: false,
  })

  const { formData, errorData, mailSend, disableLoader } = state

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
        apiError: "",
      },
    }))
  }

  const sendMail = async () => {
    const value = { email: formData.email }
    const errors = validator("forget_password", value)
    setState(state => ({ ...state, errorData: { ...state.errorData, email: errors.email } }))
    if (formValid(value, errors)) {
      setState(state => ({ ...state, disableLoader: true }))
      try {
        const response = await forgotPassword({ variables: value })
        const { data, error } = response
        if (data.forgotPassword) {
          setState(state => ({ ...state, mailSend: true }))
          dispatch(setAlertSnackbar({ type: "success", message: data.forgotPassword.message, visible: true }))
        } else {
          const errorMsg = data["forgetPassword"].message ? data["forgetPassword"].message : error?.message
          setState(state => ({
            ...state,
            disableLoader: false,
          }))
          dispatch(setAlertSnackbar({ type: "danger", message: errorMsg, visible: true }))
        }
      } catch (err: any) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <Helmet>
        <body className="bg-white"></body>
      </Helmet>

      <div className="row authentication mx-0">
        <Col xxl={7} xl={7} lg={12}>
          <div className="row justify-content-center align-items-center h-100">
            <Col xxl={6} xl={7} lg={7} md={7} sm={8} className="col-12">
              <div className="p-5">
                <div className="mb-4">
                  <img src={desktoplogo} alt="" className="authentication-brand desktop-logo" />
                  <img src={desktopdarklogo} alt="" className="authentication-brand desktop-dark" />
                </div>
                <p className="h5 fw-semibold">{mailSend ? "Check your mail" : "Forget password"}</p>
                <p className="mb-5">
                  {!mailSend &&
                    "We have sent a password recover instructions to your email. If you don't receive any mail, just reload the page and try again sometimes."}
                </p>

                {mailSend && (
                  <div className="auth_image_content">
                    <div className="top_img_sec">
                      <img className="auth_vector_img" src={check_mail} alt="check mail" />
                    </div>

                    <div className="content">
                      <p className="mb-5">The Verfication email will be send to the mailbox</p>
                    </div>
                  </div>
                )}

                {!mailSend && (
                  <div className="row gy-3">
                    <Col xl={12} className=" mt-0">
                      <Form.Label htmlFor="signin-email" className="form-label text-default">
                        Email
                      </Form.Label>
                      <FormInputText
                        className="form-control-lg"
                        formProps={{
                          name: "email",
                          placeholder: "Email",
                          value: formData.email,
                          onChange: changeHandler,
                          isInvalid: errorData.email.length > 0,
                          disabled: disableLoader,
                        }}
                        error={errorData.email}
                      />
                    </Col>
                    <Col xl={12} className="d-grid mt-4">
                      <Button variant="primary" disabled={disableLoader} className="btn btn-lg" onClick={sendMail}>
                        Send
                      </Button>
                    </Col>
                  </div>
                )}
              </div>
            </Col>
          </div>
        </Col>
        <Col xxl={5} xl={5} lg={5} className="d-xl-block d-none px-0">
          <div className="authentication-cover">
            <div className="swiper keyboard-control">
              <Swiper
                spaceBetween={30}
                navigation={true}
                centeredSlides={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={img3} className="authentication-image" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img2} className="authentication-image" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img1} className="authentication-image" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </Col>
      </div>
    </>
  )
}
