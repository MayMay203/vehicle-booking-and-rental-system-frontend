import classNames from 'classnames/bind'
import styles from './Notification.module.scss'
import Button from '../Button'
import { memo, useState } from 'react'
import NotificationItem from './NotificationItem'

const cx = classNames.bind(styles)
function Notification() {
  const [active, setActive] = useState('all')

  const handleChooseAll = () => {
    if (active === 'unread') {
      setActive('all')
    }
  }

  const handleChooseUnread = () => {
    if (active === 'all') {
      setActive('unread')
    }
  }
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>Thông báo</h2>
      <div className="d-flex mt-4">
        <Button rounded className={cx('btn-action', { active: active === 'all' })} onClick={handleChooseAll}>
          Tất cả
        </Button>
        <Button rounded className={cx('btn-action', { active: active === 'unread' })} onClick={handleChooseUnread}>
          Chưa đọc
        </Button>
      </div>
      <div className={cx('mt-4','list')}>
        <NotificationItem
          title="Đặt xe thành công"
          content="Bạn đã thanh toán và được xác nhận đặt xe thành công"
          time="10:00 16-10-2024"
          unread={true}
        />
        <NotificationItem
          title="Đặt xe thành công"
          content="Bạn đã thanh toán và được xác nhận đặt xe thành công"
          time="10:00 16-10-2024"
        />
        <NotificationItem
          title="Đặt xe thành công"
          content="Bạn đã thanh toán và được xác nhận đặt xe thành công"
          time="10:00 16-10-2024"
          unread={true}
        />
        <NotificationItem
          title="Đặt xe thành công"
          content="Bạn đã thanh toán và được xác nhận đặt xe thành công"
          time="10:00 16-10-2024"
        />
      </div>
    </div>
  )
}

export default memo(Notification)
