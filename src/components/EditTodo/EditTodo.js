import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, updateTodo } from '../../features/todos/todosSlice'
import { TrashIcon, CheckIcon } from '../../assets/icons'
import { useCloseModal } from '../Modal/Modal'
import DatePicker from '../DatePicker'
import styles from './EditTodo.module.scss'
import classNames from 'classnames/bind'
import { useDeleteTodoMutation } from '../../app/services/todos'
import { selectCurrentUser } from '../../features/auth/authSlice'

const cx = classNames.bind(styles)

const EditTodo = ({
  todoId,
  text,
  dueDate,
  bgColor,
  isComplete,
  setHasChanged
}) => {
  const [date, setDate] = useState(dueDate ? new Date(dueDate) : undefined)
  const [_text, _setText] = useState(text)
  const ref = useRef()
  const dispatch = useDispatch()
  const closeModal = useCloseModal()
  const user = useSelector(selectCurrentUser)

  const [deleteTodoServer] = useDeleteTodoMutation()

  useEffect(() => {
    ref.current.focus()
  })

  const handleErase = () => {
    closeModal(() => {
      if (user) deleteTodoServer({ todoId })
      dispatch(deleteTodo({ todoId }))
    })
  }

  const handleDueDate = (date) => {
    setDate(date)
    const payload = { todoId, dueDate: date.toISOString() }
    dispatch(updateTodo(payload))
    setHasChanged(true)
  }

  const handleColorChange = (e, color) => {
    e.stopPropagation()
    const payload = { todoId, bgColor: color }
    dispatch(updateTodo(payload))
    setHasChanged(true)
  }

  const handleTextChange = (e) => {
    const { value } = e.target
    _setText(value)
    if (value < 1) return
    const payload = { todoId, text: value }
    dispatch(updateTodo(payload))
    setHasChanged(true)
  }

  const handleToggle = () => {
    const payload = { todoId, isComplete: !isComplete }
    dispatch(updateTodo(payload))
    setHasChanged(true)
  }

  const HandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      closeModal()
    }
    if (e.key === 'Escape') e.target.blur()
  }

  const colors = [...Array(6).keys()]

  const renderColorOptions = () =>
    colors.map((color) => {
      const classNameStyles = {}
      classNameStyles[`edit-todo__colors--color-${color}`] = true

      return (
        <i
          key={color}
          className={cx({
            'edit-todo__colors': true,
            'edit-todo__colors--active': bgColor === color,
            ...classNameStyles
          })}
          onClick={(e) => handleColorChange(e, color)}
        />
      )
    })

  const renderDatePicker = () => {
    if (!dueDate) return
    return <DatePicker selected={date} onChange={handleDueDate} />
  }

  return (
    <div className={styles['edit-todo']}>
      <div className={styles['edit-todo__top']}>
        <div className={styles['edit-todo__date']}>{renderDatePicker()}</div>
        <div className={styles['edit-todo__options']}>
          <TrashIcon
            onClick={handleErase}
            className={styles['edit-todo__trash']}
          />
          {renderColorOptions()}
        </div>
      </div>
      <div className={styles['edit-todo__text-input__container']}>
        <div
          className={cx({
            'edit-todo__text-input__wrapper': true,
            'edit-todo__text-input__complete': isComplete
          })}
        >
          <input
            type="text"
            ref={ref}
            value={_text}
            onChange={handleTextChange}
            onKeyDown={HandleKeyDown}
            className={styles['edit-todo__text-input']}
          />
          <div
            className={styles['edit-todo__text-input--toggle']}
            onClick={handleToggle}
          >
            <CheckIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTodo
