import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"
//Redux
import { connect } from "react-redux"
//Components
import Sidebar from "../components/common/sidebar/sidebar"
import Header from "../components/common/header/header"
import Footer from "../components/common/footer/footer"
import Loader from "../components/common/loader/loader"
import TabToTop from "../components/common/tabtotop/tabtotop"

function Layout({ local_varaiable }: any) {
  const [MyclassName, setMyClass] = useState("")

  const Bodyclickk = () => {
    if (localStorage.getItem("ynexverticalstyles") == "icontext") {
      setMyClass("")
    }
  }

  const [isLoading, setIsLoading] = useState(localStorage.ynexloaderdisable != "disable")

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  return (
    <>
      {isLoading && <Loader></Loader>}
      <HelmetProvider>
        <Helmet>
          <html
            dir={local_varaiable.dir}
            data-theme-mode={local_varaiable.dataThemeMode}
            data-header-styles={local_varaiable.dataHeaderStyles}
            data-vertical-style={local_varaiable.dataVerticalStyle}
            data-nav-layout={local_varaiable.dataNavLayout}
            data-menu-styles={local_varaiable.dataMenuStyles}
            data-toggled={local_varaiable.toggled}
            data-nav-style={local_varaiable.dataNavStyle}
            hor-style={local_varaiable.horStyle}
            data-page-style={local_varaiable.dataPageStyle}
            data-width={local_varaiable.dataWidth}
            data-menu-position={local_varaiable.dataMenuPosition}
            data-header-position={local_varaiable.dataHeaderPosition}
            data-icon-overlay={local_varaiable.iconOverlay}
            data-bg-img={local_varaiable.bgImg}
            data-icon-text={MyclassName ? MyclassName : local_varaiable.iconText}
            data-loader={local_varaiable.loader}
          />
        </Helmet>
        <div className="page">
          <Header />
          <Sidebar />
          <div className="main-content app-content" onClick={Bodyclickk}>
            <div className="container-fluid">
               <Outlet/>
            </div>
          </div>
          <Footer />
        </div>
        <TabToTop />
      </HelmetProvider>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state.basicReducer,
})

export default connect(mapStateToProps)(Layout)
