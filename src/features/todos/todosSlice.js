import { createSlice } from '@reduxjs/toolkit'
import { addDays, startOfWeek } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { normalizeData } from '../../utils/data'

const templateState = [
  {
    id: uuidv4(),
    text: 'Hover to complete',
    dueDate: startOfWeek(new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 0,
    isComplete: false,
    bgColor: 0
  },
  {
    id: uuidv4(),
    text: 'Click to edit',
    dueDate: startOfWeek(new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 0,
    isComplete: false,
    bgColor: 0
  },
  {
    id: uuidv4(),
    text: 'Drag and drop coming soon',
    dueDate: startOfWeek(new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 0,
    isComplete: false,
    bgColor: 0
  },
  {
    id: uuidv4(),
    text: 'Choose from colors',
    dueDate: addDays(startOfWeek(new Date()), 1).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 0,
    isComplete: false,
    bgColor: 1
  },
  {
    id: uuidv4(),
    text: 'Hope you like 😉',
    dueDate: addDays(startOfWeek(new Date()), 1).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 0,
    isComplete: false,
    bgColor: 0
  },
  {
    id: uuidv4(),
    text: "That's it",
    dueDate: addDays(startOfWeek(new Date()), 2).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 0,
    isComplete: false,
    bgColor: 5
  },
  {
    id: uuidv4(),
    text: 'Remember to save 👆🏾',
    dueDate: addDays(startOfWeek(new Date()), 5).toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    index: 1,
    isComplete: false,
    bgColor: 0
  },
  {
    id: uuidv4(),
    text: 'Not sure what day',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    column: 1,
    index: 0,
    isComplete: false,
    bgColor: 0
  }
]

const initialState = normalizeData(templateState)

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadState: (state, action) => action.payload,
    loadInitialState: (state, action) => initialState,
    updateTodos: (state, action) => ({ ...state, ...action.payload }),
    createTodo: (state, action) => {
      const todo = action.payload
      state[todo.id] = todo
    },
    deleteTodo: (state, action) => {
      const { todoId } = action.payload
      delete state[todoId]
    },
    updateTodo: (state, action) => {
      const { todoId, ...props } = action.payload
      if (props.dueDate) delete state[todoId].column
      if (props.column) delete state[todoId].dueDate
      state[todoId] = { ...state[todoId], ...props }
    }
  }
})

export const getTodoById = (todoId) => (state) => state.todos[todoId]
export const getWeekTodos = (state) => Object.values(state.todos).filter(todo => todo.dueDate)
export const selectColumnTodos = (state) => Object.values(state.todos).filter(todo => todo.column !== undefined)
export const selectTodos = (state) => state.todos

export const { createTodo, updateTodo, deleteTodo, loadState, updateTodos, loadInitialState } =
  todosSlice.actions

export default todosSlice.reducer
