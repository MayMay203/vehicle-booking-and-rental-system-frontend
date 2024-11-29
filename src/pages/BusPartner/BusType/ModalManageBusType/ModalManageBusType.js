import classNames from 'classnames/bind'
import styles from './ModalManageBusType.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, Row, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'
import Button from '~/components/Button'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { addBusType } from '~/apiServices/busPartner/addBusType'
import { useDispatch } from 'react-redux'
import { fetchBusTypeByID } from '~/apiServices/busPartner/fetchBusTypeByID'
import { updateBusType } from '~/apiServices/busPartner/updateBusType'
const cx = classNames.bind(styles)
function ModalManageBusType({ enableEdit = true, idBusType = null, functionModal, closeModal, ...props }) {
  const dispatch = useDispatch()
  const [formDataDefault, setFormDataDefault] = useState({
    typeVehicle: '',
    numberSeat: '',
    typeSeat: '',
  })
  const [formData, setFormData] = useState(formDataDefault)
  const getInforBusType = useCallback(async () => {
    if (idBusType != null) {
      try {
        const data = await fetchBusTypeByID(idBusType)
        setFormData({
          typeVehicle: data.name,
          numberSeat: data.numberOfSeat.toString(),
          typeSeat: data.chairType,
        })
        setFormDataDefault({
          typeVehicle: data.name,
          numberSeat: data.numberOfSeat.toString(),
          typeSeat: data.chairType,
        })
      } catch (error) {
        console.log('Lỗi khi lấy thông tin xe:', error)
      }
    }
  }, [idBusType])
  useEffect(() => {
    getInforBusType()
  }, [getInforBusType])
  const listSeats = Array.from({ length: 60 - 16 + 1 }, (_, i) => 16 + i)

  const listTypeSeat = [
    { value: '', label: 'Chọn loại ghế' },
    { value: 'Ghế ngồi', label: 'Ghế ngồi' },
    { value: 'Ghế giường nằm đơn', label: 'Ghế giường nằm đơn' },
    { value: 'Ghế giường nằm đôi', label: 'Ghế giường nằm đôi' },
  ]
  const [activeUpdate, setActiveUpdate] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(formData)
  }
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    // console.log('Có vô', formData)
    // console.log(allFieldsFilled)
    setActiveUpdate(allFieldsFilled)
  }, [formData])
  const handleCancel = () => {
    setFormData(formDataDefault)
  }
  const handleAddBusType = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      try {
        const response = await addBusType(formData.typeVehicle, formData.numberSeat, formData.typeSeat)
        if (response) {
          closeModal()
          toast.success('Thêm loại xe thành công!', { autoClose: 2000 })
        }
      } catch (message) {
        toast.error(message, { autoClose: 2000 })
      }
    }
  }
  const handleUpdateBusType = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      try {
        const response = await updateBusType(idBusType, formData.typeVehicle, formData.numberSeat, formData.typeSeat)
        if (response) {
          closeModal()
          toast.success('Cập nhật loại xe thành công!', { autoClose: 2000 })
        }
      } catch (message) {
        toast.error(message, { autoClose: 2000 })
      }
    }
  }
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title', 'd-flex', 'justify-content-center')}>
          {functionModal === 'add' ? 'THÊM LOẠI XE' : 'CẬP NHẬT LOẠI XE'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
          <Row lassName={cx('form-infor-bus-type', 'justify-content-center')}>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
              <Form.Label className="mb-3">
                Loại xe<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Limousine 34 chỗ giường nằm"
                value={formData.typeVehicle}
                name="typeVehicle"
                aria-label="typeVehicle"
                className={cx('txt')}
                disabled={!enableEdit}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row className={cx('form-infor-bus-type', 'justify-content-center')}>
            <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
                <Form.Label className="mb-3">
                  Loại ghế<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.typeSeat}
                  aria-label="typeSeat"
                  className={cx('txt', 'selectbox', 'infor-item')}
                  name="typeSeat"
                  disabled={!enableEdit}
                  onChange={handleInputChange}
                >
                  {listTypeSeat.map((type, index) => (
                    <option
                      key={index}
                      value={type.value}
                      className={cx(type.value === '' ? 'placeholder-option' : '')}
                    >
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
                <Form.Label className="mb-3">
                  Số chỗ<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.numberSeat}
                  aria-label="numberSeat"
                  name="numberSeat"
                  className={cx('txt', 'selectbox', 'infor-item')}
                  disabled={!enableEdit}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn số ghế</option> {/* Placeholder */}
                  {listSeats.map((seat) => (
                    <option key={seat} value={seat}>
                      {seat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Row className="justify-content-center mt-4">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button outline className="ms-5 me-5" onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              primary
              className="ms-5 me-5"
              disabled={!activeUpdate}
              onClick={functionModal === 'add' ? handleAddBusType : handleUpdateBusType}
            >
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
