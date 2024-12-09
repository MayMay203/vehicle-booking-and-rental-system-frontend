import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from '../Image'
import styles from './Feedback.module.scss'
import classNames from 'classnames/bind'
import { faEdit, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useRef } from 'react'

const cx = classNames.bind(styles)
function FeedbackItem({ className, data, handleComment }) {
  const { currentUser } = useSelector((state) => state.user)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [selectedStar, setSelectedStar] = useState(data.ratingValue - 1)
  const textareaRef = useRef(null)
  const [comment, setComment] = useState(data.comment)

  const [time, date] = data.commentDate.split(' ')
  const [day, month, year] = date.split('-')
  const isoDate = `${year}-${month}-${day}T${time}:00`

  // So sánh thời gian hiện tại với commentDate
  const isEditable = new Date() - new Date(isoDate) < 3 * 60 * 60 * 1000

  const handleInput = () => {
    const textarea = textareaRef.current
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleClickStar = (index) => {
    setSelectedStar(index)
  }

  console.log(data)

  return (
    <div className="col">
      <div className={cx('item', [className])}>
        <div className={cx('info-wrapper')}>
          <Image src={data.avatar} alt="avatar" className={cx('avatar')} />
          <div className={cx('info')}>
            <span className={cx('name')}>{data.customerName}</span>
            <div className={cx('star-list')}>
              {Array.from({ length: data.ratingValue }, (_, index) => (
                <span key={index} className={cx('selected')}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
              {Array.from({ length: 5 - data.ratingValue }, (_, index) => (
                <span key={index} className={cx('normal')}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className={cx('content')}>{data.comment}</p>
        <div className={cx('bottom')}>
          <span className={cx('time')}>{data.commentDate}</span>
          {currentUser.id === data.accountId && isEditable && (
            <div>
              <button style={{ color: 'var(--primary-color)' }} onClick={() => setIsUpdate(true)}>
                <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
              </button>
              <button style={{ color: 'red', marginLeft: '6px' }} onClick={() => setIsDelete(true)}>
                <FontAwesomeIcon icon={faTrash} /> Xoá
              </button>
            </div>
          )}
        </div>
      </div>

      {data.accountId === currentUser.id && (
        <Modal
          title="Chỉnh sửa bình luận"
          open={isUpdate}
          onCancel={() => setIsUpdate(false)}
          centered
          okText="Chỉnh sửa"
          cancelText="Hủy"
          footer={[
            <Button
              key="back"
              onClick={() => setIsDelete(false)}
              style={{ border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}
            >
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="custom-confirm-btn"
              onClick={() => {
                handleComment(data.id, selectedStar + 1, comment, 'update')
                setIsUpdate(false)
              }}
              style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}
            >
              Chỉnh sửa
            </Button>,
          ]}
        >
          <div className="d-flex column-gap-3">
            <span className={cx('quality')}>Chất lượng dịch vụ:</span>
            <div className="d-flex column-gap-3">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={cx('normal', { selected: index <= selectedStar })}
                  onClick={() => handleClickStar(index)}
                />
              ))}
            </div>
          </div>
          <div className="d-flex column-gap-2 mt-3 align-items-end">
            <div className={cx('write-comment')}>
              <textarea
                value={comment}
                ref={textareaRef}
                rows={3}
                placeholder="Đánh giá trải nghiệm"
                className={cx('text-comment')}
                onInput={handleInput}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </Modal>
      )}
      {data.accountId === currentUser.id && (
        <Modal
          title={<span style={{ fontSize: '1.8rem' }}>Xác nhận xoá bình luận</span>}
          open={isDelete}
          onCancel={() => setIsDelete(false)}
          centered
          okText="Xoá"
          cancelText="Hủy"
          footer={[
            <Button
              key="back"
              onClick={() => setIsDelete(false)}
              style={{ border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}
            >
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="custom-confirm-btn"
              onClick={() => {
                handleComment(data.id, 0, '', 'delete')
                setIsDelete(false)
              }}
              style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}
            >
              Xác nhận
            </Button>,
          ]}
        >
          <p>Bạn có chắc chắn muốn xoá bình luận này?</p>
        </Modal>
      )}
    </div>
  )
}

export default FeedbackItem
