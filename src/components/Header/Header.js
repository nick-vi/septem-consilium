import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import styles from './Header.module.scss'
const cx = classNames.bind(styles)

const Header = ({ children }) => {
  const { currentMonth, currentYear, distanceFromThisWeek } = useSelector(
    (state) => state.date
  )

  return (
    <div className={styles.header}>
      <div
        className={cx({
          header__heading: true,
          'header__heading__outside-week': distanceFromThisWeek !== 0
        })}
      >
        {`${currentMonth} ${currentYear}`}
      </div>
      {/* Toolbar goes here */}
      {children}
    </div>
  )
}

export default Header
