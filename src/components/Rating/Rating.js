import classNames from 'classnames/bind'
import styles from './Rating.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function Rating() {
  return (
    <div className={cx('rating', 'd-flex', 'align-items-center')}>
      <span className={cx('rating-value', 'txt')}>4.5</span>
      <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
    </div>
  )
}
export default Rating
