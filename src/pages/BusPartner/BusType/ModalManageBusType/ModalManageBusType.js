import classNames from 'classnames/bind'
import styles from './ModalManageBusType.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, Row, Form } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import Button from '~/components/Button'
const cx = classNames.bind(styles)
function ModalManageBusType({ enableEdit = true, functionModal, ...props }) {
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
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title')}>
          {functionModal === 'add' ? 'THÊM LOẠI XE' : 'CẬP NHẬT LOẠI XE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
          <Row lassName={cx('form-infor-bus-type', 'justify-content-center')}>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
              <Form.Label className="mb-3">Loại xe</Form.Label>
                <Form.Control
                  type="text"
                  value="Limousine"
                  name="typeVehicle"
                  aria-label="extend-time"
                  className={cx('txt')}
                  readOnly
                  disabled={!enableEdit}
                />
            </Form.Group>
          </Row>
          <Row className={cx('form-infor-bus-type', 'justify-content-center')}>
            <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
                <Form.Label className="mb-3">Loại ghế</Form.Label>
                <Form.Select
                  //   value={formData.typeSeat}
                  value='Giường nằm'
                  aria-label="typeSeat"
                  className={cx('txt', 'selectbox', 'infor-item')}
                  readOnly
                  disabled={!enableEdit}
                >
                  <option value="Giường nằm">Giường nằm</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
                <Form.Label className="mb-3">Số chỗ</Form.Label>
                <Form.Control
                  type="text"
                  value="23 chỗ"
                  name="numberSeat"
                  aria-label="numberSeat"
                  className={cx('txt')}
                  readOnly
                  disabled={!enableEdit}
                />
              </Form.Group>
            </Col>
          </Row>
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
              {functionModal === 'add' ? 'Thêm' : 'Cập nhật'}
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalManageBusType
