import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faLocationCrosshairs, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import Button from '~/components/Button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setTicketModalVisible } from '~/redux/slices/generalModalSlice'

const cx = classNames.bind(styles)
function TicketModal() {
  console.log('re-render ticket modal')
  const showTicketModal = useSelector((state) => state.generalModal.buyTicket)
  const { type } = showTicketModal
  const dispatch = useDispatch()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const phonePattern = /^[0-9]{10}$/
    setIsValid(phonePattern.test(phone) && phone)
  }, [phone, fullName])

  const handlePayment = () => {
    toast.success('Đặt vé thành công! Hãy chuẩn bị cho chuyến đi của bạn.')
  }

  const handleClose = () => {
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
            <p className={cx('title')}>Người đặt</p>
            <div className="row row-cols-1 row-gap-3">
              <div className="col">
                <div className={cx('input-wrapper')}>
                  <span>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                  </span>
                  <div className={cx('info')}>
                    <label className={cx('label', 'mb-3', 'w-100')}>Họ và tên</label>
                    {type === 'detailOrder' ? (
                      <span>Lê Thị Hồng Nhung</span>
                    ) : (
                      <input
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
                      Số điện thoại
                    </label>
                    {type === 'detailOrder' ? (
                      <span>0986564453</span>
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

          <div className="d-flex flex-column row-gap-4">
            <p className={cx('title')}>Thời gian mua vé</p>
            <div className="d-flex column-gap-3 align-items-center ps-3">
              <span>
                <FontAwesomeIcon className={cx('icon')} icon={faCalendar} />
              </span>
              <span>12:00 ngày 12-09-2024</span>
            </div>
          </div>

          <div className="d-flex flex-column row-gap-3 mt-2">
            <p className={cx('title', 'mb-2')}>
              Hành trình: <span className="fw-light">Từ 15-09-2024</span>{' '}
            </p>
            <div className="d-flex column-gap-5 align-items-center justify-content-center ps-3">
              <div className="d-flex flex-column align-items-center row-gap-4">
                <span>
                  <FontAwesomeIcon className={cx('icon')} icon={faLocationCrosshairs} />
                </span>
                <span>9:00 - Hà Nội</span>
              </div>
              <span>
                <FontAwesomeIcon className={cx('icon')} icon={faArrowRight} />
              </span>
              <div className="d-flex flex-column  align-items-center row-gap-3">
                <span>
                  <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                </span>
                <span>10h30 - Hải Phòng</span>
              </div>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-between">
            <span className={cx('title')}>Loại xe đặt:</span>
            <span className="ms-2">Xe khách 24 chỗ</span>
          </div>

          <div className="mt-3">
            <span className={cx('title')}>Chi tiết thanh toán</span>
            <div className="p-4">
              <div className="d-flex justify-content-between mb-4">
                <span>Tiền vé xe</span>
                <span>100.000đ</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Số lượng</span>
                <span>2</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Giảm giá</span>
                <span className={cx('sale-off')}>-20.000đ</span>
              </div>

              <div className={cx('line', 'mb-4')}></div>

              <div className={cx('d-flex', 'justify-content-between')}>
                <span className={type ? '' : '"fw-medium"'}>
                  {type ? 'Tổng tiền đã thanh toán' : 'Tổng tiền cần thanh toán'}
                </span>
                <span className="fw-bold">180.000đ</span>
              </div>

              {type && (
                <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                  <span>Phương thức thanh toán: </span>
                  <span>Ngân hàng BIDV</span>
                </div>
              )}

              {type && (
                <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                  <span>Thời gian thanh toán: </span>
                  <span>13-09-2024 12:03</span>
                </div>
              )}

              {type && (
                <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                  <span>Thời gian hoàn thành: </span>
                  <span>15-09-2024 10:30</span>
                </div>
              )}

              {!type && (
                <Button text className={cx('m-auto', 'mt-5', 'btn-pay')} disabled={!isValid} onClick={handlePayment}>
                  Thanh toán
                </Button>
              )}

              {!type && (
                <p className={cx('rule')}>
                  Bằng việc xác nhận thanh toán, bạn đã đồng ý với tất cả chính sách chuyến xe yêu cầu.
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default TicketModal
