import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { endpointUrl } from '../../Constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
    baseUrl: endpointUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth',
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation({
      query: () => 'Logout'
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: credentials
      })
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const { id, ...body } = data
        return {
          url: 'users/' + id,
          method: 'PUT',
          body
        }
      }
    }),
    deleteUser: builder.mutation({
      query: (data) => {
        const { id, password } = data
        return {
          url: 'users/' + id,
          method: 'DELETE',
          body: { password }
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = authApi
