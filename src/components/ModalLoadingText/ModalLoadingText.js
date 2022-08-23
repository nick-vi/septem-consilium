import React from 'react'
import styles from './ModalLoadingText.module.scss'

const ModalLoadingText = ({ text }) => {
  return (
    <div className={styles['no-connection']}>
      <i className={styles['no-connection__spinner']}></i>
      <span className={styles['no-connection__heading']}>{text}</span>
    </div>
  )
}

export default ModalLoadingText
