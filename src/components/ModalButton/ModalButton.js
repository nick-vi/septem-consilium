import styles from './ModalButton.module.scss'
import { SpinnerIcon } from '../../assets/icons/SpinnerIcon'
import classNames from 'classnames/bind'
import { forwardRef } from 'react'

const cx = classNames.bind(styles)

const ModalTextField = (
  {
    variant,
    icon,
    onClick: _onClick,
    isLoading,
    value,
    transparentBg,
    small,
    error,
    ...props
  },
  ref
) => {
  const handleOnClick = (e) => {
    e.preventDefault()
    typeof _onClick === 'function' && _onClick()
  }

  return (
    <button
      className={cx({
        button: true,
        'button--contained': variant === 'contained',
        'button--outlined': variant === 'outlined',
        'button--transparent': transparentBg,
        'button--small': small,
        'button--icon': icon,
        'button--error': error
      })}
      onClick={handleOnClick}
      ref={ref}
      {...props}
    >
      {icon && !isLoading ? icon : ''}
      {!isLoading ? value : <SpinnerIcon />}
    </button>
  )
}

export default forwardRef(ModalTextField)
