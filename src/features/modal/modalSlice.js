import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showEditTodoModal: { open: false, todoId: undefined },
  showSignUpModal: { open: false },
  showSignInModal: { open: false },
  showProfileModal: { open: false },
  showTermsModal: { open: false }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showEditTodoModal: (state, action) => {
      const { todoId } = action.payload
      state.showEditTodoModal.open = true
      state.showEditTodoModal.todoId = todoId
    },
    closeEditTodoModal: (state) => {
      state.showEditTodoModal.open = false
      state.showEditTodoModal.todoId = undefined
    },
    showSignUpModal: (state) => {
      state.showSignUpModal.open = true
    },
    closeSignUpModal: (state) => {
      state.showSignUpModal.open = false
    },
    showSignInModal: (state) => {
      state.showSignInModal.open = true
    },
    closeSignInModal: (state) => {
      state.showSignInModal.open = false
    },
    showProfileModal: (state) => {
      state.showProfileModal.open = true
    },
    closeProfileModal: (state) => {
      state.showProfileModal.open = false
    },
    showTermsModal: (state) => {
      state.showTermsModal.open = true
    },
    closeTermsModal: (state) => {
      state.showTermsModal.open = false
    }
  }
})

export const {
  showEditTodoModal,
  closeEditTodoModal,
  showSignUpModal,
  closeSignUpModal,
  showSignInModal,
  closeSignInModal,
  showProfileModal,
  closeProfileModal,
  showTermsModal,
  closeTermsModal
} = modalSlice.actions

export default modalSlice.reducer
