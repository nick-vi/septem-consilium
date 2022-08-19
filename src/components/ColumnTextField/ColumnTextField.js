import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateTodoMutation } from '../../app/services/todos'
import { createTodo } from '../../features/todos/todosSlice'
import styles from './ColumnTextField.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { selectCurrentUser } from '../../features/auth/authSlice'

const ColumnTextField = ({ inputRef, column, ...props }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const { columnDateIndex, columnIndex } = column

  const [createTodoServer] = useCreateTodoMutation()

  const columnDate = useSelector((state) => state.date.dates[columnDateIndex])
  const user = useSelector(selectCurrentUser)

  const handleOnChange = (e) => {
    setText(e.target.value)
  }

  const createNewTodo = async () => {
    if (!text.trim().length) {
      setText('')
      return
    }

    const payload = {
      text,
      isComplete: false,
      colorHighlight: 0
    }

    columnDate
      ? payload.dueDate = columnDate
      : payload.column = columnIndex

    if (user) {
      payload.userId = user.userId
      const { data } = await createTodoServer(payload)
      payload.id = data.id
      payload.updatedAt = data.updatedAt
      payload.createAt = data.createAt
    } else {
      payload.id = uuidv4()
    }

    dispatch(createTodo(payload))
    setText('')
  }

  const HandleOnBlur = () => {
    createNewTodo()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createNewTodo()
    }
    if (e.key === 'Escape') e.target.blur()
  }

  return (
    <div className={styles['todo-input__wrapper']}>
      <input
        type="text"
        className={styles['todo-input']}
        value={text}
        ref={inputRef}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onBlur={HandleOnBlur}
        {...props}
      />
    </div>
  )
}

export default ColumnTextField
