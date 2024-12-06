import classNames from 'classnames/bind'
import styles from './RentalCard.module.scss'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faCar, faCartShopping, faClock, faLocationDot, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Rating from '../Rating'
import { useEffect, useState } from 'react'
import { getVehicleTypeByID } from '~/apiServices/user/getVehicleTypeByID'
const cx = classNames.bind(styles)
function RentalCardItem({typeService, role, item}) {
  const navigate = useNavigate() 
  const handleClickVehicle = (type) => {
    if(role==='user'){
      navigate('/rent-vehicle/rental-service/rental-service-detail', {
        state: { typeService: type, infor: item, typeVehicle: typeVehicle },
      }) 
    }
    else if(role==='partner'){
      navigate('/service-manage/detail-service-rental', {
        state: { typeService: type, infor: item, typeVehicle: typeVehicle },
      }) 
    }
  }
   const [typeVehicle, setTypeVehicle] = useState([])
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
        <span className={cx('name-vehicle')}>{item.manufacturer} 2020</span>
        <div className={cx('discount')}>
          <FontAwesomeIcon icon={faAnglesDown} className={cx('icon-discount')} />
          <span className={cx('discount-value')}>Giảm đến {item.discount_percentage}%</span>
        </div>
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
          <span className={cx('txt')}>2020</span>
        </div>
      </div>
      <div></div>
      <div className={cx('icon-txt')}>
        <FontAwesomeIcon icon={faCartShopping} className={cx('icon', 'icon-amount')} />
        <span className={cx('txt')}>Hiện có {item.quantity} chiếc</span>
      </div>
      <div className={cx('line')}></div>

      <div className={cx('d-flex', 'pt-3', 'justify-content-between')}>
        <Rating></Rating>
        <div className={cx('price', 'd-flex', 'align-items-center')}>
          <FontAwesomeIcon icon={faMoneyBill} className={cx('icon', 'icon-money')} />
          <span className={cx('txt')}>{item.amount.toLocaleString('vi-VN')}đ/ngày</span>
        </div>
      </div>
    </Button>
  )
}

RentalCardItem.propTypes = {
  typeService: PropTypes.string.isRequired,
}
export default RentalCardItem
