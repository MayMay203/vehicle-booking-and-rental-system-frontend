import Button from '~/components/Button'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './InforRental.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import VoucherSlider from '../Voucher/VoucherSlider'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
const cx = classNames.bind(styles)
function InforRental({ typeService, inforVehicleRental }) {
  const listVoucher = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const dispatch = useDispatch()
  const { isLogin, currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    start_rental_time:
      startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
      ' ' +
      (`0${startDate.getDate()}`.slice(-2) + // Ngày có 2 chữ số
        '-' +
        `0${startDate.getMonth() + 1}`.slice(-2) + // Tháng có 2 chữ số
        '-' +
        startDate.getFullYear()),
    end_rental_time:
      endTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
      ' ' +
      (`0${endDate.getDate()}`.slice(-2) + // Ngày có 2 chữ số
        '-' +
        `0${endDate.getMonth() + 1}`.slice(-2) + // Tháng có 2 chữ số
        '-' +
        endDate.getFullYear()),
    pickup_location: '',
    total: 350000,
    status: '',
    voucher_value: 20.0,
    voucher_percentage: 10.0,
    amount: 1,
    car_deposit: inforVehicleRental?.car_deposit,
    reservation_fee: inforVehicleRental?.reservation_fees,
    price: inforVehicleRental?.amount,
    vehicle_rental_service_id: 3,
    customerName: currentUser.name,
    customerPhoneNumber: currentUser.phoneNumber,
    account_id: 3,
  })
  const navigate = useNavigate()
  const handleOrder = (type) => {
    if (isLogin) {
      navigate('/rent-vehicle/rental-service/rental-service-detail/rental-order', {
        state: { typeService: type, formData: formData },
      })
    } else {
      //gọi modal đăng nhập
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(formData)
  }

  return (
    <div className="p-0">
      <div className={cx('datetime-rental')}>
        <div className={cx('txt-title')}>Thời gian thuê</div>
        <div className={cx('content-datetime-rental', 'd-flex', 'align-items-center')}>
          <span className={cx('txt-datetime')}>Thời gian nhận:</span>
          <div className={cx('d-flex', 'align-items-center', 'date-time')}>
            <div className={cx('time-rental', 'justify-content-end')}>
              <span className={cx('content-clock', 'txt-datetime')}>
                {startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<FontAwesomeIcon icon={faClock} className={cx('', 'btn-clock')} />}
              />
            </div>

            <div className={cx('date-rental')}>
              <span className={cx('', 'content-calendar', 'txt-datetime')}>
                {startDate.toLocaleDateString('vi-VN')}
              </span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                customInput={<FontAwesomeIcon icon={faCalendarDays} className={cx('', 'btn-calendar')} />}
                calendarClassName={cx('datetime-picker')}
              />
            </div>
          </div>
        </div>
        <div className={cx('content-datetime-rental', 'd-flex', 'align-items-center')}>
          <span className={cx('txt-datetime')}>Thời gian trả: </span>
          <div className={cx('d-flex', 'align-items-center', 'date-time')}>
            <div className={cx('time-rental')}>
              <span className={cx('', 'content-clock', 'txt-datetime')}>
                {endTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<FontAwesomeIcon icon={faClock} className={cx('', 'btn-clock')} />}
              />
            </div>

            <div className={cx('date-rental')}>
              <span className={cx('', 'content-calendar', 'txt-datetime')}>{endDate.toLocaleDateString('vi-VN')}</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                customInput={<FontAwesomeIcon icon={faCalendarDays} className={cx('', 'btn-calendar')} />}
                calendarClassName={cx('datetime-picker')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cx('txt-title', 'amount-rental')}>
        <span>Số lượng thuê</span>
        <Form.Select
          name="amount"
          aria-label="Default select example"
          classNames={cx('select-amount', 'align-right')}
          onChange={handleInputChange}
        >
          {Array.from({ length: inforVehicleRental?.quantity }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className={cx('txt-title', 'd-flex')}>
        <span>Phí thuê/1 chiếc</span>
        <span className={cx('charge', 'align-right')}>{inforVehicleRental?.amount?.toLocaleString('vi-VN')} đ</span>
      </div>
      <div className={cx('txt-title', 'd-flex')}>
        <span>Mã giảm giá</span>
      </div>
      <div className={cx('wrap-voucher')}>
        <VoucherSlider listVoucher={listVoucher}></VoucherSlider>
      </div>
      <div>
        <div className={cx('txt-title')}>Chi phí khác</div>
        {/* <div className={cx('txt-content')}>
          <span>Thuế VAT:</span>
          <span className={cx('align-right')}>200.000đ</span>
        </div> */}
        <div className={cx('txt-content')}>
          <span>Tiền cọc xe:</span>
          <span className={cx('align-right')}>{inforVehicleRental?.car_deposit?.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className={cx('txt-sub-content')}>
          <span>Tiền cọc xe sẽ được hoàn trả sau khi nhận xe và kiểm tra xe.</span>
        </div>
        <div className={cx('txt-content')}>
          <span>Tiền giữ chỗ:</span>
          <span className={cx('align-right')}>{inforVehicleRental?.reservation_fees?.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className={cx('txt-sub-content')}>
          <span>Tiền giữ chỗ sẽ không được hoàn lại nếu huỷ chuyến. Tiền giữ chỗ sẽ được hoàn lại sau khi trả xe.</span>
        </div>
        <div className={cx('d-flex justify-content-center', 'txt-content')}>
          <Button primary onClick={() => handleOrder(typeService)}>
            Thuê xe
          </Button>
        </div>
      </div>
    </div>
  )
}
export default InforRental
