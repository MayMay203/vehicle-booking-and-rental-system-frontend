import classNames from "classnames/bind"
import styles from './Notice.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
const cx = classNames.bind(styles)
function Notice({ type, title, subtitle, content }) {
  return (
    <div className={cx('notice-container')}>
      {type === 'success' && <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-check')}></FontAwesomeIcon>}
      {type === 'wait' && <FontAwesomeIcon icon={faClockRotateLeft} className={cx('icon-check')}></FontAwesomeIcon>}
      <p className={cx('subtitle')}>{subtitle}</p>
      <p className={cx('content')}>
        {content.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <p className={cx('sign')}>--- Safety Travel ---</p>
    </div>
  )
}
export default Notice