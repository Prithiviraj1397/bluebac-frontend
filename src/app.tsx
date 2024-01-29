import { Suspense, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
//Redux
import { IReducer } from "./redux/interface"
import { useDispatch, useSelector } from "react-redux"
import { setAdminUser, setAuthentication } from "./redux/action"
//Resources
import { PAGE_URL } from "./resources/page_url"
import { auth_routing, routing } from "./routes"
//Components
import Loader from "./components/common/loader/loader"
import AlertSnackBar from "./templates/alertSnackBar"
//Authentication
import PublicRouting from "./auth/publicRouting"
import PrivateRouting from "./auth/privateRouting"
//API
import { useLazyQuery } from "@apollo/client"
import { GET_TOKEN_DETAILS } from "./api/query"
//Resources
import { queryOptions } from "./resources"

export default function App() {
  const dispatch = useDispatch()
  const is_authenticated = useSelector((state:IReducer) => state.userReducer.is_authenticated)

  const [getTokenDetails] = useLazyQuery(GET_TOKEN_DETAILS, queryOptions)
  const token = localStorage.getItem("auth_token")
  
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      dispatch(setAuthentication(true))
    }
  }, [dispatch])

  useEffect(() => {
    const getAdminUser = async () => {
      if (token) {
        try {
          const response = await getTokenDetails({ variables: { token } })
          const { data, error } = response
          if (data.getTokenDetails) {
            dispatch(setAdminUser(data.getTokenDetails))
          } else {
            console.log(error)
          }
        } catch (err: any) {
          localStorage.removeItem("auth_token")
          dispatch(setAuthentication(false))
          console.log(err)
        }
      }
    }

    getAdminUser()
  }, [token])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={is_authenticated ? PAGE_URL.dashboard : PAGE_URL.signIn} />} />

        <Route element={<PublicRouting />}>
          {auth_routing.map((item, i) => {
            return (
              <Route
                key={i}
                path={item.path}
                element={<Suspense fallback={<Loader />}>{item.element}</Suspense>}
              />
            )
          })}
        </Route>

        <Route element={<PrivateRouting />}>
          {routing.map((item, i) => {
            return (
              <Route
                key={i}
                path={item.path}
                element={<Suspense fallback={<Loader />}>{item.element}</Suspense>}
              />
            )
          })}
        </Route>
      </Routes>

      <AlertSnackBar />
    </>
  )
}
