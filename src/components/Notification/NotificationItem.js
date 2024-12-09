import classNames from "classnames/bind";
import styles from './Notification.module.scss'
import { images } from "~/assets/images";
import { useState } from 'react'

const cx = classNames.bind(styles)
function NotificationItem({ data }) {
  const [isSeen, setIsSeen] = useState(data.seen)
  const handleReaded = () => {
    if (!isSeen) {
      console.log('Vào đây nhé')
      setIsSeen(true)
    }
  }
  console.log(isSeen)
  return (
      <div className={cx('d-flex', 'column-gap-3', 'item', { status: !isSeen })} onClick={handleReaded}>
        <div className={cx('image-wrapper')}>
          <img src={images.noImage} alt="avatar" className={cx('image')}></img>
        </div>
        <div className={cx('d-flex', 'flex-column', 'row-gap-2', 'info')}>
          <p className={cx('title')}>{data.title}</p>
          <p className={cx('content')}>{data.message}</p>
          <span className={cx('time')}>{data.create_at}</span>
        </div>
        {!isSeen && <span className={cx('unread')}></span>}
      </div>
  )
}

export default NotificationItem;