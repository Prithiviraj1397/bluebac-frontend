import { Helmet } from "react-helmet-async"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function PublicRouting() {
  const location = useLocation()
  return !localStorage.getItem("auth_token") ? (
    <>
      <Helmet>
        <body className=""></body>
      </Helmet>
      <Outlet />
    </>
  ) : (
    <Navigate to={location.state?.from ? location.state.from : "/"} replace />
  )
}
