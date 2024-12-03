import styles from './DetailMessage.module.scss'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import Image from '../Image'
const cx = classNames.bind(styles)
function DetailMessage({ data, image }) {
  const { currentUser } = useSelector((state) => state.user)
  const isSender = data.senderId === currentUser.id
  const date = new Date(data.sendAt)
  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getFullYear()}`
  return (
    <div className={cx('wrap', { 'wrap-receive': !isSender }, { 'wrap-send': isSender })}>
      {!isSender && (
        <div className={cx('wrap-avatar')}>
          <Image alt="avatar" className={cx('avatar')} src={image}></Image>
        </div>
      )}
      <div className={cx({ 'wrap-content-end': isSender })}>
        <p className={cx({ 'content-receive': !isSender }, { 'content-send': isSender }, 'content-message')}>
          {data.content}
        </p>
        <p className={cx('time', { 'align-right': isSender })}>{formattedTime}</p>
      </div>
      {isSender && (
        <div className={cx('wrap-avatar')}>
          <Image alt="avatar" className={cx('avatar')} src={currentUser.avatar}></Image>
        </div>
      )}
    </div>
  )
}
export default DetailMessage
