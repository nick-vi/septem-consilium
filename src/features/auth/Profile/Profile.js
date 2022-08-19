import jwt_decode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { deleteSchema, profileSchema } from '../../../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import { useCloseModal } from '../../../components/Modal/Modal'
import { inputValidation } from '../../../Constants'
import {
  editUser,
  logOut,
  selectCurrentToken,
  selectCurrentUser
} from '../authSlice'
import { showSignInModal } from '../../modal/modalSlice'
import { resetWeek } from '../../date/dateSlice'
import {
  ModalContainer,
  ModalForm,
  ModalHeader,
  ModalButton,
  ModalTypography,
  ModalTextField,
  ModalAlert
} from '../../../components/Modal'
import {
  useDeleteUserMutation,
  useUpdateUserMutation
} from '../../../app/services/auth'
import { loadInitialState } from '../../todos/todosSlice'
import useNavigation from '../../../hooks/useNavigation'

const Profile = () => {
  const { name, email } = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()
  const closeModal = useCloseModal()
  const { resetWeek } = useNavigation()

  const [alert, setAlert] = useState({ type: null, message: null })

  const [canEdit, setCanEdit] = useState(false)
  const [toDelete, setToDelete] = useState(false)

  const [updateUserServer, { isLoading: isLoadingUpdate, error: errorUpdate }] =
    useUpdateUserMutation()
  const [deleteUserServer, { isLoading: isLoadingDelete, error: errorDelete }] =
    useDeleteUserMutation()

  const [nameInput, setNameInput] = useState(name)
  const [emailInput, setEmailInput] = useState(email)
  const [passwordInput, setPasswordInput] = useState('')

  const passwordRef = useRef()

  useEffect(() => {
    setAlert({ type: 'error', message: errorUpdate || errorDelete })
  }, [errorUpdate, errorDelete])

  useEffect(() => {
    nameInput !== name || emailInput !== email || passwordInput !== ''
      ? setCanEdit(true)
      : setCanEdit(false)
  }, [nameInput, emailInput, passwordInput])

  useEffect(() => {
    setAlert({})
  }, [nameInput, emailInput])

  useEffect(() => {
    if (toDelete) return
    setAlert({})
  }, [passwordInput, toDelete, setToDelete])

  const { _name, _email, _password } = inputValidation

  const handleDelete = async () => {
    passwordRef.current.focus()

    if (!toDelete) {
      const message =
        "Are you sure about this? You can't undo this.\nFill the password field and press delete to proceed."
      setAlert({ type: 'info', message })
      setToDelete(true)
      return
    }

    try {
      await deleteSchema.validate({ password: passwordInput })
      const decoded = jwt_decode(token)
      const result = await deleteUserServer({
        id: decoded.sub,
        password: passwordInput
      })
      if (result?.error) throw new Error(result.error.data)
      handleLogOut()
    } catch (err) {
      setAlert({ type: 'error', message: err.message })
    }
  }

  const handleSave = async () => {
    if (!canEdit) return

    const payload = {}
    if (nameInput !== name) payload.name = nameInput
    if (emailInput !== email) payload.email = emailInput
    if (passwordInput !== '') payload.password = passwordInput

    if (!Object.keys(payload).length) return

    try {
      await profileSchema.validate(payload)
      const decoded = jwt_decode(token)
      payload.id = decoded.sub
      const result = await updateUserServer(payload)
      if (result?.error) throw new Error(result.error.data)
      dispatch(editUser(payload))
      setPasswordInput('')
      setCanEdit(false)
    } catch (err) {
      setAlert({ type: 'error', message: err.message })
    }
  }

  const handleLogOut = () => {
    closeModal(() => {
      dispatch(showSignInModal())
      dispatch(logOut())
      resetWeek()
      dispatch(loadInitialState())
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (toDelete) {
        handleDelete()
      } else {
        handleSave()
      }
      e.target.blur()
    }
    if (e.key === 'Escape') {
      e.stopPropagation()
      if (toDelete) setToDelete(false)
      e.target.blur()
    }
  }

  const content = (
    <ModalContainer>
      <ModalHeader>
        <ModalTypography heading>Hello {name}.</ModalTypography>
        <ModalButton
          variant="outlined-transparent"
          value="Logout"
          onClick={handleLogOut}
          transparentBg
          small
        />
      </ModalHeader>
      <ModalForm>
        <ModalTextField
          label="name"
          type="text"
          defaultValue={name}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={handleKeyDown}
          minLength={_name.min}
          maxLength={_name.max}
          required
        />
        <ModalTextField
          label="email"
          type="email"
          defaultValue={email}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          minLength={_email.min}
          maxLength={_email.max}
          required
        />
        <ModalTextField
          label="password"
          type="password"
          placeholder="********"
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={passwordRef}
          minLength={_password.min}
          maxLength={_password.max}
          required
        />
        {alert?.message && (
          <ModalAlert variant={alert.type} text={alert.message} icon />
        )}
        <ModalTypography small>
          Your account will self destruct after 24 months of inactivity.
        </ModalTypography>
        <ModalButton
          type="submit"
          onClick={handleSave}
          isLoading={isLoadingUpdate}
          variant="outlined"
          value="Save changes"
          disabled={!canEdit}
        />
        <ModalButton
          onClick={handleDelete}
          isLoading={isLoadingDelete}
          variant="outlined"
          error={!!(toDelete && passwordInput.length > 0)}
          value="Delete account"
        />
      </ModalForm>
    </ModalContainer>
  )

  return token ? content : handleLogOut()
}

export default Profile
