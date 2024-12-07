import classNames from 'classnames/bind'
import styles from './Notification.module.scss'
import Button from '../Button'
import { memo, useEffect, useState } from 'react'
import NotificationItem from './NotificationItem'

const cx = classNames.bind(styles)
function Notification() {
  const [active, setActive] = useState('all')

  //Socket Client
  //

  // function onConnected() {
  //   stompClient.subscribe(/user/${currentUser.id}/${currentRole}/queue/messages, onNotificationRecieved)
  //   // stompClient.subscribe(/user/${currentUser.id}/${currentRole}/notification, (message) => {
  //   //   console.log('Notification: ', message)
  //   // })
  //   // findAndDisplayConnectedUser()
  // }

  // async function findAndDisplayConnectedUser() {
  //   let response = null
  //   try {
  //     response = await httpRequest.get(
  //       http://localhost:8080/api/v1/chat/get-connected-account?conversation_id=${conversation_id}&account_id=${ownerId}&role_account=${ownerType},
  //       {
  //         headers: {
  //           Authorization: Bearer ${getAccessToken()},
  //         },
  //       },
  //     )
  //   } catch (error) {
  //     console.error('Failed to update account: ', error)
  //   }

  //   if (response) {
  //     let connectedUser = response.data
  //     console.log(connectedUser)
  //   } else {
  //     console.log('No response received.')
  //   }
  // }

  // function onError() {}
  //

  useEffect(() => {}, [])
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
      <div className={cx('mt-4', 'list')}>
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
