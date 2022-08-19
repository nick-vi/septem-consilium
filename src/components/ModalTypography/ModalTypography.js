import styles from './ModalTypography.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ModalTypography = ({
  children,
  left,
  right,
  small,
  heading,
  ...props
}) => {
  return (
    <div
      className={cx({
        typography: true,
        heading,
        small,
        right,
        left
      })}
      {...props}
    >
      {children}
    </div>
  )
}

export default ModalTypography
