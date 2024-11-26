import classNames from 'classnames/bind'
import styles from './ModalManageBusSchedule.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, InputGroup, Row, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faCouch, faTicket } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
import Button from '~/components/Button'
import AddManyTickets from '~/components/AddManyTickets'
const cx = classNames.bind(styles)
function ModalManageBusSchedule(props, { enableEdit = true, functionModal }) {
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
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title')}>
          {functionModal === 'add' ? 'THÊM LỊCH KHỞI HÀNH' : 'CẬP NHẬT LỊCH KHỞI HÀNH'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
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

              <div className="d-flex">
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
              </div>
            </Col>
          </Row>
          <AddManyTickets initialItems={[1]}></AddManyTickets>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-center mt-4">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button outline className="ms-5 me-5" onClick={handleCancel}>
              Hủy
            </Button>
            <Button primary className="ms-5 me-5" disabled={!activeUpdate}>
              Cập nhật
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalManageBusSchedule
