import React from 'react'
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <i className={styles.loading__spinner}></i>
    </div>
  )
}

export default Loading
