import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckedIcon, StarIcon } from '../Icon'
import Image from '../Image'
import styles from './Feedback.module.scss'
import classNames from 'classnames/bind'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-regular-svg-icons'

const cx = classNames.bind(styles)
function FeedbackItem() {
  return (
    <div className="col">
      <div className={cx('item')}>
        <div className={cx('info-wrapper')}>
          <Image src="default" alt="avatar" className={cx('avatar')} />
          <div className={cx('info')}>
            <span className={cx('name')}>Hương Quỳnh</span>
            <div className={cx('star-list')}>
              <span className={cx('selected')}>
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className={cx('selected')}>
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className={cx('selected')}>
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className={cx('normal')}>
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className={cx('normal')}>
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
          </div>
        </div>
        <p className={cx('content')}>Nhân viên nhà xe nhiệt tình lắm, 10đ không có gì để chê</p>
        <div className={cx('bottom')}>
          <span className={cx('time')}>Đi ngày 07/09/2024</span>
          <p className={cx('status')}>
            <CheckedIcon width="1.8rem" height="1.8rem" />
            Đã mua vé
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackItem
