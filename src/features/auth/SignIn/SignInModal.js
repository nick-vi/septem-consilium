import { closeSignInModal } from '../../modal/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/Modal'
import SignIn from './SignIn'

export const SignInModal = () => {
  const { open } = useSelector((state) => state.modal.showSignInModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeSignInModal())
  }

  return (
    <Modal onClose={handleClose} open={open}>
      <SignIn />
    </Modal>
  )
}
