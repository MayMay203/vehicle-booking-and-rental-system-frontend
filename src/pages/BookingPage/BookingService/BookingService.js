import styles from './BookingService.module.scss'
import { config } from '~/config'
import classNames from 'classnames/bind'
import { Row, Breadcrumb} from 'react-bootstrap'
import { images } from '~/assets/images'
import BookingVehicleList from '~/components/BookingVehicle/BookingVehicleList'
import Button from '~/components/Button'
import VoucherList from '~/components/Voucher/VoucherList'
import PaymentMethods from '~/components/PaymentMethod'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)
function BookingService() {
  const navigate = useNavigate() 
  const handleBooking = (id) => {
    navigate('/book-vehicle/booking-service/booking-order', { state: { id: id} }) 
  }
  return (
    <div className={cx('wrapper', 'container')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.booking} >
          Đặt xe
        </Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.bookingService} active>
          Bắt đầu đặt xe
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <div className={cx('wrap-start-location')}>
          <img src={images.local_taxi} alt="local-taxi" className={cx('img')}></img>
          <div className={cx('wrap-txt')}>
            <p className={cx('txt-title')}>Vị trí đón bạn</p>
            <p className={cx('txt-location')}>Vị trí mặc định là vị trí của người đặt</p>
          </div>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-end-location', 'justify-content-end')}>
          <div className={cx('wrap-txt')}>
            <p className={cx('txt-title')}>Vị trí đón bạn</p>
            <p className={cx('txt-location')}>98 Lê Đại Hành, Đà Nẵng</p>
          </div>
          <img src={images.home_pin} alt="home-pin" className={cx('img')}></img>
        </div>
      </Row>
      <Row className={cx('justify-content-center', 'border')}>
        <div className={cx('txt-header')}>DANH SÁCH XE DÀNH CHO BẠN</div>
        <BookingVehicleList></BookingVehicleList>
      </Row>
      <Row className={cx('justify-content-center', 'border')}>
        <div className={cx('txt-header')}>PHƯƠNG THỨC THANH TOÁN</div>
        <PaymentMethods></PaymentMethods>
      </Row>
      <Row className={cx('justify-content-center', 'border', 'md-col-2')}>
        <div className={cx('txt-header')}>MÃ GIẢM GIÁ</div>
        <VoucherList></VoucherList>
      </Row>
      <Row className={cx('justify-content-center')}>
        <Button primary className={cx('btn-booking')} onClick={()=>handleBooking(1)}>
          Đặt xe
        </Button>
      </Row>
    </div>
  )
}

export default BookingService
