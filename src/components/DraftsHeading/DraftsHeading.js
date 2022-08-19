import styles from './DraftsHeading.module.scss'

const DraftsHeading = ({ title }) => (
  <div className={styles['drafts-heading']}>{title}</div>
)

export default DraftsHeading
