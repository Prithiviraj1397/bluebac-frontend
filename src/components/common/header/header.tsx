import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
//Redux
import store from "../../../redux/store"
import { connect } from "react-redux"
import { ThemeChanger } from "../../../redux/action"
//Images
import desktoplogo from "../../../assets/images/brand-logos/logo1.svg"
import togglelogo from "../../../assets/images/brand-logos/toggle-logo.svg"
import desktopdark from "../../../assets/images/brand-logos/logo2.svg"
import toggledark from "../../../assets/images/brand-logos/toggle-dark.svg"
import desktopwhite from "../../../assets/images/brand-logos/logo1.svg"
import togglewhite from "../../../assets/images/brand-logos/toggle-logo.svg"
//Components
import Notification from "./notification"
import Search from "./search"
import Profile from "./profile"

const Header = ({ local_varaiable, ThemeChanger }: any) => {
  const [fullScreen, setFullScreen] = useState(false)

  const toggleFullScreen = () => {
    const elem = document.documentElement

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setFullScreen(true))
    } else {
      document.exitFullscreen().then(() => setFullScreen(false))
    }
  }

  const handleFullscreenChange = () => {
    setFullScreen(!!document.fullscreenElement)
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  //Dark Model
  const ToggleDark = () => {
    ThemeChanger({
      ...local_varaiable,
      dataThemeMode: local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
      dataHeaderStyles: local_varaiable.dataHeaderStyles == "dark" ? "light" : "dark",
      dataMenuStyles:
        local_varaiable.dataNavLayout == "horizontal"
          ? local_varaiable.dataThemeMode == "dark"
            ? "light"
            : "dark"
          : "dark",
    })
    const theme = store.getState()

    if (theme.basicReducer.dataThemeMode != "dark") {
      ThemeChanger({
        ...theme,
        bodyBg1: "",
        bodyBg2: "",
        darkBg: "",
        inputBorder: "",
      })
      localStorage.setItem("ynexlighttheme", "light")
      localStorage.removeItem("ynexdarktheme")
      localStorage.removeItem("darkBgRGB1")
      localStorage.removeItem("darkBgRGB2")
      localStorage.removeItem("darkBgRGB3")
      localStorage.removeItem("darkBgRGB4")
    } else {
      localStorage.setItem("ynexdarktheme", "dark")
      localStorage.removeItem("ynexlighttheme")
    }
  }

  function menuClose() {
    const theme = store.getState()
    ThemeChanger({ ...theme, toggled: "close" })
  }

  const toggleSidebar = () => {
    const theme = store.getState()
    const sidemenuType = theme.basicReducer.dataNavLayout
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        const verticalStyle = theme.basicReducer.dataVerticalStyle
        const navStyle = theme.basicReducer.dataNavStyle
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" })
            if (theme.basicReducer.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "close-menu-close" })
            }
            break
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" })
            if (theme.basicReducer.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, toggled: "icon-overlay-close" })
              }
            }
            break
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" })
            if (theme.basicReducer.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "icon-text-close" })
            }
            break
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" })
            if (theme.basicReducer.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" })
            } else {
              const sidemenu = document.querySelector(".side-menu__item.active")
              if (sidemenu) {
                ThemeChanger({ ...theme, toggled: "double-menu-open" })
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active")
                } else {
                  ThemeChanger({ ...theme, toggled: "" })
                }
              }
            }

            // doublemenu(ThemeChanger);
            break
          // detached
          case "detached":
            if (theme.basicReducer.toggled === "detached-close") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "detached-close" })
            }
            break
          // default
          case "default":
            ThemeChanger({ ...theme, toggled: "" })
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.basicReducer.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "menu-click-closed" })
            }
            break
          // icon-overlay
          case "menu-hover":
            if (theme.basicReducer.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "menu-hover-closed" })
            }
            break
          case "icon-click":
            if (theme.basicReducer.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "icon-click-closed" })
            }
            break
          case "icon-hover":
            if (theme.basicReducer.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" })
            } else {
              ThemeChanger({ ...theme, toggled: "icon-hover-closed" })
            }
            break
        }
      }
    } else {
      if (theme.basicReducer.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" })

        setTimeout(() => {
          if (theme.basicReducer.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay")

            if (overlay) {
              overlay.classList.add("active")
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay")

                if (overlay) {
                  overlay.classList.remove("active")
                  menuClose()
                }
              })
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay")

              if (overlay) {
                overlay.classList.remove("active")
              }
            }
          })
        }, 100)
      } else {
        ThemeChanger({ ...theme, toggled: "close" })
      }
    }
  }

  return (
    <Fragment>
      <header className="app-header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                <Link to={`${import.meta.env.BASE_URL}dashboards/crm/`} className="header-logo">
                  <img src={desktoplogo} alt="logo" className="desktop-logo" />
                  <img src={togglelogo} alt="logo" className="toggle-logo" />
                  <img src={desktopdark} alt="logo" className="desktop-dark" />
                  <img src={toggledark} alt="logo" className="toggle-dark" />
                  <img src={desktopwhite} alt="logo" className="desktop-white" />
                  <img src={togglewhite} alt="logo" className="toggle-white" />
                </Link>
              </div>
            </div>
            <div className="header-element">
              <Link
                aria-label="Hide Sidebar"
                onClick={() => toggleSidebar()}
                className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
                data-bs-toggle="sidebar"
                to="#"
              >
                <span></span>
              </Link>
            </div>
          </div>

          <div className="header-content-right">
            <Search />

            <div className="header-element header-theme-mode">
              <Link to="#" className="header-link layout-setting" onClick={() => ToggleDark()}>
                <span className="light-layout">
                  <i className="bx bx-moon header-link-icon"></i>
                </span>
                <span className="dark-layout">
                  <i className="bx bx-sun header-link-icon"></i>
                </span>
              </Link>
            </div>

            <Notification />

            <div className="header-element header-fullscreen">
              <Link onClick={toggleFullScreen} to="#" className="header-link">
                {fullScreen ? (
                  <i className="bx bx-exit-fullscreen header-link-icon"></i>
                ) : (
                  <i className="bx bx-fullscreen header-link-icon"></i>
                )}
              </Link>
            </div>

            <Profile />
          </div>
        </div>
      </header>
    </Fragment>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
})
export default connect(mapStateToProps, { ThemeChanger })(Header)
