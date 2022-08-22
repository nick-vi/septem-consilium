import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = { ...user }
      state.token = token
      localStorage.setItem('token', token)
    },
    editUser: (state, action) => {
      const { name, email } = action.payload
      if (name) state.user.name = name
      if (email) state.user.email = email
    },
    logOut: (state) => {
      state.user = null
      state.token = null
      localStorage.clear()
    }
  }
})

export const { setCredentials, editUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentUserId = (state) => state.auth.user.userId
export const selectCurrentToken = (state) => state.auth.token
