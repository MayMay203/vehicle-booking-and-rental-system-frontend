import classNames from 'classnames/bind'
import styles from './ModalDetailBusTicket.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, InputGroup, Row, Form, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faCouch, faTicket } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import AddManyTickets from '~/components/AddManyTickets'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import TableListBuyTicket from '~/components/TableListBuyTicket'
import RatingContentList from '~/components/RatingContent'
import Button from '~/components/Button'
const cx = classNames.bind(styles)
function ModalDetailBusTicket({ enableEdit = true, functionModal, ...props }) {
  const [formData, setFormData] = useState({
    departure: 'Đà Nẵng',
    typeVehicle: 'Limousine34GiuongNam',
    licensePlateNumber: '30G-49344',
    destination: 'Hà Nội',
    extendTime: '2 tiếng',
    numberSeat: '34',
    typeSeat: 'Giường nằm',
  })
  const [activeUpdate, setActiveUpdate] = useState(false)
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }))
  //   console.log(formData)
  // }
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    console.log('Có vô', formData)
    console.log(allFieldsFilled)
    setActiveUpdate(allFieldsFilled)
  }, [formData])
  const handleCancel = () => {
    setFormData({
      departure: 'Đà Nẵng',
      typeVehicle: 'Limousine34GiuongNam',
      licensePlateNumber: '30G-49344',
      destination: 'Hà Nội',
      extendTime: '2 tiếng',
      numberSeat: '34',
      typeSeat: 'Giường nằm',
    })
  }
  const statuses = [
    { value: 'Đang hoạt động', label: 'Đang hoạt động' },
    { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
    { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
  ]
  const [selectedDate, setSelectedDate] = useState(dayjs())

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(dayjs(date))
    }
  }

  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title')}>
          {functionModal === 'view' ? 'THÔNG TIN VÉ XE' : 'CẬP NHẬT VÉ XE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
          <Col md={3} className={cx('background-red', 'ml-auto')}>
            <DatePicker
              onChange={handleDateChange}
              value={selectedDate} // Hiển thị giá trị được chọn
              format="DD/MM/YYYY" // Định dạng ngày
              className={cx('content-calendar')}
            />
          </Col>
          <Tabs defaultActiveKey="infor" id="fill-tab-bus-ticket" className="mb-3" fill>
            <Tab eventKey="infor" title="Thông tin">
              <Row className={cx('form-infor-bus-trip', 'justify-content-center')}>
                <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput1">
                    <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
                    <Form.Select
                      value={formData.departure}
                      name="departure"
                      aria-label="departure"
                      className={cx('txt', 'selectbox', 'infor-item')}
                      readOnly
                      disabled={!enableEdit}
                    >
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
                    <Form.Label className="mb-3">Thời gian hành trình</Form.Label>
                    <InputGroup className={cx('txt', 'infor-item')}>
                      <Form.Control
                        type="text"
                        value="2 tiếng"
                        name="extendTime"
                        aria-label="extend-time"
                        className={cx('txt')}
                        readOnly
                        disabled
                      />
                      <InputGroup.Text className={cx('txt')}>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
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
                        disabled={!enableEdit}
                      />
                      <InputGroup.Text className={cx('txt')}>
                        <FontAwesomeIcon icon={faTicket} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput3">
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
                        <FontAwesomeIcon icon={faTicket} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput16">
                    <Form.Label className="mb-3">
                      Trạng thái hoạt động<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="status"
                      aria-label="status"
                      className={cx('txt', 'selectbox', 'infor-item')}
                      value={formData.status}
                      //   onChange={handleInputChange}
                    >
                      {statuses.map((status, index) => (
                        <option key={index} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
                    <Form.Label className="mb-3">Địa điểm đến</Form.Label>
                    <Form.Select
                      value={formData.destination}
                      aria-label="destination"
                      className={cx('txt', 'selectbox', 'infor-item')}
                      readOnly
                      disabled
                    >
                      <option value="Hà Nội">Hà Nội</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput4">
                    <Form.Label className="mb-3">Loại phương tiện</Form.Label>
                    <Form.Select
                      name="typeVehicle"
                      aria-label="typeVehicle"
                      className={cx('txt', 'selectbox', 'infor-item')}
                      readOnly
                      disabled
                    >
                      <option value={formData.typeVehicle}>{formData.typeVehicle}</option>
                    </Form.Select>
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
                            disabled
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
                        <Form.Select
                          name="typeSeat"
                          aria-label="typeSeat"
                          className={cx('txt', 'selectbox', 'infor-item')}
                          value={formData.typeSeat}
                          readOnly
                          disabled
                        >
                          <option value={formData.typeSeat}>{formData.typeSeat}</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput33">
                    <Form.Label className="mb-3">
                      Giảm giá<span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className={cx('txt', 'infor-item')}>
                      <Form.Control
                        type="text"
                        value={formData.reduce}
                        name="reduce"
                        aria-label="reduce"
                        className={cx('txt')}
                        // onChange={handleInputChange}
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
                            disabled
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
                        <Form.Select
                          name="typeSeat"
                          aria-label="typeSeat"
                          className={cx('txt', 'selectbox', 'infor-item')}
                          value={formData.typeSeat}
                          readOnly
                          disabled
                        >
                          <option value={formData.typeSeat}>{formData.typeSeat}</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <AddManyTickets initialItems={[1]}></AddManyTickets>
            </Tab>
            <Tab eventKey="list-order" title="Danh sách đơn đặt vé">
              <TableListBuyTicket></TableListBuyTicket>
            </Tab>
            <Tab eventKey="rating" title="Đánh giá">
              <RatingContentList></RatingContentList>
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
