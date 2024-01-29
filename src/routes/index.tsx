import { lazy } from "react"
import { PAGE_URL } from "../resources/page_url"

const Signin = lazy(() => import("../pages/Authentication/signin"))
const ForgetPassword = lazy(() => import("../pages/Authentication/forgetPassword"))
const ResetPassword = lazy(() => import("../pages/Authentication/resetPassword"))
const Dashboard = lazy(() => import("../container/dashboards/crm/crm"))
const Profile = lazy(() => import("../pages/profile"))

export const auth_routing = [
  {
    path: PAGE_URL.signIn,
    element: <Signin />,
  },
  {
    path: `${PAGE_URL.signIn}/:id`,
    element: <Signin />,
  },
  {
    path: PAGE_URL.forgetPassword,
    element: <ForgetPassword />,
  },
  {
    path: PAGE_URL.resetPassword,
    element: <ResetPassword />,
  },
]

export const routing = [
  {
    path: PAGE_URL.dashboard,
    element: <Dashboard />,
  },
  {
    path: PAGE_URL.profile,
    element: <Profile />,
  },
]
