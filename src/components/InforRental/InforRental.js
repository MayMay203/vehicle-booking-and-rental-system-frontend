import Button from '~/components/Button'
import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './InforRental.module.scss'
import classNames from 'classnames/bind'
import Form from 'react-bootstrap/Form'
// import { useNavigate } from 'react-router-dom'
// import VoucherSlider from '../Voucher/VoucherSlider'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import RentalOrder from '~/pages/RentalPage/RentalOrder'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { calculateRentalPrice } from '~/apiServices/user/calculateRentalPrice'
import VoucherSlider from '../Voucher/VoucherSlider'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllVouchersForUser, fetchAllVouchersInSystem } from '~/redux/slices/voucherSlice'
const cx = classNames.bind(styles)
function InforRental({ typeService, inforVehicleRental, newPrice, startDateTime, endDateTime }) {
  // const listVoucher = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  // const [startTime, setStartTime] = useState(new Date())
  // const [endTime, setEndTime] = useState(new Date())
  // const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(new Date())
  const dispatch = useDispatch()
  const { isLogin, currentUser } = useSelector((state) => state.user)
  const [modalOrderShow, setModalOrderShow] = useState(false)
  const [type, setType] = useState('')
  const [priceRental, setPriceRental] = useState(0)
  const { voucherUser } = useSelector((state) => state.voucher)
  const [formData, setFormData] = useState({
    start_rental_time: startDateTime.startDT,
    // startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
    // ' ' +
    // (`0${startDate.getDate()}`.slice(-2) + // Ngày có 2 chữ số
    //   '-' +
    //   `0${startDate.getMonth() + 1}`.slice(-2) + // Tháng có 2 chữ số
    //   '-' +
    //   startDate.getFullYear()),
    end_rental_time: endDateTime.endDT,
    // endTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
    // ' ' +
    // (`0${endDate.getDate()}`.slice(-2) + // Ngày có 2 chữ số
    //   '-' +
    //   `0${endDate.getMonth() + 1}`.slice(-2) + // Tháng có 2 chữ số
    //   '-' +
    //   endDate.getFullYear()),
    pickup_location: inforVehicleRental?.location,
    total: 0,
    status: 'confirmed',
    voucher_value: 0,
    voucher_percentage: 0,
    amount: 1,
    car_deposit: inforVehicleRental?.car_deposit,
    reservation_fee: inforVehicleRental?.reservation_fees,
    // price: inforVehicleRental?.price,
    price: priceRental,
    vehicle_rental_service_id: inforVehicleRental?.vehicle_rental_service_id,
    customerName: currentUser.name,
    customerPhoneNumber: currentUser.phoneNumber,
    account_id: currentUser.id,
    voucherId: '',
  })
  console.log('endDatatime ---4---', endDateTime)
  console.log('startDatatime ---- 4----', startDateTime)
  // useEffect(() => {
  //   if (startDateTime?.startDT) {
  //     setStartDate(startDateTime?.startDate)
  //     setStartTime(startDateTime?.startTime)
  //     console.log('startDateTime?.startDate ---- 4----', startDateTime?.startDate)
  //     // setStartTime(startDateTime?.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))
  //   }
  //   if (endDateTime?.endDT) {
  //     setEndDate(endDateTime?.endDate)
  //     setEndTime(endDateTime?.endTime)
  //     console.log('endDateTime?.endTime ---- 4----', endDateTime?.endTime)
  //   }
  // }, [])
  useEffect(() => {
    const fetchRentalPrice = async () => {
      try {
        const response = await calculateRentalPrice(startDateTime.startDT, endDateTime.endDT, newPrice)
        console.log('setPriceRental', response)
        setPriceRental(response) // Cập nhật giá trị giá thuê
        setFormData((prevFormData) => ({
          ...prevFormData,
          price: response, // Cập nhật formData với giá trị mới
        }))
      } catch (error) {
        console.error('Error fetching rental price:', error)
      }
    }

    // Gọi hàm async
    fetchRentalPrice()
  }, [newPrice, startDateTime.startDT, endDateTime.endDT])
  useEffect(() => {
    if (inforVehicleRental) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pickup_location: inforVehicleRental.location,
        car_deposit: inforVehicleRental.car_deposit,
        reservation_fee: inforVehicleRental.reservation_fees,
        // price: inforVehicleRental.amount,
        vehicle_rental_service_id: inforVehicleRental?.vehicle_rental_service_id,
      }))
    }
  }, [inforVehicleRental])

  // const navigate = useNavigate()
  const handleOrder = (type) => {
    if (isLogin) {
      // navigate('/rent-vehicle/rental-service/rental-service-detail/rental-order', {
      //   state: { typeService: type, formData: formData },
      // })
      setModalOrderShow(true)
      setType(type)
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
  }

  useEffect(() => {
    if (isLogin && dispatch(checkLoginSession())) {
      dispatch(fetchAllVouchersForUser())
    } else {
      dispatch(fetchAllVouchersInSystem())
    }
  }, [dispatch, isLogin])

  return (
    <div className="p-0">
      <div className={cx('datetime-rental')}>
        <div className={cx('txt-title')}>Thời gian thuê</div>
        <div className={cx('content-datetime-rental', 'd-flex', 'align-items-center')}>
          <span className={cx('txt-datetime')}>Thời gian nhận:</span>
          <div className={cx('d-flex', 'align-items-center', 'date-time')}>
            <div className={cx('time-rental', 'justify-content-end')}>
              <DatePicker
                defaultValue={startDateTime?.startTime ? dayjs(startDateTime.startTime, 'HH:mm') : null}
                disabled
                picker="time"
                format="HH:mm"
                showNow={false}
              />
            </div>

            <div className={cx('date-rental')}>
              <DatePicker
                disabled
                defaultValue={startDateTime?.startDate ? dayjs(startDateTime?.startDate, 'DD-MM-YYYY') : null}
                format="DD-MM-YYYY"
                className="content-calendar"
              />
            </div>
          </div>
        </div>
        <div className={cx('content-datetime-rental', 'd-flex', 'align-items-center')}>
          <span className={cx('txt-datetime', 'mb-3')}>Thời gian trả: </span>
          <div className={cx('d-flex', 'align-items-center', 'date-time', 'mb-3')}>
            <div className={cx('time-rental')}>
              <DatePicker
                defaultValue={endDateTime.endTime ? dayjs(endDateTime.endTime, 'HH:mm') : null}
                disabled
                picker="time"
                format="HH:mm"
                showNow={false}
              />
            </div>

            <div className={cx('date-rental')}>
              <DatePicker
                disabled
                defaultValue={endDateTime?.endDate ? dayjs(endDateTime.endDate, 'DD-MM-YYYY') : null}
                picker="date"
                showNow={false}
                format="DD-MM-YYYY"
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
          {Array.from({ length: inforVehicleRental?.amount }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className={cx('txt-title', 'd-flex')}>
        <span>Phí thuê/1 chiếc</span>
        <span className={cx('charge', 'align-right')}>{Math.floor(priceRental).toLocaleString('vi-VN')} đ</span>
        {/* <span className={cx('charge', 'align-right')}>{inforVehicleRental?.amount?.toLocaleString('vi-VN')} đ</span> */}
      </div>
      <div className={cx('txt-title', 'd-flex')}>
        <span>Mã giảm giá</span>
      </div>
      <div className={cx('wrap-voucher')}>
        <VoucherSlider listVoucher={voucherUser}></VoucherSlider>
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
      <RentalOrder
        typeService={type}
        formData={formData}
        setFormData={setFormData}
        show={modalOrderShow}
        onHide={() => setModalOrderShow(false)}
      />
    </div>
  )
}
export default InforRental
