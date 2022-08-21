import styles from './ModalOverlay.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const ModalOverlay = ({ onDismount, ...props }) => (
  <div
    className={cx({
      modal__overlay: true,
      'modal__overlay--dismount': onDismount
    })}
    {...props}
  />
)

export default ModalOverlay
