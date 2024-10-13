import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faPhone, faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './OrderBooking.module.scss'
import Button from '~/components/Button'
const cx = classNames.bind(styles)
function OrderBooking({ id }) {
  const navigate = useNavigate()
  const handleOrder = (id) => {
    navigate('/book-vehicle/booking-service/booking-order', { state: { id: id } })
  }
  return (
    <Row className={cx('order', 'm-0')}>
      <Row className={cx('txt')}>THÔNG TIN ĐƠN HÀNG</Row>
      <Row>
        <Row className={cx('txt-title')}>Người đặt</Row>
        <Row className={cx('xs-col-2', 'wrap-order')}>
          <Col sm="12" md="6" className={cx()}>
            <div className={cx('d-flex', 'align-items-center', 'box-order')}>
              <FontAwesomeIcon icon={faUserLarge} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <p className={cx('name')}>Họ và tên</p>
                <p className={cx('input-name')}>Ngô Thị Lan Hương</p>
              </div>
            </div>
          </Col>
          <Col sm="12" md="6" className={cx()}>
            <div className={cx('d-flex', 'align-items-center', 'box-order')}>
              <FontAwesomeIcon icon={faPhone} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <p className={cx('phone')}>Số điện thoại</p>
                <p className={cx('input-phone')}>08420598765</p>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <Row className={cx('txt-title')}>Thời gian đặt xe</Row>
        <Row className={cx('xs-col-2', 'wrap-infor-order')}>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center')}>
              <FontAwesomeIcon icon={faCalendar} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <span className={cx('txt-content')}>13h00, 12/08/2024</span>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <Row className={cx('txt-title')}>Địa điểm đón</Row>
        <Row className={cx('xs-col-2', 'wrap-infor-order')}>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center')}>
              <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <span className={cx('txt-content', 'm-0')}>728 Lê Đại Hành, thành phố Đà Nẵng</span>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <Row className={cx('txt-title')}>Địa điểm đến</Row>
        <Row className={cx('xs-col-2', 'wrap-infor-order')}>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center')}>
              <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <span className={cx('txt-content', 'm-0')}>728 Lê Đại Hành, thành phố Đà Nẵng</span>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Loại xe đặt</span>
          <span className={cx('align-right', 'txt-black')}>Xe mô tô</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Phương thức thanh toán</span>
          <span className={cx('align-right', 'txt-black')}>Thanh toán bằng tiền mặt</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Phí đặt xe</span>
          <span className={cx('align-right')}>100.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor', 'line')}>
          <span>Giảm giá</span>
          <span className={cx('align-right', 'txt-red')}>-0đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor', 'no-line')}>
          <span>Tổng tiền:</span>
          <span className={cx('align-right', 'txt-bold')}>100.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-note')}>
          <span className={cx('note')}>Lưu ý:</span>
          <span className={cx('note-content')}>
            Nếu bạn đã thanh toán mà không có tài xế nhận đơn, tiền sẽ được hoàn trả 100%.
          </span>
        </div>
      </Row>
      <Row className="justify-content-center">
        <Button primary onClick={() => handleOrder(id)} className={cx('btn-order')}>
          Xác nhận
        </Button>
      </Row>
      <Row>
        <div className={cx('txt-center')}>Bằng việc thuê xe, bạn đồng ý với </div>
        <div className={cx('d-flex justify-content-center')}>
          <Link className={cx('link-policy')}>quy chế hoạt động</Link>
          <span>và</span>
          <Link className={cx('link-policy')}>chính sách bảo mật</Link>
        </div>
      </Row>
    </Row>
  )
}
export default OrderBooking
