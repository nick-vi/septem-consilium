import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { ItemTypes } from '../../Constants'
import { getTodosWithArray, updateTodo } from '../../features/todos/todosSlice'
import styles from './ColumnContent.module.scss'
import ColumnCell from '../ColumnCell'
import ColumnTextField from '../ColumnTextField'
import { useUpdateTodoMutation } from '../../app/services/todos'
import { selectDistanceFromThisWeek } from '../../features/date/dateSlice'
import { selectCurrentUser } from '../../features/auth/authSlice'

const ColumnContent = ({
  todoIds,
  columnIndex,
  columnDate,
  columnDateIndex
}) => {
  const distanceFromThisWeek = useSelector(selectDistanceFromThisWeek)
  const inputRef = useRef()
  const user = useSelector(selectCurrentUser)
  const todos = useSelector(getTodosWithArray(todoIds))

  const dispatch = useDispatch()
  const [updateTodoServer] = useUpdateTodoMutation()

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TODO,
      drop: async ({ todoId }) => {
        const payload = { todoId }

        if (columnDate === undefined) {
          payload.dueDate = undefined
          payload.column = columnIndex
        } else {
          payload.dueDate = columnDate
          payload.column = undefined
        }

        if (user) {
          payload.userId = user.userId
          updateTodoServer(payload)
        }

        payload.updatedAt = new Date().toISOString()

        return dispatch(updateTodo(payload))
      }
    }),
    [distanceFromThisWeek, user]
  )

  const column = {
    columnDateIndex,
    columnIndex
  }

  const inputFocus = () => inputRef.current.focus()

  const renderTodos = () =>
    Object.values(todos)
      .sort((a, b) => {
        return (a.updatedAt < b.updatedAt) ? -1 : ((a.updatedAt > b.date) ? 1 : 0)
      })
      .map((todo) => {
        return <ColumnCell key={todo.id} todoId={todo.id} />
      })

  return (
    <div className={styles['column-content']} onClick={inputFocus} ref={drop}>
      {renderTodos()}
      <ColumnTextField inputRef={inputRef} column={column} />
    </div>
  )
}

export default ColumnContent
