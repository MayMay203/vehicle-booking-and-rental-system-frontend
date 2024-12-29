import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCaretDown, faLocationDot, faPhone, faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './OrderRental.module.scss'
import Button from '~/components/Button'
import { useEffect, useState } from 'react'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { orderVehicleRental } from '~/apiServices/user/orderVehicleRental'
import { createPayment } from '~/apiServices/ticket/createPayment'
import { toast } from 'react-toastify'
import { Empty } from 'antd'
import { getAllSuitableVouchers } from '~/apiServices/vouchers/getAllSuitableVoucher'
import SlideVoucherOrder from '../Voucher/SlideVoucherOrder'
const cx = classNames.bind(styles)
function OrderRental({ typeService, formData, setFormData }) {
  const dispatch = useDispatch()
  const [isVoucher, setIsVoucher] = useState(false)
  const [suitableVoucher, setSuitableVoucher] = useState([])
  const { isLogin } = useSelector((state) => state.user)
  const [voucherDiscount, setVoucherDiscount] = useState('')
  const [warningMessagePhone, setWarningMessagePhone] = useState(
    formData.customerName ? '' : 'Vui lòng nhập số điện thoại!',
  )
  const [warningMessageName, setWarningMessageName] = useState(
    formData.customerPhoneNumber ? '' : 'Vui lòng nhập tên người thuê xe!',
  )
  // const total =
  //   Math.floor(formData.price) * formData.amount +
  //   formData.reservation_fee +
  //   formData.car_deposit -
  //   formData.voucher_percentage * Math.floor(formData.price) * formData.amount -
  //   formData.voucher_value
  const total =
    Math.floor(formData.price) * formData.amount + formData.reservation_fee + formData.car_deposit - voucherDiscount
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    if (name === 'customerName') {
      setWarningMessageName(value.trim() ? '' : 'Vui lòng nhập tên người thuê xe!')
    } else if (name === 'customerPhoneNumber') {
      setWarningMessagePhone(value.length === 10 ? '' : 'Số điện thoại phải có đủ 10 chữ số')
    }
  }
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      total: total,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      voucher_value: voucherDiscount,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucherDiscount])
  //  const handleOrder = (type) => {
  //   navigate('/rent-vehicle/rental-service/rental-service-detail/rental-order', { state: { typeService: type } })
  // }
  const handleOrder = async () => {
    try {
      if (dispatch(checkLoginSession())) {
        if (formData.voucherId === '') {
          const { voucherId, ...newFormData } = formData
          formData = newFormData
        }

        console.log('--formData:-----idvoucher:---', formData)
        const order = await orderVehicleRental(formData)
        if (order) {
          const key = order.keyOrder
          if (key) {
            const paymentUrl = await createPayment(key)
            if (paymentUrl) {
              window.location.href = paymentUrl
            } else {
              toast.error('Thanh toán thất bại. Vui lòng thử lại!')
            }
          } else {
            toast.error('Thanh toán thất bại. Vui lòng thử lại!')
          }
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Thanh toán thất bại. Vui lòng thử lại!')
    }
  }

  useEffect(() => {
    async function fetchAllSuitableVoucher() {
      if (dispatch(checkLoginSession())) {
        const data = await getAllSuitableVouchers(formData.amount * formData.price)
        if (data) setSuitableVoucher(data)
      }
    }
    if (isLogin) fetchAllSuitableVoucher()
  }, [formData, isLogin, dispatch])
  // useEffect(() => { setFormData((prevState) => ({
  //   ...prevState,
  //   [name]: value,
  // }))}, [voucherDiscount])
  const handleApplyVoucher = (id, percent, maxValue) => {
    console.log(id)
    setFormData((prevState) => ({
      ...prevState,
      voucherId: id,
    }))
    const amount =
      (formData.amount * formData.price * percent) / 100 > Number(maxValue.replace(/\./g, '').replace(' VND', ''))
        ? Number(maxValue.replace(/\./g, '').replace(' VND', ''))
        : (formData.amount * formData.price * percent) / 100
    setVoucherDiscount(Math.round(amount))
    setIsVoucher(false)
  }
  return (
    <Row className={cx('order', 'm-0')}>
      {/* <Row className={cx('txt')}>THÔNG TIN ĐƠN HÀNG</Row> */}
      <Row>
        <Row className={cx('txt-title')}>Người đặt</Row>
        <Row className={cx('xs-col-2', 'wrap-renter')}>
          <Col sm="12" md="6" className={cx()}>
            <div className={cx('d-flex', 'align-items-center', 'box-renter')}>
              <FontAwesomeIcon icon={faUserLarge} className={cx('icon')}></FontAwesomeIcon>
              <div className={cx('wrap-name')}>
                <p className={cx('name')}>Họ và tên</p>
                {/* <p className={cx('input-name')}>Ngô Thị Lan Hương</p> */}
                <Form.Control
                  type="text"
                  name="customerName"
                  aria-label="customerName"
                  placeholder="Nguyễn Văn A"
                  // className={cx('txt')}
                  className={cx('input-name')}
                  value={formData?.customerName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {warningMessageName && <p className={cx('txt-warn')}>{warningMessageName}</p>}
          </Col>
          <Col sm="12" md="6" className={cx()}>
            <div className={cx('d-flex', 'align-items-center', 'box-renter')}>
              <FontAwesomeIcon icon={faPhone} className={cx('icon')}></FontAwesomeIcon>
              <div className={cx('wrap-name')}>
                <p className={cx('phone')}>Số điện thoại</p>
                {/* <p className={cx('input-phone')}>08420598765</p> */}
                <Form.Control
                  type="text"
                  name="customerPhoneNumber"
                  aria-label="customerPhoneNumber"
                  placeholder="xxxxxxxxxx"
                  // className={cx('txt')}
                  className={cx('input-phone')}
                  value={formData?.customerPhoneNumber}
                  onChange={handleInputChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                    if (e.target.value.length > 10) {
                      e.target.value = e.target.value.slice(0, 10)
                    }
                  }}
                />
              </div>
            </div>
            {warningMessagePhone && <p className={cx('txt-warn')}>{warningMessagePhone}</p>}
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
                <span className={cx('txt-content')}>{formData.start_rental_time}</span>
              </div>
            </div>
          </Col>
          <Col className={cx()}>
            <div className={cx('d-flex', 'align-items-center')}>
              <div>
                <span className={cx('txt-title')}>Đến:</span>
                <span className={cx('txt-content')}>{formData.end_rental_time}</span>
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
                <span className={cx('txt-content', 'm-0')}>{formData.pickup_location}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Số lượng thuê</span>
          <span className={cx('align-right', 'txt-black')}>{formData.amount}</span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Phí thuê 1 chiếc</span>
          <span className={cx('align-right')}>
            {/* {formData?.price ? `${formData.price.toLocaleString('vi-VN')} đ` : ''} */}
            {Math.floor(formData?.price).toLocaleString('vi-VN')} đ
          </span>
        </div>
      </Row>
      {/* <Row>
        <div className={cx('wrap-infor')}>
          <span>Giảm giá</span>
          <span className={cx('align-right', 'txt-red')}>-đ</span>
        </div>
      </Row> */}
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Giảm giá voucher</span>
          {/* <span className={cx('align-right', 'txt-red')}>-0đ</span> */}
          <button onClick={() => setIsVoucher((prev) => !prev)} style={{ color: 'var(--primary-color)' }}>
            {voucherDiscount === '' ? 'Áp mã giảm giá' : `-${voucherDiscount.toLocaleString('vi-VN')} đ`}
            <FontAwesomeIcon
              icon={faCaretDown}
              style={{ rotate: isVoucher ? '-180deg' : '0deg', transition: 'rotate .2s ease', marginLeft: '6px' }}
            />
          </button>
        </div>
      </Row>
      {/* {isVoucher &&
        suitableVoucher.map((voucher) => (
          <div className="col mt-0" key={voucher.id}>
            <Voucher className="m-auto" data={voucher} type="order" handleApplyVoucher={handleApplyVoucher} />
          </div>
        ))} */}
      <Row className="justify-content-center">
        {isVoucher && suitableVoucher.length > 0 && (
          <SlideVoucherOrder listVoucher={suitableVoucher} handleApplyVoucher={handleApplyVoucher}></SlideVoucherOrder>
        )}
        {isVoucher && suitableVoucher.length === 0 && <Empty description="Không có voucher nào hợp lệ để sử dùng" />}
      </Row>
      {/* <Row>
        <div className={cx('wrap-infor')}>
          <span>Thuế VAT:</span>
          <span className={cx('align-right')}></span>
        </div>
      </Row> */}
      <Row>
        <div className={cx('wrap-infor')}>
          <span>Tiền cọc xe:</span>
          <span className={cx('align-right')}>
            {formData?.car_deposit ? `${formData.car_deposit.toLocaleString('vi-VN')} đ` : ''}
          </span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor', 'line')}>
          <span>Phí giữ chỗ:</span>
          <span className={cx('align-right')}>
            {formData?.reservation_fee ? `${formData.reservation_fee.toLocaleString('vi-VN')} đ` : ''}
          </span>
        </div>
      </Row>
      <Row>
        <div className={cx('wrap-infor', 'no-line')}>
          <span>Tổng tiền:</span>
          <span className={cx('align-right', 'txt-bold')}>{total.toLocaleString('vi-VN')} đ</span>
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
        <Button
          primary
          onClick={() => handleOrder(typeService)}
          className={cx('btn-order')}
          disabled={
            formData.customerName === '' ||
            formData.customerPhoneNumber === '' ||
            warningMessageName ||
            warningMessagePhone
          }
        >
          Thanh toán
        </Button>
      </Row>
      <Row>
        <div className={cx('txt-center')}>Bằng việc thuê xe, bạn đồng ý với </div>
        <div className={cx('d-flex justify-content-center')}>
          <Link to="/regulation" className={cx('link-policy')}>
            quy chế hoạt động
          </Link>
          <span>&nbsp;và&nbsp;</span>
          <Link to="/policy-security" className={cx('link-policy')}>
            chính sách bảo mật
          </Link>
        </div>
      </Row>
    </Row>
  )
}
export default OrderRental
