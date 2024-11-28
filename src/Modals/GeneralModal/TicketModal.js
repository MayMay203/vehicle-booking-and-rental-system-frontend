/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faLocationCrosshairs,
  faLocationDot,
  faPhone,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import Button from '~/components/Button'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setTicketModalVisible } from '~/redux/slices/generalModalSlice'
import { getDetailTicket } from '~/apiServices/ticket/getDetailTicket'
import { orderTicket } from '~/apiServices/ticket/orderTicket'
import { createPayment } from '~/apiServices/ticket/createPayment'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getDetailTransaction } from '~/apiServices/order/getDetailTransaction'

const cx = classNames.bind(styles)
function TicketModal() {
  console.log('re-render ticket modal')
  const { currentUser } = useSelector((state) => state.user)
  const showTicketModal = useSelector((state) => state.generalModal.buyTicket)
  const { departureDate } = useSelector((state) => state.search.searchTicket)
  const { id, type, transactionCode } = showTicketModal
  const [ticketDetail, setTicketDetail] = useState({})
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const inputRef = useRef(null)

  useEffect(() => {
    setFullName(currentUser.name || '')
    setPhone(currentUser.phoneNumber || '')
  }, [id, currentUser])

  useEffect(() => {
    async function fetchDetailTicket() {
      if (dispatch(checkLoginSession())) {
        let data = {}
        if (type) {
          console.log(transactionCode)
          data = await getDetailTransaction(transactionCode, 'BUS_TRIP_ORDER')
        } else {
          data = await getDetailTicket(id)
        }
        console.log(data)
        if (data) {
          setTicketDetail(data)
        }
      }
    }
    if (id || transactionCode) {
      fetchDetailTicket()
      inputRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, transactionCode])

  useEffect(() => {
    const phonePattern = /^[0-9]{10}$/
    setIsValid(phonePattern.test(phone) && phone)
  }, [phone, fullName])

  const handlePayment = async () => {
    try {
      if (dispatch(checkLoginSession())) {
        const order = await orderTicket(fullName, phone, id, quantity, '24-11-2024')
        if (order) {
          const key = order.keyOrder
          const paymentUrl = await createPayment(key)
          if (paymentUrl) {
            window.location.href = paymentUrl
          }
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Thanh toán thất bại. Vui lòng thử lại!')
    }
  }

  const handleClose = () => {
    setFullName('')
    setPhone('')
    setQuantity(1)
    dispatch(setTicketModalVisible({ name: generalModalNames.BUY_TICKET, isOpen: false }))
  }

  return (
    <Modal className={cx('custom-modal')} show={showTicketModal.isOpen} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>{!type ? 'THÔNG TIN ĐƠN HÀNG' : 'CHI TIẾT HOÁ ĐƠN'}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column row-gap-4">
          <div className="d-flex flex-column row-gap-3">
            <p className={cx('title')}>Người đi</p>
            <div className="row row-cols-1 row-gap-3">
              <div className="col">
                <div className={cx('input-wrapper')}>
                  <span>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                  </span>
                  <div className={cx('info')}>
                    <label className={cx('label', 'mb-3', 'w-100')}>
                      Họ và tên <span style={{ color: 'red' }}>*</span>
                    </label>
                    {type === 'detailOrder' ? (
                      <span>{ticketDetail.customerInfo?.name}</span>
                    ) : (
                      <input
                        ref={inputRef}
                        value={fullName}
                        className={cx('input-text', 'w-100')}
                        type="text"
                        required
                        placeholder="Nhập họ và tên"
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="off"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className={cx('input-wrapper')}>
                  <span>
                    <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                  </span>
                  <div className={cx('info')}>
                    <label htmlFor="phone" className={cx('label', 'mb-3', 'w-100')}>
                      Số điện thoại <span style={{ color: 'red' }}>*</span>
                    </label>
                    {type === 'detailOrder' ? (
                      <span>{ticketDetail.customerInfo?.phoneNumber}</span>
                    ) : (
                      <input
                        id="phone"
                        className={cx('input-text', 'w-100')}
                        type="text"
                        pattern="[0-9]{10}"
                        required
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="off"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {type === 'detailOrder' && (
            <div className="d-flex flex-column row-gap-4">
              <p className={cx('title')}>Thời gian mua vé</p>
              <div className="d-flex column-gap-3 align-items-center ps-3">
                <span>
                  <FontAwesomeIcon className={cx('icon')} icon={faCalendar} />
                </span>
                <span>{ticketDetail.orderInfo?.orderDate}</span>
              </div>
            </div>
          )}

          <div className="mt-2">
            <span className={cx('title')}>Số lượng vé:</span>
            {type === 'detailOrder' ? (
              <span>{ticketDetail.orderInfo?.numberOfTicket}</span>
            ) : (
              <input
                className="px-2 ms-3"
                style={{ width: '60px' }}
                type="number"
                value={quantity === undefined || quantity === null ? '' : quantity}
                min={1}
                max={ticketDetail.availableSeats}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '') {
                    setQuantity('')
                  } else {
                    const validValue =
                      value < 1 ? 1 : value > ticketDetail.availableSeats ? ticketDetail.availableSeats : value
                    setQuantity(validValue)
                  }
                }}
              ></input>
            )}
          </div>

          <div className="d-flex flex-column row-gap-3 mt-2">
            <p className={cx('title')}>Hành trình:</p>
            <div className="px-4 pt-2 pb-0">
              <div className="d-flex justify-content-between">
                <span>Thời gian bắt đầu:</span>
                {type === 'detailOrder' ? (
                  <span className="ms-2">{`${ticketDetail.tripInfo?.departureDateTime}`}</span>
                ) : (
                  <span className="ms-2">{`${departureDate.split('-').reverse().join('-')}`}</span>
                )}
              </div>
              <div className="mt-3 d-flex flex-column">
                <span style={{ textAlign: 'left' }}>Tuyến đường:</span>
                <div className="d-flex column-gap-5 align-items-center justify-content-center mt-5">
                  <div className="d-flex flex-column align-items-center row-gap-4">
                    <span>
                      <FontAwesomeIcon style={{ color: 'red', fontSize: '1.8rem' }} icon={faLocationCrosshairs} />
                    </span>
                    <div className="d-flex flex-column">
                      <span style={{ color: 'red', textAlign: 'center' }}>
                        {ticketDetail.departureTime || ticketDetail.tripInfo?.departureDateTime}
                      </span>
                      <span className="mt-3" style={{ color: 'red', fontWeight: 600, textAlign: 'center' }}>
                        {ticketDetail.busTripInfo?.departureLocation || ticketDetail.tripInfo?.departureLocation}
                      </span>
                    </div>
                  </div>
                  <span>
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.8rem' }} />
                  </span>
                  <div className="d-flex flex-column  align-items-center row-gap-4">
                    <span>
                      <FontAwesomeIcon style={{ color: '#008E28', fontSize: '1.8rem' }} icon={faLocationDot} />
                    </span>
                    <div className="d-flex flex-column">
                      <span style={{ color: '#008E28', textAlign: 'center' }}>
                        {ticketDetail.arrivalTime || ticketDetail.tripInfo?.arrivalDateTime}
                      </span>
                      <span className="mt-3" style={{ color: '#008E28', fontWeight: 600, textAlign: 'center' }}>
                        {ticketDetail.busTripInfo?.arrivalLocation || ticketDetail.tripInfo?.arrivalLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <span className={cx('title')}>Thông tin xe</span>
            <div className="px-4 pt-2 pb-0">
              <div className="mt-3 d-flex justify-content-between">
                <span>Nhà xe:</span>
                <span className="ms-2">{ticketDetail.businessPartnerInfo?.name}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <span>Biển số xe:</span>
                <span className="ms-2">{ticketDetail.busInfo?.licensePlate}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <span>Loại xe đặt:</span>
                <span className="ms-2">{ticketDetail.busInfo?.nameBusType || ticketDetail.busInfo?.busType.name}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <span>Số lượng ghế:</span>
                <span className="ms-2">{ticketDetail.busInfo?.busType?.numberOfSeat}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <span>Loại ghế:</span>
                <span className="ms-2">{ticketDetail.busInfo?.busType?.chairType}</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <span className={cx('title')}>Chi tiết thanh toán</span>
            <div className="p-4 pb-2">
              <div className="d-flex justify-content-between mb-4">
                <span>Tiền vé xe:</span>
                <span>{ticketDetail.priceTicket || ticketDetail.orderInfo?.pricePerTicket}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Số lượng:</span>
                <span>{type === 'detailOrder' ? ticketDetail.orderInfo?.numberOfTicket : quantity}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Giảm giá:</span>
                <span className={cx('sale-off')}>{`-${Math.round(
                  type === 'detailOrder'
                    ? ticketDetail.orderInfo?.discountPercentage
                    : ticketDetail.discountPercentage || 0,
                )}%`}</span>
              </div>

              <div className={cx('line', 'mb-4')}></div>

              <div className={cx('d-flex', 'justify-content-between')}>
                <span className={type ? '' : '"fw-medium"'}>
                  {type ? 'Tổng tiền đã thanh toán' : 'Tổng tiền cần thanh toán'}
                </span>
                <span className="fw-bold">
                  {type === 'detailOrder'
                    ? `${(
                        Number(ticketDetail.orderInfo?.pricePerTicket?.replace(/\./g, '').replace(' VND', '')) *
                        ticketDetail.orderInfo?.numberOfTicket *
                        (1 - (ticketDetail.orderInfo?.discountPercentage * 1.0) / 100)
                      ).toLocaleString()} VNĐ`
                    : `${(
                        Number(ticketDetail.priceTicket?.replace(/\./g, '').replace(' VND', '')) *
                        quantity *
                        (1 - (ticketDetail.discountPercentage * 1.0) / 100)
                      ).toLocaleString()} VNĐ`}
                </span>
              </div>

              {type && (
                <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                  <span>Phương thức thanh toán: </span>
                  <span>Qua tài khoản</span>
                </div>
              )}

              {type && (
                <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                  <span>Thời gian thanh toán: </span>
                  <span>{ticketDetail.orderInfo?.orderDate}</span>
                </div>
              )}

              {/* {type && (
                <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                  <span>Thời gian hoàn thành: </span>
                  <span>15-09-2024 10:30</span>
                </div>
              )} */}

              {!type && (
                <Button text className={cx('m-auto', 'mt-5', 'btn-pay')} disabled={!isValid} onClick={handlePayment}>
                  Thanh toán
                </Button>
              )}

              {!type && (
                <div className="mt-5">
                  <div className={cx('warning')}>
                    <FontAwesomeIcon icon={faWarning} className="me-3" style={{ fontSize: '2rem' }} />
                    Vé xe chỉ được huỷ trước 2h khi bắt đầu khởi hành.
                  </div>
                </div>
              )}
              <span></span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default TicketModal
