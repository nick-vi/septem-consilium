import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../../app/services/auth'
import {
  ModalContainer,
  ModalForm,
  ModalHeader,
  ModalButton,
  ModalTypography,
  ModalTextField,
  ModalAlert
} from '../../../components/Modal'
import { useCloseModal } from '../../../components/Modal/Modal'
import { inputValidation } from '../../../Constants'
import { registrationSchema } from '../../../utils/validation'
import {
  showProfileModal,
  showSignInModal,
  showTermsModal
} from '../../modal/modalSlice'
import { setCredentials } from '../authSlice'

const { _name, _password } = inputValidation

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({ type: null, message: null })
  const dispatch = useDispatch()
  const closeModal = useCloseModal()

  const [registerUser, { isLoading, error }] = useRegisterMutation()

  useEffect(() => {
    setAlert({ type: null, message: null })
  }, [email, password, isLoading])

  useEffect(() => {
    setAlert({ type: 'error', message: error?.data })
  }, [error])

  const handleKeyDown = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') e.target.blur()
  }

  const handleSubmit = async () => {
    const formData = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined
    }

    try {
      await registrationSchema.validate(formData)

      const result = await registerUser(formData)

      if (result?.error) {
        setAlert({ type: 'error', message: result.error.data })
        return
      }

      const { name, email: resultEmail, token } = result.data
      const { sub: userId } = await jwtDecode(token)
      dispatch(setCredentials({ user: { name, email: resultEmail, userId }, token }))

      closeModal(() => {
        dispatch(showProfileModal())
      })
    } catch (err) {
      setAlert({ type: 'error', message: err.message })
    }
  }

  const handleLogIn = () => {
    closeModal(() => {
      dispatch(showSignInModal())
    })
  }

  const handleTerms = () => {
    closeModal(() => {
      dispatch(showTermsModal())
    })
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTypography heading>Hello, nice to meet you!</ModalTypography>
        <ModalButton
          onClick={handleLogIn}
          variant="outlined"
          small
          transparentBg
          value="Log in"
        />
      </ModalHeader>
      <ModalForm>
        <ModalTextField
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleName}
          onKeyDown={handleKeyDown}
          minLength={_name.min}
          maxLength={_name.max}
          required
        />
        <ModalTextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          onKeyDown={handleKeyDown}
          required
        />
        <ModalTextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          onKeyDown={handleKeyDown}
          minLength={_password.min}
          maxLength={_password.max}
          required
        />
        {alert?.message && (
          <ModalAlert variant={alert.type} text={alert.message} icon />
        )}
        <ModalTypography small>
          By proceeding, you agree to the{' '}
          <span onClick={handleTerms}>Terms</span> and{' '}
          <span onClick={handleTerms}>Conditions & Privacy</span> and{' '}
          <span onClick={handleTerms}>Cookies Policy</span>.
        </ModalTypography>
        <ModalButton
          type="submit"
          onClick={handleSubmit}
          isLoading={isLoading}
          variant="contained"
          value="Create account"
        />
      </ModalForm>
    </ModalContainer>
  )
}

export default SignUp
