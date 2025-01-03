import classNames from 'classnames/bind'
import styles from './RentalCard.module.scss'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesDown,
  faCar,
  faCartShopping,
  faClock,
  faLocationDot,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVehicleTypeByID } from '~/apiServices/user/getVehicleTypeByID'
import Rating from '../Rating'
const cx = classNames.bind(styles)
function RentalCardItem({ typeService, role, item,startDateTime, endDateTime }) {
  const navigate = useNavigate()
  const [typeVehicle, setTypeVehicle] = useState([])
  console.log('----typeService-------', typeService)
  const newPrice =
    typeService === 'self_driving'
      ? item.selfDriverPrice - item.selfDriverPrice * (item?.discount_percentage / 100)
      : item.driverPrice - item.driverPrice * (item?.discount_percentage / 100)
  const handleClickVehicle = (type) => {
    if (role === 'user') {
      navigate('/rent-vehicle/rental-service/rental-service-detail', {
        state: { typeService: type, infor: item, typeVehicle: typeVehicle, startDateTime: startDateTime, endDateTime: endDateTime },
      })
    } else if (role === 'partner') {
      navigate('/service-manage/detail-service-rental', {
        state: { typeService: type, infor: item, typeVehicle: typeVehicle },
      })
    }
  }
  // console.log('endDatatime ---2---', endDateTime)
  // console.log('startDatatime ---- 2----', startDateTime)
  useEffect(() => {
    async function fetchVehicleRentalByID() {
      const data = await getVehicleTypeByID(item.vehicle_type_id)
      if (data) {
        setTypeVehicle(data)
      }
    }
    fetchVehicleRentalByID()
  }, [item.vehicle_type_id])
  return (
    <Button
      className={cx('rental-card', 'col-12', 'col-md-9', 'col-lg-4', 'col-xl-4')}
      variant="none"
      onClick={() => handleClickVehicle(typeService)}
    >
      <div className={cx('image-name-vehicle')}>
        <img className={cx('image-vehicle')} src={item.imagesVehicleRegister[0]} alt="car"></img>
        <span className={cx('name-vehicle')}>{item.manufacturer + ' ' + item.vehicleLife}</span>
        {item.discount_percentage !== 0 && (
          <div className={cx('discount')}>
            <FontAwesomeIcon icon={faAnglesDown} className={cx('icon-discount')} />
            <span className={cx('discount-value')}>Giảm đến {item.discount_percentage}%</span>
          </div>
        )}
      </div>
      <div className={cx('icon-txt')}>
        <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'icon-location')} />
        <span className={cx('txt')}>{item.location}</span>
      </div>
      <div className={cx('icon-txt', 'd-flex')}>
        <div className={cx('d-flex', 'justify-content-start', 'align-items-center')}>
          <FontAwesomeIcon icon={faCar} className={cx('icon', 'icon-type')} />
          <span className={cx('txt')}>{typeVehicle.name}</span>
        </div>
        <div className={cx('d-flex', 'justify-content-end', 'align-items-center')}>
          <FontAwesomeIcon icon={faClock} className={cx('icon', 'icon-year', 'justify-content-end')} />
          <span className={cx('txt')}>{item.vehicleLife}</span>
        </div>
      </div>
      <div></div>
      <div className={cx('icon-txt')}>
        <FontAwesomeIcon icon={faCartShopping} className={cx('icon', 'icon-amount')} />
        <span className={cx('txt')}>Hiện có {item.amount} chiếc</span>
      </div>
      <div className={cx('line')}></div>

      <div className={cx('d-flex', 'pt-3', 'justify-content-between')}>
        <Rating rating={item.rating_total}></Rating>
        <div className={cx('price', 'd-flex', 'align-items-center')}>
          <FontAwesomeIcon icon={faMoneyBill} className={cx('icon', 'icon-money')} />
          {/* <span className={cx('txt')}>{item.price.toLocaleString('vi-VN')}đ/ngày</span> */}
          <div>
            <p className={cx('txt', 'charge-old')}>
              {typeService === 'self_driving'
                ? item.selfDriverPrice.toLocaleString('vi-VN')
                : item.driverPrice.toLocaleString('vi-VN')}
              đ/ngày
            </p>
            <p className={cx('txt', 'charge-new')}>{Math.floor(newPrice).toLocaleString('vi-VN')}đ/ngày</p>
          </div>
        </div>
      </div>
    </Button>
  )
}

RentalCardItem.propTypes = {
  typeService: PropTypes.string.isRequired,
}
export default RentalCardItem
