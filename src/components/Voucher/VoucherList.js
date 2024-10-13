import classNames from "classnames/bind"
import styles from './Voucher.module.scss'
import { Col,Row } from "react-bootstrap"
import Voucher from "./Voucher"
const cx = classNames.bind(styles)

function VoucherList(){
    return (
      <Row className={cx('wrap-list')}>
        <Col xxl="4" xl="4" lg="6" className="d-flex flex-column align-items-center ">
          <Voucher></Voucher>
        </Col>
        <Col xxl="4" xl="4" lg="6" className={cx('d-flex flex-column align-items-center')}>
          <Voucher></Voucher>
        </Col>
        <Col xxl="4" xl="4" lg="6" className="d-flex flex-column align-items-center ">
          <Voucher></Voucher>
        </Col>
        <Col xxl="4" xl="4" lg="6" className="d-flex flex-column align-items-center ">
          <Voucher></Voucher>
        </Col>
        <Col xxl="4" xl="4" lg="6" className="d-flex flex-column align-items-center ">
          <Voucher></Voucher>
        </Col>
        <p className={cx('note', 'p-5 justify-content-center')}>Hãy sử dụng mã giảm giá để tiết kiệm hơn nhé!</p>
      </Row>
    )
}
export default VoucherList