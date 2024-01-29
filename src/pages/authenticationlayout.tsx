import { Fragment } from "react"
import { Helmet } from "react-helmet-async"
import { Outlet } from "react-router-dom"

function Authenticationlayout() {
  return (
    <Fragment>
      <Helmet>
        <body className=""></body>
      </Helmet>
      <Outlet />
    </Fragment>
  )
}

export default Authenticationlayout
