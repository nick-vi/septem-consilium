import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/Modal'
import { closeSignUpModal } from '../../modal/modalSlice'
import SignUp from './SignUp'

export const SignUpModal = () => {
  const { open } = useSelector((state) => state.modal.showSignUpModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeSignUpModal())
  }

  return (
    <Modal onClose={handleClose} open={open}>
      <SignUp />
    </Modal>
  )
}
