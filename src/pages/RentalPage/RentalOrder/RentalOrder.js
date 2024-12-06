import classNames from "classnames/bind"
import styles from "./RentalOrder.module.scss"
import { config } from '~/config'
import { Breadcrumb, Row } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import StepOrder from "~/components/StepOrder"
import OrderRental from "~/components/OrderRental"
const cx = classNames.bind(styles)
function RentalOrder(){
    const location = useLocation()
    const typeService = location.state?.typeService
    const formData = location.state?.formData
    const manned = 'manned'
    const self_driving = 'self_driving'
    return (
      <div className={cx('wrapper', 'container')}>
        <Breadcrumb className="mb-5">
          <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href={config.routes.renting}>Thuê xe</Breadcrumb.Item>
          <Breadcrumb.Item href={config.routes.rentalService}>
            {typeService === self_driving && 'Thuê xe tự lái'}
            {typeService === manned && 'Thuê xe có người lái'}
          </Breadcrumb.Item>
          <Breadcrumb.Item href={config.routes.rentalServiceDetail}>Chi tiết xe</Breadcrumb.Item>
          <Breadcrumb.Item href={config.routes.rentalOrder} active>
            Xác nhận thuê xe
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className={cx('d-flex', 'align-items-center', 'justify-content-center', 'm-0')}>
          <StepOrder numberSteps={3} typeService={'thuê xe'} stepDoing={2}></StepOrder>
        </Row>
        <Row>
          <OrderRental typeService={typeService} formData={formData}></OrderRental>
        </Row>
      </div>
    )
}
export default RentalOrder