import { configureStore } from '@reduxjs/toolkit'
import dateReducer from '../features/date/dateSlice'
import todosReducer from '../features/todos/todosSlice'
import modalReducer from '../features/modal/modalSlice'
import authReducer from '../features/auth/authSlice'
import { todosApi } from './services/todos'
import { authApi } from './services/auth'
// import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    date: dateReducer,
    modal: modalReducer,
    auth: authReducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todosApi.middleware)
      .concat(authApi.middleware),
  devTools: true
})

// setupListeners(store.dispatch)
