import classNames from 'classnames/bind'
import styles from './BookingOrder.module.scss'
import { config } from '~/config'
import { Breadcrumb, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import StepOrder from '~/components/StepOrder'
import OrderBooking from '~/components/OrderBooking'
const cx = classNames.bind(styles)
function BookingOrder() {
  const location = useLocation()
  const id = location.state?.id
  return (
    <div className={cx('wrapper', 'container')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.booking}>Đặt xe</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.bookingService}>
          Chọn xe
        </Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.bookingOrder} active>
          Xác nhận đặt xe
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className={cx('d-flex', 'align-items-center', 'justify-content-center', 'm-0')}>
        <StepOrder numberSteps={4} typeService={'đặt xe'} stepDoing={2}></StepOrder>
      </Row>
      <Row>
        <OrderBooking id={id}></OrderBooking>
      </Row>
    </div>
  )
}
export default BookingOrder
