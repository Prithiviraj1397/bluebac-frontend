import { FC, Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Button, Col, Form } from "react-bootstrap"
//Images
import desktoplogo from "../../assets/images/brand-logos/logo1.svg"
import desktopdarklogo from "../../assets/images/brand-logos/logo2.svg"
import img1 from "../../assets/images/authentication/2.jpg"
import img2 from "../../assets/images/authentication/3.jpg"
import img3 from "../../assets/images/authentication/4.jpg"
//Redux
import { useDispatch } from "react-redux"
import { setAlertSnackbar, setAuthentication } from "../../redux/action"
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
//API
import { useLazyQuery } from "@apollo/client"
import { LOGIN } from "../../api/query"
//Interface
import { IChangeEvent } from "../../interface"
//Utilites
import { validator } from "../../utilities/errorHandler"
import { formValid } from "../../utilities/formValidation"
// Resources
import { queryOptions } from "../../resources"
import { PAGE_URL } from "../../resources/page_url"
import FormInputText from "../../components/common/form/formInputText"
import FormInputPassword from "../../components/common/form/formInputPassword"

interface SigninProps {}

interface IFormData {
  email: string
  password: string
}

type IErrorData = IFormData & {
  apiError: string
}

interface IState {
  formData: IFormData
  errorData: IErrorData
  disableLoader: boolean
}

const formState = {
  email: "",
  password: "",
}

const Signin: FC<SigninProps> = () => {
  const dispatch = useDispatch()
  const [login] = useLazyQuery(LOGIN, queryOptions)

  const [state, setState] = useState<IState>({
    formData: formState,
    errorData: { ...formState, apiError: "" },
    disableLoader: false,
  })

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

  const { formData, errorData, disableLoader } = state

  const loginHandler = async () => {
    const errors = validator("login_form", formData)
    setState(state => ({ ...state, errorData: { ...errors, apiError: "" } }))

    if (formValid(formData, errors)) {
      setState(state => ({ ...state, disableLoader: true }))
      const response = await login({ variables: formData })
      const { data, error } = response
      if (data.login.status) {
        dispatch(setAlertSnackbar({ visible: true, type: "success", message: data.login.message }))
        localStorage.setItem("auth_token", data.login.token)
        dispatch(setAuthentication(true))
      } else {
        dispatch(
          setAlertSnackbar({
            visible: true,
            type: "danger",
            message: data.login.message ? data.login.message : (error?.message as string),
          })
        )
        setState(state => ({
          ...state,
          errorData: { ...state.errorData, apiError: data.login.message ? data.login.message : "" },
          disableLoader: false,
        }))
      }
    }
  }

  return (
    <Fragment>
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
                <p className="h5 fw-semibold mb-5">Sign In</p>
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
                        isInvalid: errorData.email.length > 0 || errorData.apiError.length > 0,
                        disabled: disableLoader,
                      }}
                      error={errorData.email}
                    />
                  </Col>
                  <Col xl={12} className=" mb-3">
                    <Form.Label htmlFor="signin-password" className="form-label text-default d-block">
                      Password
                    </Form.Label>
                    <FormInputPassword
                      className="form-control-lg"
                      formProps={{
                        name: "password",
                        placeholder: "Password",
                        onChange: changeHandler,
                        value: formData.password,
                        isInvalid: errorData.password.length > 0 || errorData.apiError.length > 0,
                        disabled: disableLoader,
                      }}
                      error={errorData.password}
                      apiError={errorData.apiError}
                    />
                    <Link to={PAGE_URL.forgetPassword} className="float-end text-danger mt-1 fw-bold">
                      Forget password ?
                    </Link>
                  </Col>
                  <Col xl={12} className="d-grid mt-2">
                    <Button
                      variant="primary"
                      className="btn btn-lg"
                      onClick={loginHandler}
                      disabled={disableLoader}
                    >
                      Sign In
                    </Button>
                  </Col>
                </div>
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
    </Fragment>
  )
}

export default Signin
