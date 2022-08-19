import { format, getDay, isToday, parseISO } from 'date-fns'
import { DAYS } from '../../utils/date'
import styles from './ColumnHeader.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ColumnHeader = ({ date }) => {
  const parsedDate = parseISO(date)
  const dateInstance = new Date(parsedDate)
  const formattedDate = format(dateInstance, 'dd.MM')
  const dayString = DAYS[getDay(dateInstance)]

  return (
    <div
      className={cx({
        'column-header': true,
        'column-header__today': isToday(dateInstance)
      })}
    >
      <span className={styles['column-header__date']}>{formattedDate}</span>
      <span className={styles['column-header__day']}>{dayString}</span>
    </div>
  )
}

export default ColumnHeader
