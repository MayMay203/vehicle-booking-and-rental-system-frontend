import classNames from 'classnames/bind'
import styles from './RatingStar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function RatingStar() {
  return (
    <div className={cx('rating-value')}>
      <FontAwesomeIcon icon={faStar} className={cx('icon-star')}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faStar} className={cx('icon-star')}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faStar} className={cx('icon-star')}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faStar} className={cx('icon-star')}></FontAwesomeIcon>
      <FontAwesomeIcon icon={faStar} className={cx('icon-star')}></FontAwesomeIcon>
    </div>
  )
}
export default RatingStar
