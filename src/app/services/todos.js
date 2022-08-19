import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { endpointUrl } from '../../Constants'
import { normalizeData } from '../../utils/data'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Todos'],
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
    getTodos: builder.query({
      query: (params) => ({
        url: 'todos/',
        params
      }),
      transformResponse: (response) => normalizeData(response)
    }),
    getTodosByRange: builder.query({
      query: (from, to) => ({
        url: `todos&from=${from}&to=${to}`
      })
    }),
    createInitialTodos: builder.mutation({
      query: (body) => ({
        url: 'todos/multiple',
        method: 'POST',
        body
      })
    }),
    createTodo: builder.mutation({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body
      })
    }),
    updateTodo: builder.mutation({
      query: ({ todoId, ...body }) => ({
        url: 'todos/' + todoId,
        method: 'PUT',
        body
      })
    }),
    deleteTodo: builder.mutation({
      query: ({ todoId }) => ({
        url: 'todos/' + todoId,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetTodosQuery,
  useGetTodosByRangeQuery,
  useCreateInitialTodosMutation,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useLazyGetTodosQuery
} = todosApi
