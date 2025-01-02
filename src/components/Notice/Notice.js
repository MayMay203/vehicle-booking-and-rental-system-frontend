import classNames from "classnames/bind"
import styles from './Notice.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faClockRotateLeft, faWarning } from "@fortawesome/free-solid-svg-icons"
const cx = classNames.bind(styles)
function Notice({ type, title, subtitle, content }) {
  return (
    <div className={cx('notice-container')}>
      {type === 'success' && <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-check')}></FontAwesomeIcon>}
      {type === 'wait' && <FontAwesomeIcon icon={faClockRotateLeft} className={cx('icon-check')}></FontAwesomeIcon>}
      {type === 'cancel' && <FontAwesomeIcon icon={faWarning} className={cx('icon-check-warn')}></FontAwesomeIcon>}
      <p className={cx({ subtitle: type !== 'cancel' }, { 'subtitle-cancle': type === 'cancel' })}>{subtitle}</p>
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