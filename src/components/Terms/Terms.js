import { useDispatch } from 'react-redux'
import { useCloseModal } from '../Modal/Modal'
import { showSignUpModal } from '../../features/modal/modalSlice'
import {
  ModalContainer,
  ModalHeader,
  ModalButton,
  ModalTypography
} from '../Modal'

const Terms = () => {
  const dispatch = useDispatch()
  const closeModal = useCloseModal()

  const handleSignUp = () => {
    closeModal(() => {
      dispatch(showSignUpModal())
    })
  }

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTypography heading>Things to know.</ModalTypography>
        <ModalButton
          variant="outlined-transparent"
          value="Sign Up"
          onClick={handleSignUp}
          transparentBg
          small
        />
      </ModalHeader>
      <ModalTypography small>
        The app collects nothing except the information you provide, such as
        email address, name, password, and the todos you insert.
        <br />
        The app is for experimental and educational purposes but fully
        functional, and you can use it to plan your week. <br />
        If for some reason, you want to stop using the app, you can delete your
        account and information anytime in the profile window and export your
        todos in a CSV file for future reference. <br />
        However, after 24 months of inactivity, the account will self-destruct
        and everything associated with it.
        <br />
        <br />
        <a href="https://tweek.so/" target="_blank" rel="noreferrer">
          Tweek
        </a>{' '}
        heavily inspires the app, so if you want to experience the original, you
        can go there and support their project.
      </ModalTypography>
    </ModalContainer>
  )
}

export default Terms
