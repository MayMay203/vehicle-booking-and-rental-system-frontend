import classNames from 'classnames/bind'
import styles from './TicketBus.module.scss'
import { Col, Form, Row } from 'react-bootstrap'
import AddManyBreakDay from '../AddManyBreakDay'
import { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { addBusSchedule } from '~/apiServices/busPartner/addBusSchedule'
import { fetchAllBusTrips, fetchAllSchedulesByBusID } from '~/redux/slices/busPartnerSlice'
import moment from 'moment'
const cx = classNames.bind(styles)
function TicketBus({ data, enableEdit = true }) {
  const dispatch = useDispatch()
  const [activeAdd, setActiveAdd] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dataBusTicket, setDataBusTicket] = useState({
    startOperationDay: '',
    discountPercentage: '',
    departureTime: '',
    breakDays: [''],
  })
  const handleReset = () => {
    //chưa reset hết được
    setDataBusTicket({ startOperationDay: '', discountPercentage: '', departureTime: '', breakDays: [''] })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDataBusTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleStartTimeChange = (time) => {
    setStartTime(time)
    setDataBusTicket((prevState) => ({
      ...prevState,
      departureTime: time.format('HH:mm'),
    }))
  }
  const handleStartDateChange = (date) => {
    setStartDate(date)
    setDataBusTicket((prevState) => ({
      ...prevState,
      startOperationDay: date?.format('DD-MM-YYYY'),
    }))
  }
  const setBreakDays = (days) => {
    setDataBusTicket((prevState) => ({
      ...prevState,
      breakDays: days,
    }))
  }
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day') 
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const { breakDays = [], ...restOfDataBusTicket } = dataBusTicket

    // Check if all fields in `data` and `restOfDataBusTicket` are filled
    const allFieldsFilled =
      Object.values(data).every((value) => value?.toString().trim() !== '') &&
      Object.values(restOfDataBusTicket).every((value) => value?.toString().trim() !== '')

    setActiveAdd(allFieldsFilled)
    console.log(
      'Có vô==data:',
      data,
      '---restOfDataBusTicket:',
      restOfDataBusTicket,
      '---allFieldsFilled',
      allFieldsFilled,
    )
  }, [dataBusTicket, data])
  const handleSave = async () => {
    if (dispatch(checkLoginSession())) {
      try {
        const dataPost = {
          busTripId: data.idBusTrip,
          busId: data.licensePlateNumber,
          departureTime: dataBusTicket.departureTime,
          discountPercentage: dataBusTicket.discountPercentage,
          // "priceTicket": 350000,
          startOperationDay: dataBusTicket.startOperationDay,
          breakDays: dataBusTicket.breakDays,
        }
        console.log('------dataPost----', dataPost)

        const response = await addBusSchedule(dataPost)
        if (response) {
          toast.success('Thêm vé xe thành công!', { autoClose: 2000 })
          console.log('Thêm vé xe thành công!', response)
          handleReset()
          dispatch(fetchAllBusTrips())
          dispatch(fetchAllSchedulesByBusID({ idBus: dataPost.busId }))
        }
      } catch (error) {
        console.log('Thêm thất bại:')
        console.log(error)
        if (error === 'Conflict schedules of the bus - conflict departure time') {
          toast.error('Thời gian khởi hành bị xung đột. Vui lòng chọn thời gian khác!', {
            autoClose: 2000,
            position: 'top-center',
          })
        }else  if (error === 'Conflict schedules of the bus - conflict arrival time') {
          toast.error('Thời gian khởi hành bị xung đột. Vui lòng chọn thời gian khác!', {
            autoClose: 2000,
            position: 'top-center',
          })
        }
        // else if(error==="Conflict schedules of the bus - conflict departure time"){

        // }
        else {
          toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
        }
      }
    }
  }
  return (
    <div className={cx('row', 'wrap-ticket')}>
      <Col className={cx('id-ticket')} sm={12} lg={1}>
        Vé xe
      </Col>
      <Col sm={12} lg={5} className={cx('p-3')}>
        <Row>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giờ khởi hành <span className="text-danger">*</span>
              </Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="45"
                name="departureTime"
                aria-label="departureTime"
                value={dataBusTicket.departureTime}
                className={cx('txt')}
              /> */}
              <DatePicker
                value={startTime}
                placeholder="Chọn giờ"
                onChange={handleStartTimeChange}
                picker="time" // Enables time selection
                format="HH:mm" // Time format
                minuteStep={15} // 15-minute intervals
                showNow={false} // Hide "Now" button if not needed
                className="w-100"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Ngày bắt đầu <span className="text-danger">*</span>
              </Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="45"
                name="startOperationDay"
                aria-label="startOperationDay"
                value={dataBusTicket.startOperationDay}
                className={cx('txt')}
              /> */}
              <DatePicker
                placeholder="Chọn ngày"
                onChange={handleStartDateChange}
                // selected={startDate}
                value={startDate}
                format="DD-MM-YYYY"
                className="content-calendar w-100"
                disabledDate={disablePastDates}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giá vé <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="450000"
                name="price"
                aria-label="price"
                value={data.price}
                className={cx('txt')}
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giảm giá<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="0%"
                value={dataBusTicket.discountPercentage || ''}
                name="discountPercentage"
                aria-label="discountPercentage"
                className={cx('txt')}
                onChange={(e) => {
                  let value = e.target.value
                  if (value === '' || (value >= 0 && value <= 100)) {
                    handleInputChange(e)
                  } else {
                    toast.error('Vui lòng nhập gí trị từ 0 - 100!', {
                      autoClose: 2000,
                      position: 'top-center',
                    })
                  }
                }}
                max="100"
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <Col lg={1} className={cx('line-vertical')}></Col>
      <Col sm={12} lg={5} className={cx('wrap-break-days')}>
        <AddManyBreakDay
          initialItems={[{ startDay: '', endDay: '', id: 1 }]}
          setBreakDays={setBreakDays}
        ></AddManyBreakDay>
      </Col>
      <div className={cx('save-button', { disabled: !activeAdd })} onClick={activeAdd ? handleSave : undefined}>
        Lưu vé xe
      </div>
      {/* Thêm phần tử này để hiển thị chữ "Lưu..." */}
    </div>
  )
}
export default TicketBus
