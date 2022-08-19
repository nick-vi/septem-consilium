import styles from './ModalContainer.module.scss'

const ModalContainer = ({ children }) => (
  <div className={styles.modal__container}>{children}</div>
)

export default ModalContainer
