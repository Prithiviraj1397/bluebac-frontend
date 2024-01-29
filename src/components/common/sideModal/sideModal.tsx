import { Modal } from "react-bootstrap"

interface ISideModal {
  children: any
  open: boolean
  handleClose: () => void
}

export default function SideModal(props: ISideModal) {
  const { children, open, handleClose } = props

  return (
    <>
      <Modal show={open} onHide={handleClose} className="side_dialog_box">
        <Modal.Header closeButton></Modal.Header>
        {children}
      </Modal>
    </>
  )
}
