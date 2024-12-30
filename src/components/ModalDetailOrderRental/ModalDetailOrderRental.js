import classNames from 'classnames/bind'
import styles from './ModalDetailOrderRental.module.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faPhone, faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getDetailTransaction } from '~/apiServices/order/getDetailTransaction'
import { getVehicleRentalByID } from '~/apiServices/user/getVehicleRentalByID'
import { Link } from 'react-router-dom'
import { config } from '~/config'
const cx = classNames.bind(styles)
function ModalDetailOrderRental({
  transactionCode,
  inforRentalVehicle: inforRentalVehicleProp,
  isNoti = false,
  ...props
}) {
  const dispatch = useDispatch()
  const [inforRentalVehicle, setInforRentalVehicle] = useState(inforRentalVehicleProp)
  const [inforOrder, setInforOrder] = useState({})
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      const getInforOrder = async () => {
        console.log(transactionCode)
        const response = await getDetailTransaction(transactionCode, 'VEHICLE_RENTAL_ORDER')
        console.log(response)
        console.log(inforRentalVehicle)
        if (!inforRentalVehicle) {
          console.log('Vô đây')
          const rentalInfo = await getVehicleRentalByID(response?.rentalInfo?.carRentalServiceId)
          console.log('Rental Infor: ', rentalInfo)
          setInforRentalVehicle(rentalInfo)
        }
        setInforOrder(response)
      }
      if (transactionCode) getInforOrder()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionCode])
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt')}>
          THÔNG TIN ĐƠN HÀNG
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <span className={cx('time-payment')}>Thanh toán lúc: {inforOrder?.createAt}</span>
          <span className={cx('time-payment')}>
            Thuê:{inforRentalVehicle?.vehicle_type + ' '}
            {inforRentalVehicle?.manufacturer}
            {inforRentalVehicle?.type === 0 ? ' tự lái' : ' có người lái'}
          </span>
          <span className={cx('time-payment')}>Địa chỉ nhận xe: {inforRentalVehicle?.location}</span>
        </Row>
        <Row>
          <Row className={cx('txt-title')}>Người đặt</Row>
          <Row className={cx('xs-col-2', 'wrap-renter')}>
            <Col sm="12" md="6" className={cx()}>
              <div className={cx('d-flex', 'align-items-center', 'box-renter')}>
                <FontAwesomeIcon icon={faUserLarge} className={cx('icon')}></FontAwesomeIcon>
                <div>
                  <p className={cx('name')}>Họ và tên</p>
                  <p className={cx('input-name')}>{inforOrder?.customerInfo?.name}</p>
                </div>
              </div>
            </Col>
            <Col sm="12" md="6" className={cx()}>
              <div className={cx('d-flex', 'align-items-center', 'box-renter')}>
                <FontAwesomeIcon icon={faPhone} className={cx('icon')}></FontAwesomeIcon>
                <div>
                  <p className={cx('phone')}>Số điện thoại</p>
                  <p className={cx('input-phone')}>{inforOrder?.customerInfo?.phoneNumber}</p>
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
                  <span className={cx('txt-content')}>{inforOrder?.rentalInfo?.startRentalTime}</span>
                </div>
              </div>
            </Col>
            <Col className={cx()}>
              <div className={cx('d-flex', 'align-items-center')}>
                <div>
                  <span className={cx('txt-title')}>Đến:</span>
                  <span className={cx('txt-content')}>{inforOrder?.rentalInfo?.endRentalTime}</span>
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
                  <span className={cx('txt-content', 'm-0')}>{inforOrder?.rentalInfo?.pickupLocation}</span>
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
            <span className={cx('align-right')}>
              {Math.round(inforOrder?.pricingInfo?.price).toLocaleString('vi-VN')} đ
            </span>
          </div>
        </Row>
        <Row>
          <div className={cx('wrap-infor')}>
            <span>Giảm giá</span>
            <span className={cx('align-right', 'txt-red')}>-0đ</span>
          </div>
        </Row>
        <Row>
          {/* <div className={cx('wrap-infor')}>
            <span>Thuế VAT:</span>
            <span className={cx('align-right')}>{inforOrder?.pricingInfo?.priceTotal.toLocaleString('vi-VN')} đ</span>
          </div> */}
        </Row>
        <Row>
          <div className={cx('wrap-infor')}>
            <span>Tiền cọc xe:</span>
            <span className={cx('align-right')}>{inforOrder?.pricingInfo?.carDeposit.toLocaleString('vi-VN')} đ</span>
          </div>
        </Row>
        <Row>
          <div className={cx('wrap-infor', 'line')}>
            <span>Phí giữ chỗ:</span>
            <span className={cx('align-right')}>
              {inforOrder?.pricingInfo?.reservationFee.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </Row>
        <Row>
          <div className={cx('wrap-infor', 'no-line')}>
            <span>Tổng tiền:</span>
            <span className={cx('align-right', 'txt-bold')}>
              {inforOrder?.pricingInfo?.priceTotal.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </Row>
        {/* <Row>
          <div className={cx('wrap-note')}>
            <span className={cx('note')}>Lưu ý:</span>
            <span className={cx('note-content')}>
              Mọi tiền bạn đã thanh toán sẽ được hoàn trả 100% nếu chủ xe hủy đơn và hệ thống sẽ đánh giá xe 1 sao.
            </span>
          </div>
        </Row> */}
      </Modal.Body>
      <Modal.Footer>
        {!isNoti && (
          <Button onClick={props.onHide} className={cx('btn-confirm')} variant="none">
            Xem đánh giá
          </Button>
        )}
        {isNoti && (
          <Link
            to={config.routes.orderManage}
            onClick={() => props.onHide()}
            style={{ color: 'var(--primary-color)', fontStyle: 'italic', fontSize: '1.8rem', marginTop: '20px' }}
          >
            Tất cả đơn thuê xe
          </Link>
        )}
      </Modal.Footer>
    </Modal>
  )
}
export default ModalDetailOrderRental
