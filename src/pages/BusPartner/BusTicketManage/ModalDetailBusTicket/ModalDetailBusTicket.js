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
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import ViewTicketBus from '~/components/TicketBus/ViewTicketBus'
import { fetchOrderListBusTrip, fetchTicketInfor } from '~/redux/slices/busPartnerSlice'
import { getAllRatingOfTicket } from '~/apiServices/ratingService/getAllRatingOfTicket'
import RatingContent from '~/components/RatingContent'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
import UpdateTicketBus from '~/components/TicketBus/UpdateTicket'
const cx = classNames.bind(styles)
function ModalDetailBusTicket({ enableEdit = true, statusTicket='', loadAgain = '', sendTicket, functionModal, idTicket, ...props }) {
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

  // const [ticket, setTicket] = useState({})
  const ticket = useSelector((state) => state.busPartner.ticketInfor)
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(dayjs())
  // const [activeUpdate, setActiveUpdate] = useState(false)
  const listOrderOfBusTrip = useSelector((state) => state.busPartner.orderListBusTrip)
  const [listRating, setListRating] = useState([])
  const [activeSchedule, setActiveSchedule] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchTicketInfor({ id: idTicket, date: dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, idTicket, isUpdate])
  useEffect(() => {
    if(dispatch(checkLoginSession())){
      dispatch(fetchTicketInfor({ id: idTicket, date: dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') }))
      setActiveSchedule(statusTicket)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (ticket.suspended !== undefined) {
      console.log('có vô', ticket)
      setActiveSchedule(!ticket.suspended)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket.suspended])

  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchOrderListBusTrip({ id: idTicket, date: dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD') }))
    }
  }, [dispatch, idTicket, startDate])

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

  const handleStartDateChange = (date) => {
    setStartDate(date)
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
  const handleModeUpdate = () => {
  setIsUpdate(!isUpdate)
  }
  const handleSuspendSchedule = () => {
    if (dispatch(checkLoginSession())) {
      props.onHide()
      if (activeSchedule) {
        dispatch(
          setConfirmModalVisible({
            name: generalModalNames.SUSPENDED_BUS_SCHEDULE,
            title: 'Xác nhận',
            description: 'Bạn có chắc chắn ngừng hoạt động vé xe này?',
            isOpen: true,
            modalType: 'confirm',
            id: formData?.idBusSchedule,
            status: true,
            startDate: startDate,
            // startDate: startDate.toISOString(),
          }),
        )
      } else {
        dispatch(
          setConfirmModalVisible({
            name: generalModalNames.SUSPENDED_BUS_SCHEDULE,
            title: 'Xác nhận',
            description: 'Bạn có chắc chắn hoạt động lại vé xe này?',
            isOpen: true,
            modalType: 'confirm',
            id: formData?.idBusSchedule,
            status: false,
            startDate: startDate,
            // startDate: startDate.toISOString(),
          }),
        )
      }
    }
  }
  console.log('lisst rating', listRating, '---id ve:', ticket.busTripScheduleId)
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className={cx('justify-content-center')}>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title', 'justify-content-center')}>
          {functionModal === 'view' ? 'THÔNG TIN VÉ XE' : 'CẬP NHẬT VÉ XE'}
          {!activeSchedule && <span className={cx('txt-red')}> --Vé xe đang ngừng hoạt động</span>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
          <Tabs defaultActiveKey="infor" id="fill-tab-bus-ticket" className="mb-3" fill>
            <Tab eventKey="infor" title="Thông tin">
              <Row className={cx('form-infor-bus-trip', 'justify-content-center')}>
                {activeSchedule && (
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
                )}

                <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
                  {activeSchedule && (
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
                  )}

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
                </Col>
                <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
                  <Row className="d-flex align-items-center justify-content-center">
  
                    {activeSchedule && (
                      <>
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
                      </>
                    )}
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
                {isUpdate && <p className="mb-2">Cập nhật thông tin:</p>}
                <div className={cx('d-flex')}>
                  {isUpdate === true ? (
                    <>
                      <UpdateTicketBus
                        initialItems={[]}
                        content={''}
                        priceTicket={ticket?.priceTicket}
                        data={ticket}
                        idTicket={idTicket}
                        startDate={startDate}
                      ></UpdateTicketBus>
                    </>
                  ) : (
                    <ViewTicketBus enableEdit={false} initialItems={[]} content={''} data={ticket} />
                  )}
                </div>
              </div>

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
                {Array.isArray(listRating) && listRating.map((rating, index) => <RatingContent key={index} data={rating} />)}

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
        <Button onClick={handleModeUpdate} className={cx('btn-update')} variant="none">
          {isUpdate ? 'Chế độ xem?' : 'Chế độ chỉnh sửa?'}
        </Button>
        <Button onClick={handleSuspendSchedule} className={cx('btn-inActive')} variant="none">
          {activeSchedule ? 'Ngừng hoạt động?' : 'Quay lại hoạt động?'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalDetailBusTicket
