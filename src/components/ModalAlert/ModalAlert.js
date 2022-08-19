import styles from './ModalAlert.module.scss'
import { SmileIcon, SmileNoMouth, SmileSad } from '../../assets/icons'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ModalAlert = ({ variant, icon, onClick: _onClick, text, ...props }) => {
  const renderIcon = () => {
    if (variant === 'success') return <SmileIcon />
    if (variant === 'info') return <SmileNoMouth />
    if (variant === 'error') return <SmileSad />
  }

  return (
    <div
      className={cx({
        alert: true,
        'alert--icon': icon,
        'alert--success': variant === 'success',
        'alert--info': variant === 'info',
        'alert--error': variant === 'error'
      })}
      {...props}
    >
      {typeof icon === 'boolean' && renderIcon()}
      {text}
    </div>
  )
}

export default ModalAlert
