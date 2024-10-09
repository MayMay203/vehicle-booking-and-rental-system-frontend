import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCar, faFileSignature, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons"
import { Col, Row } from "react-bootstrap"
import styles from "./StepRental.module.scss"
const cx = classNames.bind(styles)
function StepRental(){
    return (
      <Row className={cx('m-0 justify-centent-center align-items-center', 'wrap-step')}>
        <Col xs="2" className={cx('step')}>
          <Row className={cx('icon-step', 'done')}>
            <FontAwesomeIcon icon={faCar}></FontAwesomeIcon>
          </Row>
          <Row className={cx('content-step', 'done')}>
            <span>Tìm và chọn xe</span>
          </Row>
        </Col>
        <Col xs="3">
          <hr className={cx('line-dashed', 'done')} />
        </Col>
        <Col xs="2" className={cx('step')}>
          <Row className={cx('icon-step', 'doing')}>
            <FontAwesomeIcon icon={faFileSignature}></FontAwesomeIcon>
          </Row>
          <Row className={cx('content-step', 'doing')}>
            <span>Xác nhận đơn hàng</span>
          </Row>
        </Col>
        <Col xs="3">
          <hr className={cx('line-dashed')} />
        </Col>
        <Col xs="2" className={cx('step')}>
          <Row className={cx('icon-step')}>
            <FontAwesomeIcon icon={faHandHoldingDollar}></FontAwesomeIcon>
          </Row>
          <Row className={cx('content-step')}>
            <span>Thanh toán</span>
          </Row>
        </Col>
      </Row>
    )
}
export default StepRental