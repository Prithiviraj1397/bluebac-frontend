import { useSelector } from "react-redux"
import { IReducer } from "../../../redux/interface"

interface IDialogContentSection {
  children:React.PropsWithChildren<any>
}

export default function SideModalContent(props:IDialogContentSection) {
  const {children} = props
  const sideModalHeader = useSelector((state:IReducer)=> state.basicReducer.sideModalHeader)
  const sideModalFooter = useSelector((state:IReducer)=> state.basicReducer.sideModalFooter)

  return <div className="side_modal_content" style={{height:`calc(100vh - ${sideModalHeader + sideModalFooter}px)`}}>{children}</div>
}
