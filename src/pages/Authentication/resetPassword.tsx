import { FC, Fragment, useEffect, useState } from "react"
import { Button, Col, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
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
import expired_token from "../../assets/images/authentication/expired_token.svg"
//Interface
import { IChangeEvent } from "../../interface"
//API
import { useLazyQuery, useMutation } from "@apollo/client"
import { RESET_PASSWORD, TOKEN_VALIDATION } from "../../api/query"
//Resources
import { PAGE_URL } from "../../resources/page_url"
import { mutationOptions, queryOptions } from "../../resources"
//Utilities
import { validator } from "../../utilities/errorHandler"
import { formValid } from "../../utilities/formValidation"
//Component
import Loader from "../../components/common/loader/loader"
import FormInputPassword from "../../components/common/form/formInputPassword"

interface ForgetPasswordProps {}

interface IFormData {
  password: string
  confirm_password: string
}

interface IState {
  formData: IFormData
  errorData: IFormData
  disableLoader: boolean
  pageLoader: boolean
  tokenValid: boolean
}

const resetPasswordState = {
  password: "",
  confirm_password: "",
}

const ResetPassword: FC<ForgetPasswordProps> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState<IState>({
    formData: resetPasswordState,
    errorData: resetPasswordState,
    disableLoader: false,
    pageLoader: false,
    tokenValid: false,
  })
  const [resetPswd] = useMutation(RESET_PASSWORD, mutationOptions)
  const [tokenValidate] = useLazyQuery(TOKEN_VALIDATION, queryOptions)

  const url = window.location.search
  const params = new URLSearchParams(url)
  const token = params.get("token")

  const { formData, errorData, pageLoader, tokenValid, disableLoader } = state

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

  const savePassword = async () => {
    const errors = validator("reset_password", formData)
    setState(state => ({ ...state, errorData: errors }))
    if (formValid({ password: formData.password }, errors)) {
      setState(state => ({ ...state, disableLoader: true }))

      try {
        const response = await resetPswd({ variables: { token, password: formData.password } })
        const { data, errors } = response
        if (data.resetPassword) {
          dispatch(setAlertSnackbar({ type: "success", message: data.resetPassword.message, visible: true }))
          navigate(PAGE_URL.signIn)
        } else {
          const errorMsg = errors ? errors[0].message : "Process Unsuccessfull"
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

  useEffect(() => {
    const validateToken = async () => {
      console.log(token)
      if (token) {
        setState(state => ({ ...state, pageLoader: true }))
        try {
          const response = await tokenValidate({ variables: { token } })
          const { data, error } = response
          if (data.tokenValidate) {
            const { status } = data.tokenValidate
            setState(state => ({ ...state, pageLoader: false, tokenValid: !status }))
            dispatch(
              setAlertSnackbar({
                type: status ? "success" : "danger",
                message: data.tokenValidate.message,
                visible: true,
              })
            )
          } else {
            setState(state => ({
              ...state,
              loader: false,
            }))
            dispatch(setAlertSnackbar({ type: "danger", message: error?.message, visible: true }))
          }
        } catch (err: any) {
          console.log(err)
        }
      }
    }

    validateToken()
  }, [token, dispatch])

  return (
    <Fragment>
      <Helmet>
        <body className="bg-white"></body>
      </Helmet>
      {pageLoader ? (
        <Loader />
      ) : (
        <div className="row authentication mx-0">
          <Col xxl={7} xl={7} lg={12}>
            <div className="row justify-content-center align-items-center h-100">
              <Col xxl={6} xl={7} lg={7} md={7} sm={8} className="col-12">
                <div className="p-5">
                  <div className="mb-4">
                    <img src={desktoplogo} alt="" className="authentication-brand desktop-logo" />
                    <img src={desktopdarklogo} alt="" className="authentication-brand desktop-dark" />
                  </div>
                  {!tokenValid ? (
                    <div className="auth_image_content">
                      <div className="top_img_sec">
                        <img className="auth_vector_img" src={expired_token} alt="login" />
                      </div>

                      <div className="content">
                        <p className="h5 fw-semibold mb-1">Your session was expired</p>
                        <p>Don't worry, to reset your password again, click the "try again" option below.</p>
                      </div>

                      <Col xl={12} className="d-grid mt-2">
                        <Button
                          onClick={() => navigate(PAGE_URL.forgetPassword)}
                          className="btn btn-lg"
                          variant="primary"
                        >
                          Try Again
                        </Button>
                      </Col>
                    </div>
                  ) : (
                    <>
                      <p className="h5 fw-semibold mb-5">Reset Password</p>
                      <div className="row gy-3">
                        <Col xl={12}>
                          <Form.Label htmlFor="reset-newpassword" className="form-label text-default">
                            New Password
                          </Form.Label>
                          <FormInputPassword
                            className="form-control-lg"
                            formProps={{
                              name: "password",
                              onChange: changeHandler,
                              value: formData.password,
                              isInvalid: errorData.password.length > 0,
                              disabled: disableLoader,
                            }}
                            error={errorData.password}
                          />
                        </Col>
                        <Col xl={12} className="mb-3">
                          <Form.Label htmlFor="reset-confirmpassword" className="form-label text-default">
                            Confirm Password
                          </Form.Label>
                          <FormInputPassword
                            className="form-control-lg"
                            formProps={{
                              name: "confirm_password",
                              onChange: changeHandler,
                              value: formData.confirm_password,
                              isInvalid: errorData.confirm_password.length > 0,
                              disabled: disableLoader,
                            }}
                            error={errorData.confirm_password}
                          />
                        </Col>
                        <Col xl={12} className="d-grid mt-2">
                          <Button onClick={savePassword} className="btn btn-lg" variant="primary">
                            Save
                          </Button>
                        </Col>
                      </div>
                      <div className="text-center">
                        <p className="fs-12 text-muted mt-4">
                          Already have an account?{" "}
                          <Link to={PAGE_URL.signIn} className="text-primary">
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </>
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
      )}
    </Fragment>
  )
}

export default ResetPassword
