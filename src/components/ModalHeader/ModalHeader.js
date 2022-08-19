import styles from './ModalHeader.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ModalHeader = ({ children, ...props }) => {
  return (
    <div
      className={cx({
        header: true
      })}
      {...props}
    >
      {children}
    </div>
  )
}

export default ModalHeader
