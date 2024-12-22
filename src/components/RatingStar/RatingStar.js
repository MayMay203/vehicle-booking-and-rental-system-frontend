import classNames from 'classnames/bind'
import styles from './RatingStar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function RatingStar({ numberStar }) {
  return (
    <div className={cx('rating-value')}>
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={cx('icon-star')}
          style={{ color: index < numberStar ? '#FFC700' : '#D3D3D3' }} 
        />
      ))}
    </div>
  )
}

export default RatingStar
