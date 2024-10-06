import classNames from 'classnames/bind'
import styles from './RentalCard.module.scss'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faCar, faCartShopping, faClock, faLocationDot, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { images } from '~/assets/images'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Rating from '../Rating'
const cx = classNames.bind(styles)
function RentalCardItem({typeService}) {
  const navigate = useNavigate() 
  const handleClickVehicle = (type) => {
    navigate('/rent-vehicle/rental-service/rental-service-detail', { state: { typeService: type } }) 
  }
  return (
    <Button className={cx('rental-card', 'col-12', 'col-md-9', 'col-lg-4', 'col-xl-4')} variant="none" onClick={() => handleClickVehicle(typeService)}>
      <div className={cx('image-name-vehicle')}>
        <img className={cx('image-vehicle')} src={images.renting} alt='car'></img>
        <span className={cx('name-vehicle')}>Toyota Vios 2020</span>
        <div className={cx('discount')}>
          <FontAwesomeIcon icon={faAnglesDown} className={cx('icon-discount')} />
          <span className={cx('discount-value')}>Giảm đến 50%</span>
        </div>
      </div>
      <div className={cx('icon-txt')}>
        <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'icon-location')} />
        <span className={cx('txt')}>123 Lê Đại Hành, Đà Nẵng</span>
      </div>
      <div className={cx('icon-txt', 'd-flex')}>
        <div className={cx('d-flex', 'justify-content-start', 'align-items-center')}>
          <FontAwesomeIcon icon={faCar} className={cx('icon', 'icon-type')} />
          <span className={cx('txt')}>Xe o tô 4 chỗ </span>
        </div>
        <div className={cx('d-flex', 'justify-content-end', 'align-items-center')}>
          <FontAwesomeIcon icon={faClock} className={cx('icon', 'icon-year', 'justify-content-end')} />
          <span className={cx('txt')}>2020</span>
        </div>
      </div>
      <div></div>
      <div className={cx('icon-txt')}>
        <FontAwesomeIcon icon={faCartShopping} className={cx('icon', 'icon-amount')} />
        <span className={cx('txt')}>Hiện có 3 chiếc</span>
      </div>
      <div className={cx('line')}></div>

      <div className={cx('d-flex', 'pt-3', 'justify-content-between')}>
        <Rating></Rating>
        <div className={cx('price', 'd-flex', 'align-items-center')}>
          <FontAwesomeIcon icon={faMoneyBill} className={cx('icon', 'icon-money')} />
          <span className={cx('txt')}>200.000đ/2 giờ</span>
        </div>
      </div>
    </Button>
  )
}

RentalCardItem.propTypes = {
  typeService: PropTypes.string.isRequired,
}
export default RentalCardItem
