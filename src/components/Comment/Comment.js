import { faCommentDots, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Comment.module.scss'
import classNames from 'classnames/bind'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

const cx = classNames.bind(styles)
function Comment({ handleComment }) {
  const [selectedStar, setSelectedStar] = useState(-1)
  const textareaRef = useRef(null)
  const [comment, setComment] = useState('')

  const handleInput = () => {
    const textarea = textareaRef.current
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleClickStar = (index) => {
    setSelectedStar(index)
  }

  const handleSendComment = async () => {
    handleComment('', selectedStar + 1, comment.trim(),'create')
    setComment('')
    setSelectedStar(-1)
  }

  return (
    <div className={cx('wrapper')}>
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
      <div className="d-flex column-gap-2 mt-4 align-items-end">
        <div className={cx('write-comment')}>
          <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
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
        <button
          className={cx('btn-send', { disabled: selectedStar === -1 || comment === '' })}
          disabled={selectedStar === 0 || comment === ''}
          onClick={handleSendComment}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}

export default Comment
