import { DraftsColumns, WeekColumns } from './components/Column'
import DraftsHeading from './components/DraftsHeading'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import WeekView from './components/WeekView'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RenderModal } from './components/Modal'
import { selectCurrentUser, setCredentials } from './features/auth/authSlice'
import { useEffect, useState } from 'react'
import { useCreateInitialTodosMutation, useLazyGetTodosQuery } from './app/services/todos'
import { selectDistanceFromThisWeek } from './features/date/dateSlice'
import { updateTodos, loadState, selectTodos } from './features/todos/todosSlice'
import useNavigation from './hooks/useNavigation'
import pick from 'just-pick'
import compare from 'just-compare'
import { normalizeData } from './utils/data'
import ModalOverlay from './components/ModalOverlay'
import NoConnection from './components/NoConnection'
import jwtDecode from 'jwt-decode'
import { useLazyGetUserByTokenQuery } from './app/services/auth'

const verifyLocalStorageToken = async (token, getUserByToken, dispatch) => {
  const { sub: userId } = jwtDecode(token)
  try {
    return await getUserByToken({ id: userId, token })
      .unwrap()
      .then(async (data) => dispatch(setCredentials({ user: data, token })))
  } catch (err) {
    console.error(err)
  }
}

const tokenFromLocalStorage = localStorage.getItem('token')

function App () {
  const { modal } = useSelector((state) => state)
  const user = useSelector(selectCurrentUser)
  const distanceFromThisWeek = useSelector(selectDistanceFromThisWeek)
  const todos = useSelector(selectTodos)
  const [hasInternet, setHasInternet] = useState(navigator.onLine)
  const [reconnected, setReconnected] = useState(navigator.onLine)
  const dispatch = useDispatch()
  const { resetWeek } = useNavigation()

  const [getTodos] = useLazyGetTodosQuery()
  const [getUserByToken] = useLazyGetUserByTokenQuery()
  const [createInitialTodos] = useCreateInitialTodosMutation()

  useEffect(() => {
    if (tokenFromLocalStorage && typeof tokenFromLocalStorage !== 'undefined') {
      verifyLocalStorageToken(
        tokenFromLocalStorage,
        getUserByToken,
        dispatch
      )
    }
  }, [])

  useEffect(() => {
    window.addEventListener('offline', () => {
      setHasInternet(false)
      setReconnected(false)
    })
    window.addEventListener('online', () => {
      setTimeout(() => setHasInternet(true), 200)
      setReconnected(true)
    })
  }, [])

  useEffect(() => {
    if (!user) return
    const getUserTodos = async () => await getTodos({
      userId: user?.userId,
      distanceFromThisWeek,
      init: true
    }).unwrap().then(async data => {
      const todosArray = Object.keys(data)
      if (!todosArray.length) {
        const localTodosArray = Object.values(todos)
        const initialTodos = normalizeData(await createInitialTodos(localTodosArray).unwrap())
        return dispatch(loadState(initialTodos))
      }
      dispatch(loadState(data))
    })
    getUserTodos()
    resetWeek()
  }, [user])

  useEffect(() => {
    if (!user) return
    const getUserTodos = async () => await getTodos({
      userId: user?.userId,
      distanceFromThisWeek
    }).unwrap().then(data => {
      const existingTodos = pick(todos, Object.keys(data))
      // Avoid unnecessary store updates
      if (compare(data, existingTodos)) return
      return dispatch(updateTodos(data))
    })
    getUserTodos()
  }, [distanceFromThisWeek])

  const renderApp = () => (
    <div className="App">
      <WeekView>
        <Header>
          <Toolbar />
        </Header>
        <WeekColumns />
        <DraftsHeading title="Drafts" />
        <DraftsColumns />
      </WeekView>
      <RenderModal modal={modal} />
      {!hasInternet &&
        <>
          <ModalOverlay onDismount={reconnected} />
          <NoConnection />
        </>
      }
    </div>
  )

  return renderApp()
}

export default App
