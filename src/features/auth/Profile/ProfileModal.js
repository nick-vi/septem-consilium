import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/Modal'
import { closeProfileModal } from '../../modal/modalSlice'
import Profile from './Profile'

export const ProfileModal = () => {
  const { open } = useSelector((state) => state.modal.showProfileModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeProfileModal())
  }

  return (
    <Modal onClose={handleClose} open={open}>
      <Profile />
    </Modal>
  )
}
