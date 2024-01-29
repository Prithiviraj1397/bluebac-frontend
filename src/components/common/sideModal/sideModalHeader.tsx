import { createRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSideModalFooter } from "../../../redux/action"

interface ISideModalHeader {
  children: React.PropsWithChildren<any>
}

export default function SideModalHeader(props: ISideModalHeader) {
  const { children } = props
  const dispatch = useDispatch()

  const dailogHeaderRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const value = dailogHeaderRef.current?.clientHeight
    if (value) {
      dispatch(setSideModalFooter(value))
    }

    return () => {
      dispatch(setSideModalFooter(0))
    }
  }, [dispatch])

  return <div className="side_modal_header" ref={dailogHeaderRef}>{children}</div>
}
