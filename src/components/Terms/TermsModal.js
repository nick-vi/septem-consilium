import { useDispatch, useSelector } from 'react-redux'
import { closeTermsModal } from '../../features/modal/modalSlice'
import Modal from '../Modal'
import Terms from './Terms'

export const TermsModal = () => {
  const { open } = useSelector((state) => state.modal.showTermsModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeTermsModal())
  }

  return (
    <Modal onClose={handleClose} open={open}>
      <Terms />
    </Modal>
  )
}
