import styles from './ModalForm.module.scss'

const ModalForm = ({ children }) => (
  <div className={styles.modal__form}>{children}</div>
)

export default ModalForm
