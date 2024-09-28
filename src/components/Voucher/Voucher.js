import classNames from 'classnames/bind'
import styles from './Voucher.module.scss'
import { images } from '~/assets/images'
import { Col, Row, ProgressBar } from 'react-bootstrap'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
const now = 60

function Voucher() {
  return (
    <div className={cx('wrapper', 'voucher')} style={{ backgroundImage: `url(${images.voucher})` }}>
      <Col xs="3" className={cx('d-flex justify-content-center align-items-center', 'border-right')}>
        <p className={cx('voucher-value')}>-50%</p>
      </Col>
      <Col xs="9" className="justify-content-center align-items-center p-3">
        <Row className="justify-content-center align-items-center">
          <Col>
            <p className={cx('voucher-name')}>Khuyến mãi 9/9</p>
          </Col>
          <Col xs="auto">
            <Button rounded className={cx('claim_voucher')}>
              Lấy mã
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <ProgressBar now={now} label={`${now}%`} visuallyHidden className={cx('custom-progress')} variant="none" />
        </Row>
        <Row className={cx('voucher-number')}>
          <p>Còn lại: 3 mã</p>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content')}>
            <p>Có hiệu lực từ:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="">12:00, 22/09/2024</p>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content')}>
            <p>Hạn sử dụng:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="ms-2">23:59, 26/09/2024</p>
          </Col>
        </Row>
      </Col>
    </div>
  )
}

export default Voucher
