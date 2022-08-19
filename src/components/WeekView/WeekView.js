import styles from './WeekView.module.scss'

const weekViewStyles = styles['weekly-planner__container']

const WeekView = ({ children }) => {
  return (
    <div className={weekViewStyles}>
      {children}
    </div>
  )
}

export default WeekView
