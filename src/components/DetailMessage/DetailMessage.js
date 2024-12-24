import styles from './DetailMessage.module.scss'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import Image from '../Image'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircleXmark, faEdit } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)

function DetailMessage({ data, image, handleUpdateMessage }) {
  const { currentUser } = useSelector((state) => state.user)
  const [isShowDate, setIsShowDate] = useState(false)
  const [contentUpdate, setContentUpdate] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const isSender = data.senderId === currentUser.id
  const textAreaRef = useRef(null)
  const handleSaveEdit = () => {
    setIsEditing(false)
    handleUpdateMessage(data.id, contentUpdate)
  }

  const checkEditable = () => {
    if (!isSender) return false
    const [time, date] = data.sendAt.split(' ')
    const [day, month, year] = date.split('-')
    const formattedDate = `${year}-${month}-${day}T${time}:00`
    const timeDifference = (new Date() - new Date(formattedDate)) / 1000 / 60
    if (timeDifference <= 5) {
      return true
    }
    return false
  }

  const handleDoubleClick = () => {}
  return (
    <div
      onClick={() => setIsShowDate((prev) => !prev)}
      className={cx('wrap', { 'wrap-receive': !isSender }, { 'wrap-send': isSender })}
      onDoubleClick={handleDoubleClick}
    >
      {!isSender && (
        <div className={cx('wrap-avatar')}>
          <Image alt="avatar" className={cx('avatar')} src={image}></Image>
        </div>
      )}
      <div className={cx({ 'wrap-content-end': isSender })} style={{ width: '100%' }}>
        {isEditing ? (
          <div style={{ width: '100%' }}>
            <textarea
              rows={1}
              ref={textAreaRef}
              type="text"
              className={cx('edit-input')}
              value={contentUpdate}
              onChange={(e) => {
                setContentUpdate(e.target.value)
                textAreaRef.current.style.height = 'auto'
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit()
              }}
              autoFocus
            />
            <div className="mt-1 d-flex justify-content-end">
              <button onClick={handleSaveEdit} className={cx('button-complete')}>
                <FontAwesomeIcon icon={faCheckCircle} />
              </button>
              <button onClick={() => setIsEditing(false)} className={cx('button-close')}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
          </div>
        ) : (
          <div className={cx('d-flex', 'align-items-center', 'message-wrapper')}>
            {checkEditable() && (
              <button className={cx('btn-edit')} onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
            <p className={cx({ 'content-receive': !isSender }, { 'content-send': isSender }, 'content-message')}>
              {data.content}
            </p>
          </div>
        )}
        <p className={cx('time', { 'align-right': isSender, 'time-visible': isShowDate })}>{data.sendAt}</p>
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
