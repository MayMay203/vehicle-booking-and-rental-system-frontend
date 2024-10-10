import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './BookingServiceCard.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function BookingServiceCard({ name, icon, color }) {
  return (
    <div
      className={cx('circle')}
      style={{ background: `linear-gradient(white 40%, #${color} 75%)`, border: `1px solid #F6F6F6`, boxShadow: `0px 0px 1px 0.5px #${color}` }}
    >
      <div className={cx('content')}>
        {icon && <FontAwesomeIcon icon={icon} className={cx('icon')} style={{ color: `#${color}` }} />}
        <p className={cx('name')}>{name}</p>
      </div>
    </div>
  )
}

export default BookingServiceCard
