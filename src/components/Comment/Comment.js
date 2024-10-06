import { faCommentDots, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Comment.module.scss'
import classNames from 'classnames/bind'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

const cx = classNames.bind(styles)
function Comment() {
  const [selectedStar, setSelectedStar] = useState(-1)
  const textareaRef = useRef(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleClickStar = (index) => {
    setSelectedStar(index)
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
            ref={textareaRef}
            rows={3}
            placeholder="Đánh giá trải nghiệm"
            className={cx('text-comment')}
            onInput={handleInput}
          ></textarea>
        </div>
        <button className={cx('btn-send')}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}

export default Comment
