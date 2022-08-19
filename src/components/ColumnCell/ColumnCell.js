import { useRef } from 'react'
import { updateTodo } from '../../features/todos/todosSlice'
import { CheckIcon } from '../../assets/icons/CheckIcon'
import { useDispatch, useSelector } from 'react-redux'
import { showEditTodoModal } from '../../features/modal/modalSlice'
import { ItemTypes } from '../../Constants'
import { useDrag, useDrop } from 'react-dnd'
import styles from './ColumnCell.module.scss'
import classNames from 'classnames/bind'
import { useUpdateTodoMutation } from '../../app/services/todos'
import { selectCurrentUser } from '../../features/auth/authSlice'

const cx = classNames.bind(styles)

const ColumnCell = ({ todoId }) => {
  const { text, isComplete, bgColor, index } = useSelector(
    (state) => state.todos[todoId]
  )
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [updateTodoServer] = useUpdateTodoMutation()

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (item, monitor) => {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoveredRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
      const mousePosition = monitor.getClientOffset()
      const hoverClientY = mousePosition.y - hoveredRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) return

      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { todoId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

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

  drag(drop(ref))

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
        // 'cell--dragging': isDragging
      })}
      onClick={handleOpen}
    >
      <div
        ref={ref}
        className={cx({
          cell__text: true,
          cell__text__complete: isComplete,
          cell__highlight: bgColor > 0,
          // 'cell--dragging': isDragging,
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
