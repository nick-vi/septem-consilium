import { useDispatch } from 'react-redux'
import { nextWeek, previousWeek, resetWeek } from '../features/date/dateSlice'

const useNavigation = () => {
  const dispatch = useDispatch()
  const _resetWeek = () => dispatch(resetWeek())
  const _nextWeek = () => dispatch(nextWeek())
  const _previousWeek = () => dispatch(previousWeek())

  return {
    resetWeek: _resetWeek,
    nextWeek: _nextWeek,
    previousWeek: _previousWeek
  }
}

export default useNavigation
