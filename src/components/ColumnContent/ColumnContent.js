import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { ItemTypes } from '../../Constants'
import { updateTodo } from '../../features/todos/todosSlice'
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

  const dispatch = useDispatch()
  const [updateTodoServer] = useUpdateTodoMutation()

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TODO,
      drop: async ({ todoId }) => {
        if (columnDate === undefined) {
          const payload = { todoId, column: columnIndex, dueDate: undefined }
          if (user) {
            payload.userId = user.userId
            const { data } = await updateTodoServer(payload)
            payload.updatedAt = data.updatedAt
          }

          return dispatch(updateTodo(payload))
        }
        const payload = { todoId, dueDate: columnDate, column: undefined }
        if (user) {
          payload.userId = user.userId
          const { data } = await updateTodoServer(payload)
          payload.updatedAt = data.updatedAt
        }
        return dispatch(updateTodo(payload))
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [distanceFromThisWeek, user]
  )

  const column = {
    columnDateIndex,
    columnIndex
  }

  const inputFocus = () => inputRef.current.focus()

  const renderTodos = () =>
    todoIds
      .sort(
        (objA, objB) =>
          Number(new Date(objB.updatedAt)) - Number(new Date(objA.updatedAt))
      )
      .map((todoId) => {
        return <ColumnCell key={todoId} todoId={todoId} />
      })

  return (
    <div className={styles['column-content']} onClick={inputFocus} ref={drop}>
      {renderTodos()}
      <ColumnTextField inputRef={inputRef} column={column} />
    </div>
  )
}

export default ColumnContent
