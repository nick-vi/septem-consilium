import { updateTodo } from '../../features/todos/todosSlice'
import { CheckIcon } from '../../assets/icons/CheckIcon'
import { useDispatch, useSelector } from 'react-redux'
import { showEditTodoModal } from '../../features/modal/modalSlice'
import styles from './ColumnCell.module.scss'
import classNames from 'classnames/bind'
import { useUpdateTodoMutation } from '../../app/services/todos'
import { selectCurrentUser } from '../../features/auth/authSlice'

const cx = classNames.bind(styles)

const ColumnCell = ({ todoId }) => {
  const { text, isComplete, bgColor } = useSelector(
    (state) => state.todos[todoId]
  )
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [updateTodoServer] = useUpdateTodoMutation()

  const handleOpen = (e) => {
    e.stopPropagation()
    dispatch(showEditTodoModal({ todoId }))
  }

  const handleToggle = async (e) => {
    e.stopPropagation()
    const payload = { todoId, isComplete: !isComplete }
    if (user) {
      payload.userId = user.userId
      const { data } = await updateTodoServer(payload)
      payload.updatedAt = data.updatedAt
    }
    dispatch(updateTodo(payload))
  }

  const colors = [...Array(5).keys()]
  const classNameStyles = {}
  colors.map(
    (color) =>
      (classNameStyles[`cell__highlight--color-${color + 1}`] =
        bgColor === color + 1)
  )

  return (
    <div
      className={cx({
        cell: true
      })}
      onClick={handleOpen}
    >
      <div
        className={cx({
          cell__text: true,
          cell__text__complete: isComplete,
          cell__highlight: bgColor > 0,
          ...classNameStyles
        })}
      >
        {text}
      </div>
      <div className={styles.cell__toggle} onClick={handleToggle}>
        <CheckIcon />
      </div>
    </div>
  )
}

export default ColumnCell
