/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCaretDown,
  faLocationCrosshairs,
  faLocationDot,
  faPhone,
  faTicket,
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
import { getAllSuitableVouchers } from '~/apiServices/vouchers/getAllSuitableVoucher'
import Voucher from '~/components/Voucher'
import { Empty } from 'antd'

const cx = classNames.bind(styles)
function TicketModal() {
  console.log('re-render ticket modal')
  const { currentUser} = useSelector((state) => state.user)
  const showTicketModal = useSelector((state) => state.generalModal.buyTicket)
  const { departureDate, arrivalLocation } = useSelector((state) => state.search.searchTicket)
  const { id, type, transactionCode } = showTicketModal
  const [ticketDetail, setTicketDetail] = useState({})
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const inputRef = useRef(null)
  const [isVoucher, setIsVoucher] = useState(false)
  const [total, setTotal] = useState(0)
  const [suitableVoucher, setSuitableVoucher] = useState([])
  const [voucherValue, setVoucherValue] = useState(0)
  const [idVoucher, setIdVoucher] = useState('')
  const [title, setTitle] = useState('Áp dụng voucher')

  useEffect(() => {
    if (ticketDetail.orderInfor?.pricePerTicket) {
      if (type === 'detailOrder') {
        setTotal(Number(ticketDetail.orderInfo.priceTotal.replace('VND', '')))
      }
    }
  }, [id, ticketDetail])

  useEffect(() => {
    if (!type && ticketDetail.priceTicket) {
      setTotal(
        Number(ticketDetail.priceTicket?.replace(/\./g, '').replace(' VND', '')) *
          quantity *
          (1 - (ticketDetail.discountPercentage * 1.0) / 100) -
          voucherValue,
      )
    }
  }, [id, quantity, ticketDetail, voucherValue])

  useEffect(() => {
    setVoucherValue(0)
  }, [quantity])

  useEffect(() => {
    async function fetchAllSuitableVoucher() {
      const data = await getAllSuitableVouchers(
        Number(ticketDetail.priceTicket?.replace(/\./g, '').replace(' VND', '')) *
          quantity *
          (1 - (ticketDetail.discountPercentage * 1.0) / 100) || 0,
      )
      if (data) setSuitableVoucher(data)
    }
    fetchAllSuitableVoucher()
  }, [quantity])

  useEffect(() => {
    setFullName(currentUser.name || '')
    setPhone(currentUser.phoneNumber || '')
  }, [id, currentUser])

  useEffect(() => {
    async function fetchDetailTicket() {
      if (dispatch(checkLoginSession())) {
        let data = {}
        if (type) {
          data = await getDetailTransaction(transactionCode, 'BUS_TRIP_ORDER')
        } else {
          data = await getDetailTicket(id, departureDate, arrivalLocation)
        }
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
        const order = await orderTicket(
          fullName,
          phone,
          id,
          quantity,
          departureDate.split('-').reverse().join('-'),
          arrivalLocation,
          idVoucher,
        )
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
    setQuantity(1)
    setVoucherValue(0)
    setTotal(0)
    setTitle('Áp dụng voucher')
    setIdVoucher('')
    dispatch(setTicketModalVisible({ name: generalModalNames.BUY_TICKET, isOpen: false }))
  }

  const handleApplyVoucher = (id, percent, maxValue) => {
    let value = 0
    const temp =
      Number(ticketDetail.priceTicket?.replace(/\./g, '').replace(' VND', '')) *
      quantity *
      (1 - (ticketDetail.discountPercentage * 1.0) / 100)
    if ((temp * percent) / 100 > Number(parseInt(maxValue.replace(/\./g, '').replace(' VND', '')))) {
      value = parseInt(maxValue.replace(/\./g, '').replace(' VND', ''))
    } else {
      value = (total * percent) / 100
    }
    setTitle(`- ${value.toLocaleString().replace(',','.')} VNĐ`)
    setVoucherValue(value % 1 === 0 ? value : value.toFixed(3))
    setIdVoucher(id)
    setIsVoucher(false)
  }

  return (
    <Modal className={cx('custom-modal')} show={showTicketModal.isOpen} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>{!type ? 'THÔNG TIN ĐƠN HÀNG' : 'CHI TIẾT HOÁ ĐƠN'}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column row-gap-4">
          <div className="d-flex flex-column row-gap-3">
            <p className={cx('title')}>Người đi</p>
            <div className="row row-cols-1 row-cols-lg-2 row-gap-3">
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
            <span className={cx('title')}>Số lượng vé: </span>
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
                      <FontAwesomeIcon style={{ color: 'red', fontSize: '2rem' }} icon={faLocationCrosshairs} />
                    </span>
                    <div className="d-flex flex-column">
                      <span style={{ color: 'red', textAlign: 'center', fontSize: '1.7rem' }}>
                        {ticketDetail.departureTime || ticketDetail.tripInfo?.departureDateTime}
                      </span>
                      <span
                        className="mt-3"
                        style={{ color: 'red', fontWeight: 600, textAlign: 'center', fontSize: '1.7rem' }}
                      >
                        {ticketDetail.busTripInfo?.departureLocation || ticketDetail.tripInfo?.departureLocation}
                      </span>
                    </div>
                  </div>
                  <span>
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '1.7rem' }} />
                  </span>
                  <div className="d-flex flex-column  align-items-center row-gap-4">
                    <span>
                      <FontAwesomeIcon style={{ color: '#008E28', fontSize: '2rem' }} icon={faLocationDot} />
                    </span>
                    <div className="d-flex flex-column">
                      <span style={{ color: '#008E28', textAlign: 'center', fontSize: '1.7rem' }}>
                        {ticketDetail.arrivalTime || ticketDetail.tripInfo?.arrivalDateTime}
                      </span>
                      <span
                        className="mt-3"
                        style={{ color: '#008E28', fontWeight: 600, textAlign: 'center', fontSize: '1.7rem' }}
                      >
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
          {type !== 'detailOrder' && (
            <div className="mt-3">
              <div className="mt-3 d-flex justify-content-between pe-4">
                <span className={cx('title')}>Tổng tiền 1 vé</span>
                <span>
                  {(
                    Number(ticketDetail.priceTicket?.replace(/\./g, '').replace(' VND', '')) *
                    (1 - (ticketDetail.discountPercentage * 1.0) / 100)
                  )
                    .toLocaleString()
                    .replace(',', '.') + ' VNĐ'}
                </span>
              </div>
            </div>
          )}

          {type !== 'detailOrder' && (
            <div className="mt-1">
              <div className="d-flex justify-content-between pe-4">
                <div className="d-flex row-gap-2">
                  <FontAwesomeIcon icon={faTicket} style={{ color: 'var(--primary-color)', marginRight: '6px' }} />
                  <span className={cx('title')} style={{ color: 'var(--primary-color)' }}>
                    Safety Voucher
                  </span>
                </div>
                <button onClick={() => setIsVoucher((prev) => !prev)} style={{ color: 'var(--primary-color)' }}>
                  {title}
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ rotate: isVoucher ? '-180deg' : '0deg', transition: 'rotate .2s ease', marginLeft: '6px' }}
                  />
                </button>
              </div>
            </div>
          )}

          {isVoucher &&
            suitableVoucher.map((voucher) => (
              <div className="col mt-0" key={voucher.id}>
                <Voucher className="m-auto" data={voucher} type="order" handleApplyVoucher={handleApplyVoucher}/>
              </div>
            ))}
          {isVoucher && suitableVoucher.length === 0 && <Empty description="Không có voucher nào hợp lệ để sử dùng" />}
          <div className="mt-3">
            <span className={cx('title')}>Chi tiết thanh toán</span>
            <div className="p-4 pb-2">
              <div className="d-flex justify-content-between mb-4">
                <span>Tiền vé xe:</span>
                {type !== 'detailOrder' ? (
                  <span>
                    {(
                      Number(ticketDetail.priceTicket?.replace(/\./g, '').replace(' VND', '')) *
                      (1 - (ticketDetail.discountPercentage * 1.0) / 100)
                    )
                      .toLocaleString()
                      .replace(',', '.') + ' VNĐ'}
                  </span>
                ) : (
                  <span>
                    {(
                      Number(ticketDetail.orderInfo?.pricePerTicket?.replace(/\./g, '').replace(' VND', '')) *
                      (1 - (ticketDetail.orderInfo?.discountPercentage * 1.0) / 100)
                    )
                      .toLocaleString()
                      .replace(',', '.') + ' VNĐ'}
                  </span>
                )}
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Số lượng:</span>
                <span>{type === 'detailOrder' ? ticketDetail.orderInfo?.numberOfTicket : quantity}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Voucher giảm giá:</span>
                <span className={cx('sale-off')}>
                  {type !== 'detailOrder'
                    ? `- ${voucherValue.toLocaleString().replace(',', '.')} VNĐ`
                    : `- ${ticketDetail.orderInfo?.voucherValue.toLocaleString().replace(',', '.')}` || `-0 VNĐ`}
                </span>
              </div>
            </div>

            <div className={cx('line', 'mb-4')}></div>

            <div className={cx('d-flex', 'justify-content-between')}>
              <span className={type ? '' : '"fw-medium"'}>
                {type ? 'Tổng tiền đã thanh toán' : 'Tổng tiền cần thanh toán'}
              </span>
              <span className="fw-bold">
                {total !== 0 ? `${total?.toLocaleString().toLocaleString().replace(',', '.')} VNĐ` : `${total} VND`}
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

            {type && ticketDetail.cancelTime && (
              <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                <span>Thời gian huỷ vé: </span>
                <span style={{ color: 'red' }}>{ticketDetail.cancelTime}</span>
              </div>
            )}

            {!type && (
              <Button text className={cx('m-auto', 'mt-5', 'btn-pay')} disabled={!isValid} onClick={handlePayment}>
                Thanh toán
              </Button>
            )}

            {!type && (
              <div className="mt-5">
                <div className={cx('warning')} style={{ textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faWarning} className="me-3" style={{ fontSize: '2rem' }} />
                  Vé xe chỉ được huỷ trước ít nhất 12 tiếng khi bắt đầu khởi hành.
                </div>
              </div>
            )}
            <span></span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default TicketModal
