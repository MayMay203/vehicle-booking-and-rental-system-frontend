import classNames from 'classnames/bind'
import styles from './Notification.module.scss'
import Button from '../Button'
import { memo, useEffect, useState } from 'react'
import NotificationItem from './NotificationItem'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import {fetchAllNotificationsByAcc } from '~/redux/slices/conversationSlice'
import { Empty} from 'antd'

const cx = classNames.bind(styles)
function Notification({ handleClose }) {
  const [active, setActive] = useState('All')
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const { notificationList } = useSelector((state) => state.conversation)
  console.log('notificationList', notificationList)
  const [filterList, setFilterList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchAllNotifications() {
      dispatch(fetchAllNotificationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
    }
    if (currentUser.id && dispatch(checkLoginSession())) {
      fetchAllNotifications()
    }
  }, [currentUser.id, currentRole, dispatch])

  useEffect(() => {
    if (active === 'All') {
      setFilterList(notificationList)
    } else {
      setFilterList(notificationList.filter((notification) => notification.seen === false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationList, active])

  useEffect(() => {}, [])
  const handleChooseAll = () => {
    if (active === 'Unread') {
      setActive('All')
    }
  }

  const handleChooseUnread = () => {
    if (active === 'All') {
      setActive('Unread')
    }
  }
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>Thông báo</h2>
      <div className="d-flex mt-4 mb-4">
        <Button rounded className={cx('btn-action', { active: active === 'All' })} onClick={handleChooseAll}>
          Tất cả
        </Button>
        <Button rounded className={cx('btn-action', { active: active === 'Unread' })} onClick={handleChooseUnread}>
          Chưa đọc
        </Button>
      </div>
      <div style={{ border: '1px solid rgba(0, 0, 0, 0.175)' }}></div>
      <div className={cx('mt-4', 'list')}>
        {filterList.length > 0 ? (
          filterList.map((notification) => <NotificationItem key={notification.id} data={notification} handleClose={handleClose} />)
        ) : (
          <Empty style={{ marginTop: '40px' }} description="Không có thông báo nào gần đây" />
        )}
      </div>
    </div>
  )
}

export default memo(Notification)
