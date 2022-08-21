import { createContext, useContext, useEffect, useRef, useState } from 'react'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { SignInModal } from '../../features/auth/SignIn'
import { SignUpModal } from '../../features/auth/SignUp'
import { EditTodoModal } from '../EditTodo'
import { ProfileModal } from '../../features/auth/Profile'
import { TermsModal } from '../Terms'
import ModalOverlay from '../ModalOverlay'

const cx = classNames.bind(styles)

export const ModalContext = createContext()
export const useCloseModal = () => useContext(ModalContext)

export const RenderModal = ({ modal }) => {
  if (modal.showSignInModal.open) return <SignInModal />
  if (modal.showSignUpModal.open) return <SignUpModal />
  if (modal.showEditTodoModal.open) return <EditTodoModal />
  if (modal.showProfileModal.open) return <ProfileModal />
  if (modal.showTermsModal.open) return <TermsModal />
}

const Modal = ({ open, onClose, onCloseSideEffect, children }) => {
  const [dismount, setDismount] = useState(false)
  const currentScrollPosition = useRef(window.pageYOffset)

  useEffect(() => {
    const scrollOffset = currentScrollPosition.current
    window.addEventListener('keydown', handleKeyDown)
    window.scrollTo({ top: 0 })
    document.body.classList.add('disableScroll')
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('disableScroll')
      window.scrollTo({ top: scrollOffset })
    }
  })

  if (!open) return null

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleDismount()
  }

  const handleDismount = (callback) => {
    if (dismount === true) return
    // Timeout for closing animation
    setTimeout(() => {
      // Override the default side effect
      if (typeof callback === 'function') {
        callback()
      } else {
        typeof onCloseSideEffect === 'function' && onCloseSideEffect()
      }
      onClose()
    }, 200)
    setDismount(true)
  }

  return (
    <ModalContext.Provider value={handleDismount}>
      <ModalOverlay
          onDismount={dismount}
          onClick={handleDismount}
          onKeyDown={handleKeyDown}
      />
      <div
        className={cx({
          modal: true,
          'modal--dismount': dismount
        })}
      >
        {children}
      </div>
    </ModalContext.Provider>
  )
}

export default Modal
