import classNames from "classnames/bind"
import styles from './BookingVehicleCard.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBicycle, faCar, faMotorcycle } from "@fortawesome/free-solid-svg-icons"

const cx = classNames.bind(styles)
function BookingVehicleCard({ type, isActive, onClick }) {
  const car = 'car'
  const two_wheeler = 'two_wheeler'
  const electric_bike = 'electric_bike'
  return (
    <div className={cx('btn-vehicle', { active: isActive })} onClick={onClick}>
      <div className={cx('circle')}></div>
      <div className={cx('vehicle')}>
        {type === car && <FontAwesomeIcon icon={faCar} className={cx('icon', type)}></FontAwesomeIcon>}
        {type === two_wheeler && <FontAwesomeIcon icon={faMotorcycle} className={cx('icon', type)}></FontAwesomeIcon>}
        {type === electric_bike && <FontAwesomeIcon icon={faBicycle} className={cx('icon', type)}></FontAwesomeIcon>}
        <div className={cx('wrap-txt')}>
          <p className={cx('type-vehicle')}>Xe ô tô điện 4 chỗ</p>
          <p className={cx('amount-vehicle')}>4 xe</p>
        </div>
        <div className={cx('wrap-charge')}>
          <p className={cx('old-charge')}>120.000đ</p>
          <p className={cx('new-charge')}>100.000đ</p>
        </div>
      </div>
    </div>
  )
}
export default BookingVehicleCard