import classNames from "classnames/bind";
import styles from './Notification.module.scss'
import { images } from "~/assets/images";
import { updateStatusNotification } from '~/apiServices/messageService/updateStatusNotification'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllNotificationsByAcc } from "~/redux/slices/conversationSlice";

const cx = classNames.bind(styles)
function NotificationItem({ data }) {
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const dispatch = useDispatch()

  const handleReaded = async () => {
    if (!data.seen) {
      await updateStatusNotification(currentUser.id, currentRole, data.id)
      dispatch(fetchAllNotificationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
    }
  }

  return (
    <div className={cx('d-flex', 'column-gap-3', 'item', { status: !data.seen })} onClick={handleReaded}>
      <div className={cx('image-wrapper')}>
        <img src={images.noImage} alt="avatar" className={cx('image')}></img>
      </div>
      <div className={cx('d-flex', 'flex-column', 'row-gap-2', 'info')}>
        <p className={cx('title')}>{data.title}</p>
        <p className={cx('content')}>{data.message}</p>
        <span className={cx('time')}>{data.create_at}</span>
      </div>
      {!data.seen && <span className={cx('unread')}></span>}
    </div>
  )
}

export default NotificationItem;