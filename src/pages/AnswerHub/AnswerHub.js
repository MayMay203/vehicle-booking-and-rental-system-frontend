import styles from './AnswerHub.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function AnswerHub() {
  return <div className={cx('wrapper')}>AnswerHub page</div>
}

export default AnswerHub
