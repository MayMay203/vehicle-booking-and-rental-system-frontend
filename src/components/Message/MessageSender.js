import styles from './Message.module.scss'
import classNames from 'classnames/bind'
import {images} from '../../assets/images'
const cx = classNames.bind(styles)
function MessageSender() {
  return (
    <div className={cx('wrap', 'wrap-send')}>
      <div className={cx('')}>
        <p className={cx('content-send', 'content-message')}>
          Đây để nội dung .. Chào bạn nhá.. Bạn khỏe ko? Lâu rồi ko gặp bạn hì...Bạn đang làm{' '}
        </p>
        <p className={cx('time', 'text-end')}>12h00, 12/08/2024</p>
      </div>
      <div className={cx('wrap-avatar')}>
        <img alt="avatar" className={cx('avatar')} src={images.avatar}></img>
      </div>
    </div>
  )
}
export default MessageSender
