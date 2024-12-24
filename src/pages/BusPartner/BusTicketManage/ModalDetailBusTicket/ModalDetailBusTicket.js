import classNames from 'classnames/bind'
import styles from './ModalDetailBusTicket.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, InputGroup, Row, Form, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch, faTicket } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { DatePicker, Empty } from 'antd'
import dayjs from 'dayjs'
import TableListBuyTicket from '~/components/TableListBuyTicket'
import Button from '~/components/Button'
import InforBusTrip from '../../BusTripManage/DetailBusTrip/InforBusTrip'
import { detailBusSchedule } from '~/apiServices/busPartner/detailBusSchedule'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import ViewTicketBus from '~/components/TicketBus/ViewTicketBus'
import { fetchOrderListBusTrip } from '~/redux/slices/busPartnerSlice'
import { getAllRatingOfTicket } from '~/apiServices/ratingService/getAllRatingOfTicket'
import RatingContent from '~/components/RatingContent'
const cx = classNames.bind(styles)
function ModalDetailBusTicket({ enableEdit = true, functionModal, idTicket, ...props }) {
  // const [formData, setFormData] = useState({
  //   departure: 'Đà Nẵng',
  //   typeVehicle: 'Limousine34GiuongNam',
  //   licensePlateNumber: '30G-49344',
  //   destination: 'Hà Nội',
  //   extendTime: '2 tiếng',
  //   numberSeat: '34',
  //   typeSeat: 'Giường nằm',
  // })
  const [formData, setFormData] = useState({
    idBusTrip: '',
    departure: '',
    idBusType: '',
    nameType: '',
    licensePlateNumber: '',
    destination: '',
    extendTime: 'h:m',
    numberSeat: '',
    typeSeat: '',
    price: '',
    operation: '',
    idBusSchedule: '',
    availableSeat: '',
  })
  const [ticket, setTicket] = useState({})
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(dayjs())
  const [activeUpdate, setActiveUpdate] = useState(false)
  const listOrderOfBusTrip = useSelector((state) => state.busPartner.orderListBusTrip)
  const [listRating, setListRating] = useState([])
  useEffect(() => {
    const fetchBusSchedule = async () => {
      if (dispatch(checkLoginSession())) {
        if (idTicket && startDate) {
          try {
            const response = await detailBusSchedule(idTicket, dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'))
            setTicket(response)
          } catch (error) {
            console.error('Failed to fetch bus schedule:', error)
          }
        }
      }
    }

    fetchBusSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTicket, startDate])

  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchOrderListBusTrip({ id: idTicket, date: dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') }))
    }
  }, [dispatch, idTicket, startDate])
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }))
  //   console.log(formData)
  // }

  useEffect(() => {
    // const allFieldsFilled = Object.values(formData).every((value) => value.toString().trim() !== '')
    //   console.log('Có vô', formData)
    const allFieldsFilled = false
    console.log(allFieldsFilled)
    setActiveUpdate(allFieldsFilled)
  }, [formData])
  useEffect(() => {
    if (ticket !== null) {
      setFormData({
        idBusTrip: ticket?.busTripInfo?.id,
        departure: ticket?.busTripInfo?.departureLocation,
        idBusType: ticket?.busInfo?.busType?.id,
        nameType: ticket?.busInfo?.busType?.name,
        licensePlateNumber: ticket?.busInfo?.licensePlate,
        destination: ticket?.busTripInfo?.arrivalLocation,
        extendTime: ticket?.journeyDuration,
        numberSeat: ticket?.busInfo?.busType?.numberOfSeat,
        typeSeat: ticket?.busInfo?.busType?.chairType,
        price: ticket?.priceTicket,
        operation: ticket?.operation,
        idBusSchedule: ticket?.busTripScheduleId,
        availableSeat: ticket?.availableSeats,
      })
    }
  }, [ticket])
  const handleCancel = () => {
    setFormData({
      idBusTrip: ticket?.busTripInfo?.id,
      departure: ticket?.busTripInfo?.departureLocation,
      idBusType: ticket?.busInfo?.busType?.id,
      nameType: ticket?.busInfo?.busType?.name,
      licensePlateNumber: ticket?.busInfo?.licensePlate,
      destination: ticket?.busTripInfo?.arrivalLocation,
      extendTime: ticket?.journeyDuration,
      numberSeat: ticket?.busInfo?.busType?.numberOfSeat,
      typeSeat: ticket?.busInfo?.busType?.chairType,
      price: ticket?.priceTicket,
      operation: ticket?.operation,
      idBusSchedule: ticket?.busTripScheduleId,
      availableSeat: ticket?.availableSeats,
    })
  }
  // const statuses = [
  //   { value: 'Đang hoạt động', label: 'Đang hoạt động' },
  //   { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
  //   { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
  // ]
  // const [selectedDate, setSelectedDate] = useState(dayjs())

  // const handleDateChange = (date) => {
  //   if (date) {
  //     setSelectedDate(dayjs(date))
  //   }
  // }

  const handleStartDateChange = (date) => {
    setStartDate(date)
    // setStartDateTime((prev) => ({
    //   ...prev,
    //   startDate: date?.format('DD-MM-YYYY'),
    //   startDT: startTime?.format('HH:mm') + ' ' + date?.format('DD-MM-YYYY'),
    // }))
  }
  useEffect(() => {
    if (ticket.busTripScheduleId) {
      const getListRating = async () => {
        const response = await getAllRatingOfTicket(ticket?.busTripScheduleId)
        if (response && response.result.result) {
          setListRating(response.result.result)
        } else {
          setListRating([])
        }
      }
      getListRating()
    }
  }, [ticket.busTripScheduleId])
  console.log('lisst rating', listRating, '---id ve:', ticket.busTripScheduleId)
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title')}>
          {functionModal === 'view' ? 'THÔNG TIN VÉ XE' : 'CẬP NHẬT VÉ XE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
          {/* <Col md={3} className={cx('background-red', 'ml-auto')}>
            <DatePicker
              onChange={handleDateChange}
              value={selectedDate} // Hiển thị giá trị được chọn
              format="DD/MM/YYYY" // Định dạng ngày
              className={cx('content-calendar')}
            />
          </Col> */}
          <Tabs defaultActiveKey="infor" id="fill-tab-bus-ticket" className="mb-3" fill>
            <Tab eventKey="infor" title="Thông tin">
              <Row className={cx('form-infor-bus-trip', 'justify-content-center')}>
                <div className="d-flex align-items-center justify-content-end me-4">
                  <span className={cx('text')}>Ngày:</span>
                  <DatePicker
                    onChange={handleStartDateChange}
                    // selected={startDate}
                    value={startDate}
                    format="DD-MM-YYYY"
                    className="content-calendar ms-3"
                  />
                </div>

                <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
                  <Row>
                    <Col></Col>
                    <Col style={{ visibility: 'hidden' }}>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput1">
                        <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.departure}
                          name="departure"
                          aria-label="departure"
                          className={cx('txt', 'selectbox', 'infor-item')}
                          readOnly
                          // disabled={!enableEdit}
                        >
                          {/* <option value="Đà Nẵng">Đà Nẵng</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col style={{ visibility: 'hidden' }}>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
                        <Form.Label className="mb-3">Địa điểm đến</Form.Label>
                        <Form.Control
                          value={formData.destination}
                          name="destination"
                          aria-label="destination"
                          className={cx('txt', 'infor-item')}
                          readOnly
                          // disabled
                        >
                          {/* <option value="Hà Nội">Hà Nội</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput1">
                        <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.departure}
                          name="departure"
                          aria-label="departure"
                          className={cx('txt', 'selectbox', 'infor-item')}
                          readOnly
                          // disabled={!enableEdit}
                        >
                          {/* <option value="Đà Nẵng">Đà Nẵng</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
                        <Form.Label className="mb-3">Địa điểm đến</Form.Label>
                        <Form.Control
                          value={formData.destination}
                          name="destination"
                          aria-label="destination"
                          className={cx('txt', 'infor-item')}
                          readOnly
                          // disabled
                        >
                          {/* <option value="Hà Nội">Hà Nội</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
                    <Form.Label className="mb-3">Thời gian hành trình</Form.Label>
                    <InputGroup className={cx('txt', 'infor-item')}>
                      <Form.Control
                        type="text"
                        value={formData.extendTime ? convertTimeFormat(formData.extendTime) : ''}
                        name="extendTime"
                        aria-label="extend-time"
                        className={cx('txt')}
                        readOnly
                        // disabled
                      />
                      <InputGroup.Text className={cx('txt')}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput4">
                    <Form.Label className="mb-3">Loại phương tiện</Form.Label>
                    <Form.Control
                      name="nameType"
                      aria-label="nameType"
                      value={formData.nameType}
                      className={cx('txt', 'infor-item')}
                      readOnly
                      // disabled
                    >
                      {/* <option value={formData.typeVehicle}>{formData.typeVehicle}</option> */}
                    </Form.Control>
                  </Form.Group>

                  {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput3">
                    <Form.Label className="mb-3">
                      Giá vé<span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className={cx('txt', 'infor-item')}>
                      <Form.Control
                        type="text"
                        value={formData.price}
                        name="price"
                        aria-label="price"
                        className={cx('txt')}
                        // onChange={handleInputChange}
                      />
                      <InputGroup.Text className={cx('txt')}>
                        <FontAwesomeIcon icon={faDongSign} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group> */}
                </Col>
                <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
                  <Row className="d-flex align-items-center justify-content-center">
                    {/* <div className="d-flex align-items-center justify-content-end">
                        <span className={cx('text')}>Ngày:</span>
                        <DatePicker
                          onChange={handleStartDateChange}
                          // selected={startDate}
                          value={startDate}
                          format="DD-MM-YYYY"
                          className="content-calendar ms-3"
                        />
                      </div> */}
                    <Col>
                      <Form.Group
                        className={cx('txt', 'mb-5', 'line-shadow', 'line-top')}
                        controlId="formInfor.ControlInput16"
                      >
                        <Form.Label className="mb-3">Trạng thái hoạt động</Form.Label>
                        <Form.Control
                          name="operation"
                          aria-label="operation"
                          value={formData.operation === true ? 'Đang hoạt động' : 'Ngày nghỉ'}
                          className={cx(
                            'txt',
                            'Controlbox',
                            'infor-item',
                            formData.operation ? 'text-success' : 'text-warning', // Áp dụng màu chữ tùy theo trạng thái
                          )}
                          readOnly
                          //   onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput16">
                        <Form.Label className="mb-3">Số vé còn lại</Form.Label>
                        <Form.Control
                          name="availableSeat"
                          aria-label="availableSeat"
                          value={formData.availableSeat}
                          className={cx('txt', 'Controlbox', 'infor-item', 'text-danger')}
                          readOnly
                          //   onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput5">
                    <Form.Label className="mb-3">Biển số xe</Form.Label>
                    <InputGroup className={cx('txt', 'infor-item')}>
                      <Form.Control
                        type="text"
                        value={formData.licensePlateNumber}
                        name="licensePlateNumber"
                        aria-label="licensePlateNumber"
                        className={cx('txt')}
                        readOnly
                        // disabled={!enableEdit}
                      />
                      <InputGroup.Text className={cx('txt')}>
                        <FontAwesomeIcon icon={faTicket} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Row className="d-flex">
                    <Col>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput14">
                        <Form.Label className="mb-3">Số ghế</Form.Label>
                        <InputGroup className={cx('txt', 'infor-item')}>
                          <Form.Control
                            type="text"
                            value={formData.numberSeat}
                            name="numberSeat"
                            aria-label="numberSeat"
                            className={cx('txt')}
                            readOnly
                            // disabled
                          />
                          <InputGroup.Text className={cx('txt')}>
                            <FontAwesomeIcon icon={faCouch} />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput15">
                        <Form.Label className="mb-3">Loại ghế</Form.Label>
                        <Form.Control
                          type="text"
                          name="typeSeat"
                          aria-label="typeSeat"
                          className={cx('txt', 'infor-item')}
                          value={formData.typeSeat}
                          readOnly
                          // disabled
                        >
                          {/* <option value={formData.typeSeat}>{formData.typeSeat}</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <InforBusTrip idBusTrip={formData?.idBusTrip}></InforBusTrip>
              <div className="align-items-center row">
                <div className={cx('d-flex')}>
                  <ViewTicketBus enableEdit={false} initialItems={[]} content={''} data={ticket}></ViewTicketBus>
                </div>
              </div>

              {/* <AddManyTickets
                haveTitle={false}
                // date={startDate}
                initialItems={[1]}
                idBusSchedule={formData?.idBusSchedule}
                enableEdit={false}
              ></AddManyTickets> */}
              {/* <Accordion>
                <Accordion.Item eventKey={1}>
                  <Accordion.Header>
                    <span className={cx('txt')}>Thông tin chuyến xe</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <InforBusTrip idBusTrip={formData?.idBusTrip}></InforBusTrip>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}
            </Tab>
            <Tab eventKey="list-order" title="Danh sách đơn đặt vé">
              <div className="d-flex align-items-center justify-content-end mb-4">
                <span className={cx('text')}>Ngày:</span>
                <DatePicker
                  onChange={handleStartDateChange}
                  // selected={startDate}
                  value={startDate}
                  format="DD-MM-YYYY"
                  className="content-calendar ms-3"
                />
              </div>
              <TableListBuyTicket listOrderOfBusTrip={listOrderOfBusTrip}></TableListBuyTicket>
            </Tab>
            <Tab eventKey="rating" title="Đánh giá">
              <div>
                {Array.isArray(listRating) && listRating.map((rating, index) => <RatingContent data={rating} />)}

                {listRating?.length === 0 && (
                  <div style={{ marginTop: '60px' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có đánh giá nào." />
                  </div>
                )}
                {(listRating === null || listRating === undefined) && (
                  <div style={{ marginTop: '60px' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có đánh giá nào." />
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {enableEdit && (
          <Row className="justify-content-center mt-4">
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Button outline className="ms-5 me-5" onClick={handleCancel}>
                Hủy
              </Button>
              <Button primary className="ms-5 me-5" disabled={!activeUpdate}>
                {functionModal === 'add' ? 'Thêm' : 'Cập nhật'}
              </Button>
            </Col>
            <Col></Col>
          </Row>
        )}
      </Modal.Footer>
    </Modal>
  )
}
export default ModalDetailBusTicket
