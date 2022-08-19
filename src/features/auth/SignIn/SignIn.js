import { useEffect, useRef, useState } from 'react'
import { GoogleIcon, SmileIcon } from '../../../assets/icons'
import { inputValidation } from '../../../Constants'
import { useDispatch } from 'react-redux'
import { useCloseModal } from '../../../components/Modal/Modal'
import { showProfileModal, showSignUpModal } from '../../modal/modalSlice'
import { useLoginMutation } from '../../../app/services/auth'
import { setCredentials } from '../authSlice'
import {
  ModalContainer,
  ModalForm,
  ModalHeader,
  ModalButton,
  ModalTypography,
  ModalTextField,
  ModalAlert
} from '../../../components/Modal'
import { forgotPasswordSchema, logInSchema } from '../../../utils/validation'
import jwtDecode from 'jwt-decode'

const DEMO_EMAIL = 'example@email.com'
const DEMO_PW = 'Rand0m-password'

const DEFAULT_EMAIL = ''
const DEFAULT_PW = ''

const { _email, _password } = inputValidation

const SignIn = () => {
  const [email, setEmail] = useState(DEFAULT_EMAIL)
  const [password, setPassword] = useState(DEFAULT_PW)
  const [alert, setAlert] = useState({ type: null, message: null })
  const dispatch = useDispatch()
  const closeModal = useCloseModal()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [loginRequest, { isLoading, error }] = useLoginMutation()
  const [demoLogin, { isLoading: isDemoLoading }] = useLoginMutation()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setAlert({ type: null, message: null })
  }, [email, password, isLoading])

  useEffect(() => {
    setAlert({ type: 'error', text: error?.data })
  }, [error])

  const handleKeyDown = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') e.target.blur()
  }

  const handleDemo = async () => {
    const result = await demoLogin({ email: DEMO_EMAIL, password: DEMO_PW })

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
  }

  const handleSubmit = async () => {
    try {
      await logInSchema.validate({
        email: email || undefined,
        password: password || undefined
      })

      const result = await loginRequest({ email, password })

      if (result?.error) {
        setAlert({ type: 'error', message: result.error.data })
        return
      }

      const { name, email: resultEmail, token } = result.data
      const { sub: userId } = await jwtDecode(token)
      dispatch(setCredentials({ user: { name, email: resultEmail, userId }, token }))
      showProfile()
    } catch (err) {
      setAlert({ type: 'error', message: err.message })
    }
  }

  const handleForgotPassword = async () => {
    try {
      await forgotPasswordSchema.validate({
        email: email || undefined
      })
      setAlert({
        type: 'info',
        message: `A temporary password was sent to ${email}.`
      })
    } catch (err) {
      setAlert({ type: 'error', message: err.message })
    }
  }

  const handleSignUp = () => {
    closeModal(() => {
      dispatch(showSignUpModal())
    })
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const showProfile = () => closeModal(() => dispatch(showProfileModal()))

  const showSignIn = () => (
    <ModalContainer>
      <ModalHeader>
        <ModalTypography heading>Hello, welcome back!</ModalTypography>
        <ModalButton
          onClick={handleSignUp}
          variant="outlined"
          small
          transparentBg
          value="Sign Up"
        />
      </ModalHeader>
      <ModalForm>
        <ModalTextField
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          onKeyDown={handleKeyDown}
          minLength={_email.min}
          maxLength={_email.max}
          autoComplete="false"
          required
        />
        <ModalTextField
          ref={passwordRef}
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
        <ModalTypography small right onClick={handleForgotPassword}>
          <span>Forgot password?</span>
        </ModalTypography>
        <ModalButton
          type="submit"
          onClick={handleSubmit}
          isLoading={isLoading}
          variant="contained"
          value="Let me in"
        />
        <ModalButton
          variant="outlined"
          value="Sign in with Google"
          icon={<GoogleIcon />}
        />
        <ModalButton
          variant="outlined"
          onClick={handleDemo}
          isLoading={isDemoLoading}
          icon={<SmileIcon />}
          value="Sign in with Guest"
        />
      </ModalForm>
    </ModalContainer>
  )

  return (
    showSignIn()
  )
}

export default SignIn
