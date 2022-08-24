import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateTodoMutation } from '../../app/services/todos'
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice'
import { closeEditTodoModal } from '../../features/modal/modalSlice'
import { getTodoById } from '../../features/todos/todosSlice'
import Modal from '../Modal'
import EditTodo from './EditTodo'

export const EditTodoModal = () => {
  const { open, todoId } = useSelector(
    (state) => state.modal.showEditTodoModal
  )
  const { text, dueDate, bgColor, isComplete } =
    useSelector(getTodoById(todoId)) || {}
  const [hasChanged, setHasChanged] = useState(false)
  const user = useSelector(selectCurrentUser)
  const [updateTodoServer] = useUpdateTodoMutation()

  const dispatch = useDispatch()

  const handleClose = async () => {
    dispatch(closeEditTodoModal())
  }

  const onCloseSideEffect = async () => {
    if (user && hasChanged) await updateTodoServer({ userId: user.userId, todoId, text, dueDate, bgColor, isComplete })
  }

  return (
    <Modal
      onClose={handleClose}
      onCloseSideEffect={onCloseSideEffect}
      open={open}
    >
      <EditTodo
        todoId={todoId}
        text={text}
        dueDate={dueDate}
        bgColor={bgColor}
        isComplete={isComplete}
        setHasChanged={setHasChanged}
      />
    </Modal>
  )
}
