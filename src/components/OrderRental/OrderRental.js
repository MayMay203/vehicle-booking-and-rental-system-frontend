import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faLocationDot, faPhone, faUserLarge } from "@fortawesome/free-solid-svg-icons"
import { Col, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import styles from "./OrderRental.module.scss"
import Button from '~/components/Button'
const cx = classNames.bind(styles)
function OrderRental({ typeService }) {
  const navigate = useNavigate()
  const handleOrder = (type) => {
    navigate('/rent-vehicle/rental-service/rental-service-detail/rental-order', { state: { typeService: type } })
  }
  return (
    <Row className={cx('order', 'm-0')}>
      <Row className={cx('txt')}>THÔNG TIN ĐƠN HÀNG</Row>
      <Row>
        <Row className={cx('txt-title')}>Người đặt</Row>
        <Row className={cx('xs-col-2', 'wrap-renter')}>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center', 'box-renter')}>
              <FontAwesomeIcon icon={faUserLarge} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <p className={cx('name')}>Họ và tên</p>
                <p className={cx('input-name')}>Ngô Thị Lan Hương</p>
              </div>
            </div>
          </Col>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center', 'box-renter')}>
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
        <Row className={cx('txt-title')}>Thời gian thuê</Row>
        <Row className={cx('xs-col-2', 'wrap-time-rental')}>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center')}>
              <FontAwesomeIcon icon={faCalendar} className={cx('icon')}></FontAwesomeIcon>
              <div>
                <span className={cx('txt-title')}>Từ:</span>
                <span className={cx('txt-content')}>13h00, 12/08/2024</span>
              </div>
            </div>
          </Col>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center')}>
              <div>
                <span className={cx('txt-title')}>Đến:</span>
                <span className={cx('txt-content')}>17h00, 21/08/2024</span>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <Row className={cx('txt-title')}>Địa điểm nhận xe</Row>
        <Row className={cx('xs-col-2', 'wrap-time-rental')}>
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
          <span>Số lượng thuê</span>
          <span className={cx('align-right', 'txt-black')}>3</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Phí thuê 1 chiếc</span>
          <span className={cx('align-right')}>500.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Giảm giá</span>
          <span className={cx('align-right', 'txt-red')}>-0đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Thuế VAT:</span>
          <span className={cx('align-right')}>200.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Tiền cọc xe:</span>
          <span className={cx('align-right')}>6.000.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor', 'line')}>
          <span>Phí giữ chỗ:</span>
          <span className={cx('align-right')}>200.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor', 'no-line')}>
          <span>Tổng tiền:</span>
          <span className={cx('align-right', 'txt-bold')}>7.900.000đ</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-note')}>
          <span className={cx('note')}>Lưu ý:</span>
          <span className={cx('note-content')}>
            Mọi tiền bạn đã thanh toán sẽ được hoàn trả 100% nếu chủ xe hủy đơn và hệ thống sẽ đánh giá xe 1 sao.
          </span>
        </div>
      </Row>
      <Row className="justify-content-center">
        <Button primary onClick={() => handleOrder(typeService)} className={cx('btn-order')}>
          Thuê xe
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
export default OrderRental