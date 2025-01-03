import classNames from 'classnames/bind'
import styles from './TicketBus.module.scss'
import { Col, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)
function ViewTicketBus({ data, enableEdit = true }) {
  // const dispatch = useDispatch()
  // const [activeAdd, setActiveAdd] = useState(false)
  // const [startTime, setStartTime] = useState('')
  // const [startDate, setStartDate] = useState('')
  const [dataBusTicket, setDataBusTicket] = useState({
    startOperationDay: '',
    discountPercentage: '',
    departureTime: '',
    breakDays: [''],
  })

  // const handleReset = () => {
  //   //chưa reset hết được
  //   setDataBusTicket({ startOperationDay: '', discountPercentage: '', departureTime: '', breakDays: [''] })
  // }
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setDataBusTicket((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }))
  // }
  // const handleStartTimeChange = (time) => {
  //   setStartTime(time)
  //   setDataBusTicket((prevState) => ({
  //     ...prevState,
  //     departureTime: time.format('HH:mm'),
  //   }))
  // }
  // const handleStartDateChange = (date) => {
  //   setStartDate(date)
  //   setDataBusTicket((prevState) => ({
  //     ...prevState,
  //     startOperationDay: date?.format('DD-MM-YYYY'),
  //   }))
  // }
  // const setBreakDays = (days) => {
  //   setDataBusTicket((prevState) => ({
  //     ...prevState,
  //     breakDays: days,
  //   }))
  // }
  useEffect(() => {
    if (data) {
      setDataBusTicket({
        startOperationDay: data?.startOperationDay,
        discountPercentage: data.discountPercentage,
        departureTime: data.departureTime,
        breakDays: data.breakDays,
      })
    }
  }, [data])
//   useEffect(() => {
//     // eslint-disable-next-line no-unused-vars
//     const { breakDays = [], ...restOfDataBusTicket } = dataBusTicket

//     // Check if all fields in `data` and `restOfDataBusTicket` are filled
//     const allFieldsFilled =
//       Object.values(data).every((value) => value?.toString().trim() !== '') &&
//       Object.values(restOfDataBusTicket).every((value) => value?.toString().trim() !== '')

//     setActiveAdd(allFieldsFilled)
//     console.log(
//       'Có vô==data:',
//       data,
//       '---restOfDataBusTicket:',
//       restOfDataBusTicket,
//       '---allFieldsFilled',
//       allFieldsFilled,
//     )
//   }, [dataBusTicket, data])
  // const handleSave = async () => {
  //   if (dispatch(checkLoginSession())) {
  //     try {
  //       const dataPost = {
  //         busTripId: data.idBusTrip,
  //         busId: data.licensePlateNumber,
  //         departureTime: dataBusTicket.departureTime,
  //         discountPercentage: dataBusTicket.discountPercentage,
  //         // "priceTicket": 350000,
  //         startOperationDay: dataBusTicket.startOperationDay,
  //         breakDays: dataBusTicket.breakDays,
  //       }
  //       console.log('------dataPost----', dataPost)

  //       const response = await addBusSchedule(dataPost)
  //       if (response) {
  //         toast.success('Thêm vé xe thành công!', { autoClose: 2000 })
  //         console.log('Thêm vé xe thành công!', response)
  //         handleReset()
  //       }
  //     } catch (error) {
  //       console.log('Thêm thất bại:')
  //       console.log(error)
  //       // if (error === 'Bus sche is available') {
  //       //   toast.error('Biển số xe đã tồn tại!', { autoClose: 2000, position: 'top-center' })
  //       // } else {
  //       toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
  //     }
  //   }
  // }
  return (
    <div className={cx('row', 'wrap-ticket')}>
      <Col className={cx('id-ticket', 'me-5')} sm={1} lg={1}>
        Vé xe
      </Col>
      <Col sm={6} lg={5} className={cx('p-3')}>
        <Row>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giờ khởi hành <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="45"
                name="departureTime"
                aria-label="departureTime"
                value={dataBusTicket.departureTime}
                className={cx('txt')}
                readOnly
              />
              {/* <DatePicker
                value={startTime}
                placeholder="Chọn giờ"
                // onChange={handleStartTimeChange}
                picker="time" // Enables time selection
                format="HH:mm" // Time format
                minuteStep={15} // 15-minute intervals
                showNow={false} // Hide "Now" button if not needed
                className="w-100"
                readOnly
              /> */}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Ngày bắt đầu <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="45"
                name="startOperationDay"
                aria-label="startOperationDay"
                value={dataBusTicket.startOperationDay}
                className={cx('txt')}
                readOnly
              />
              {/* <DatePicker
                placeholder="Chọn ngày"
                onChange={handleStartDateChange}
                // selected={startDate}
                value={startDate}
                format="DD-MM-YYYY"
                className="content-calendar w-100"
                readOnly
              /> */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* <Col>
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
          </Col> */}
          <Col>
            <Form.Group className={cx('txt', 'mb-3', 'mt-3')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-2">
                Giảm giá<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="0%"
                value={dataBusTicket.discountPercentage + '%' || ''}
                name="discountPercentage"
                aria-label="discountPercentage"
                className={cx('txt')}
                readOnly
                // onChange={(e) => {
                //   let value = e.target.value
                //   if (value === '' || (value >= 0 && value <= 100)) {
                //     handleInputChange(e)
                //   } else {
                //     toast.error('Vui lòng nhập gí trị từ 0 - 100!', {
                //       autoClose: 2000,
                //       position: 'top-center',
                //     })
                //   }
                // }}
                // max="100"
                // min="0"
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <Col lg={1} className={cx('line-vertical', 'd-sm-none')}></Col>
      <Col sm={5} lg={5} className={cx('wrap-break-days')}>
        <Row className="align-items-start">
          {/* <div className={cx('line-vertical')}></div> */}
          <div className="d-flex align-items-start">
            <p className={cx('me-3', 'txt', 'p-2', 'background')}>Ngày nghỉ</p>
          </div>
          <div>
            {dataBusTicket?.breakDays?.length > 0 ? (
              dataBusTicket.breakDays.map((item) => (
                <div className={cx('d-flex', 'align-items-start', 'mt-2', 'mb-2')} key={item.id}>
                  <Form.Group className={cx('txt', 'd-flex')} controlId={`formAddStart_${item.id}`}>
                    <Form.Label className="mb-2 d-flex mt-3 me-2">Từ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="45"
                      name="startDay"
                      aria-label="startDay"
                      value={item.startDay}
                      className={cx('txt')}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className={cx('txt', 'd-flex')} controlId={`formAddEnd_${item.id}`}>
                    <Form.Label className="mb-2 d-flex mt-3 ms-5 me-2">Đến</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="45"
                      name="endDay"
                      aria-label="endDay"
                      value={item.endDay}
                      className={cx('txt')}
                      readOnly
                    />
                  </Form.Group>
                </div>
              ))
            ) : (
              <div className="text-muted">Không có dữ liệu nghỉ.</div>
            )}
          </div>
        </Row>
      </Col>
      {/* <div className={cx('save-button', { disabled: !activeAdd })} onClick={activeAdd ? handleSave : undefined}>
        Lưu vé xe
      </div> */}
      {/* Thêm phần tử này để hiển thị chữ "Lưu..." */}
    </div>
  )
}
export default ViewTicketBus
