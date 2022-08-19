import React, { forwardRef, useId } from 'react'
import styles from './ModalTextField.module.scss'

const ModalTextField = ({ label, ...props }, ref) => {
  const id = useId()

  const renderLabel = () => {
    if (!label) return
    return (
      <label htmlFor={id} className={styles['text-field__label']}>
        {label}
      </label>
    )
  }

  return (
    <div className={styles['text-field']}>
      {renderLabel()}
      <input
        ref={ref}
        {...props}
        id={label ? id : null}
        className={styles['text-field__input']}
      />
    </div>
  )
}

export default forwardRef(ModalTextField)
