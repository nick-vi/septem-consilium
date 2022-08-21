import React from 'react'
import styles from './NoConnection.module.scss'

const NoConnection = () => {
  return (
    <div className={styles['no-connection']}>
      <i className={styles['no-connection__spinner']}></i>
      <span className={styles['no-connection__heading']}>No Connection</span>
    </div>
  )
}

export default NoConnection
