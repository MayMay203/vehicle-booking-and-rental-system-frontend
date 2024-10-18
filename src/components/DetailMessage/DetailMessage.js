import styles from './DetailMessage.module.scss'
import classNames from 'classnames/bind'
import { images } from '../../assets/images'
const cx = classNames.bind(styles)
function DetailMessage({ isSender, message, time }) {
  return (
    <div className={cx('wrap', { 'wrap-receive': !isSender }, { 'wrap-send': isSender })}>
      {!isSender && (
        <div className={cx('wrap-avatar')}>
          <img alt="avatar" className={cx('avatar')} src={images.avatar}></img>
        </div>
      )}
      <div className={cx({ 'wrap-content-end': isSender })}>
        <p className={cx({ 'content-receive': !isSender }, { 'content-send': isSender }, 'content-message')}>
          {message}
        </p>
        <p className={cx('time', { 'align-right': isSender })}>{time}</p>
      </div>
      {isSender && (
        <div className={cx('wrap-avatar')}>
          <img alt="avatar" className={cx('avatar')} src={images.avatar}></img>
        </div>
      )}
    </div>
  )
}
export default DetailMessage
