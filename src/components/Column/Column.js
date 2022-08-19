import styles from './Column.module.scss'
import classNames from 'classnames/bind'
import { weekColumnsClassNames, draftsColumnsClassNames } from '../../Constants'
import ColumnHeader from '../ColumnHeader'
import ColumnContent from '../ColumnContent'
import { isSameDay } from 'date-fns'
import { useSelector } from 'react-redux'
import { getWeekTodos, selectColumnTodos } from '../../features/todos/todosSlice'
import { selectCurrentWeekDates } from '../../features/date/dateSlice'

const cx = classNames.bind(styles)

const filterTodosByDate = (dueDateTodos, date) =>
  Object.values(dueDateTodos)
    .filter(todo => isSameDay(new Date(todo.dueDate), new Date(date)))
    .map(todo => todo.id)

export const renderDraftsColumns = (todos) =>
  [...Array(3).keys()].map((column) => {
    const todoIds = Object.values(todos)
      .filter((todo) => todo.column === column)
      .map((todo) => todo.id)

    return (
      <Column key={column} className={draftsColumnsClassNames[column]}>
        <ColumnContent
          todoIds={todoIds}
          columnIndex={column}
        />
      </Column>
    )
  })

const renderWeekColumns = (todos, dates) =>
  dates.map((date, index) => {
    const todoIds = filterTodosByDate(todos, date)
    return (
      <Column key={index} className={weekColumnsClassNames[index]}>
        <ColumnHeader day={index} date={date} />
        <ColumnContent
          todoIds={todoIds}
          columnDate={dates[index]}
          columnDateIndex={index}
        />
      </Column>
    )
  })

const Column = ({ children, className }) => {
  const classNameStyles = {}
  classNameStyles[className] = true

  return (
    <div
      className={cx({
        column: true,
        ...classNameStyles
      })}
    >
      {children}
    </div>
  )
}

export const WeekColumns = () => {
  const todos = useSelector(getWeekTodos)
  const dates = useSelector(selectCurrentWeekDates)

  return (
    renderWeekColumns(todos, dates)
  )
}

export const DraftsColumns = () => {
  const todos = useSelector(selectColumnTodos)

  return (
    renderDraftsColumns(todos)
  )
}

export default Column
