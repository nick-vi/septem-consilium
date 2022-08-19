import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDistanceFromThisWeek
} from '../../features/date/dateSlice'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  UserIcon
} from '../../assets/icons'
import styles from './Toolbar.module.scss'
import classNames from 'classnames/bind'
import { showProfileModal, showSignInModal } from '../../features/modal/modalSlice'
import { selectCurrentUser } from '../../features/auth/authSlice'
import useNavigation from '../../hooks/useNavigation'

const cx = classNames.bind(styles)

const Toolbar = () => {
  const user = useSelector(selectCurrentUser)
  const distanceFromThisWeek = useSelector(selectDistanceFromThisWeek)
  const [darkmodeBtn, setDarkmodeBtn] = useState(false)
  const { resetWeek, nextWeek, previousWeek } = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [distanceFromThisWeek])

  const handleProfile = () => {
    user ? dispatch(showProfileModal()) : dispatch(showSignInModal())
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__profile} onClick={handleProfile}>
        <UserIcon />
      </div>
      <div
        className={cx({
          toolbar__disabled: !distanceFromThisWeek,
          toolbar__return: true
        })}
        onClick={resetWeek}
      >
        <HomeIcon />
      </div>
      <div
        className={styles.toolbar__arrow}
        onClick={previousWeek}
      >
        <ChevronLeftIcon />
      </div>
      <div
        className={styles.toolbar__arrow}
        onClick={nextWeek}
      >
        <ChevronRightIcon />
      </div>
    </div>
  )
}

export default Toolbar
