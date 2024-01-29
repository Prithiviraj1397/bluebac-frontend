import { createRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import {setSideModalHeader } from "../../../redux/action"

interface ISideModalFooter {
  children: React.PropsWithChildren<any>
}

export default function SideModalFooter(props:ISideModalFooter) {
  const { children } = props
  const dispatch = useDispatch()

  const dialogFooterRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const value = dialogFooterRef.current?.clientHeight
    if (value) {
      dispatch(setSideModalHeader(value))
    }

    return () => {
      dispatch(setSideModalHeader(0))
    }
  }, [dispatch])

  return <div className="side_modal_footer" ref={dialogFooterRef}>{children}</div>
}
