import classNames from 'classnames/bind'
import styles from './Voucher.module.scss'
import { images } from '~/assets/images'
import { Col, Row, ProgressBar } from 'react-bootstrap'
import Button from '~/components/Button'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)
const now = 60

function Voucher({ className, data }) {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className={cx('wrapper', 'voucher', [className])} style={{ backgroundImage: `url(${images.voucher})` }}>
      <Col xs="3" className={cx('d-flex justify-content-center align-items-center', 'border-right')}>
        <p className={cx('voucher-value')}>{`-${Math.round(data.voucherPercentage)}%`}</p>
      </Col>
      <Col xs="9" className="justify-content-center align-items-center p-3">
        <Row className="justify-content-center align-items-center">
          <Col>
            <p className={cx('voucher-name')}>{data.name}</p>
          </Col>
          {!currentUser.roles?.includes('ADMIN') && (
            <Col xs="auto">
              <Button rounded className={cx('claim_voucher')}>
                Lấy mã
              </Button>
            </Col>
          )}
        </Row>
        <Row className="justify-content-center ">
          <ProgressBar now={now} label={`${now}%`} visuallyHidden className={cx('custom-progress')} variant="none" />
        </Row>
        <Row>
          <p className={cx('description')}>{data.description}</p>
        </Row>
        <Row className={cx('voucher-number')}>
          <p>{`Còn lại ${data.remainingQuantity} mã`}</p>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content')}>
            <p>Giá trị đơn hàng tối thiểu:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="">{data.minOrderValue}</p>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content')}>
            <p>Có hiệu lực từ:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="">{`0h00 ${data.startDate}`}</p>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content')}>
            <p>Hạn sử dụng:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="ms-2">{`23h59 ${data.endDate}`}</p>
          </Col>
        </Row>
      </Col>
    </div>
  )
}

export default Voucher
