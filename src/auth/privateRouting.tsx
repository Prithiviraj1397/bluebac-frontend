import { Navigate, Outlet, useLocation } from "react-router-dom"
import Layout from "../pages/layout"
import { PAGE_URL } from "../resources/page_url"

export default function PrivateRouting() {
  const location = useLocation()
  return localStorage.getItem("auth_token") ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={`${PAGE_URL.signIn}${location.pathname}`} replace state={{from:location.pathname}} />
  )
}
