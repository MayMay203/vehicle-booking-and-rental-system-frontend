import classNames from "classnames/bind";
import styles from './Notification.module.scss'
import { images } from "~/assets/images";

const cx = classNames.bind(styles)
function NotificationItem({title, content, time, unread}) {
    return (
      <div className={cx('d-flex', 'column-gap-3', 'item',{status: unread})}>
        <div className={cx('image-wrapper')}>
          <img src={images.noImage} alt="avatar" className={cx('image')}></img>
        </div>
        <div className={cx('d-flex', 'flex-column', 'row-gap-2','info')}>
          <p className={cx('title')}>{title}</p>
          <p className={cx('content')}>{content}</p>
          <span className={cx('time')}>{time}</span>
        </div>
        {unread && <span className={cx('unread')}></span>}
      </div>
    )
}

export default NotificationItem;