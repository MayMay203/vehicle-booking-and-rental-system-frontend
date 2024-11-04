import classNames from "classnames/bind"
import styles from './AddBus.module.scss'
import { Col, InputGroup, Row, Form, Image, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBottleWater, faFan, faMattressPillow, faPersonBooth, faRug, faTicket, faTv } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { useState, useEffect, useRef } from 'react'
import SlideUtility from "~/components/SlideUtility"
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
import { images } from "~/assets/images"
const cx = classNames.bind(styles)
function AddBus(){
    const listUtilities = [
      { id: 1, icon: faFan, name: 'Quạt', description: 'Xe có hệ thống điều hòa' },
      { id: 11, icon: faLightbulb, name: 'Đèn đọc sách', description: 'Xe có hệ thống điều hòa' },
      { id: 12, icon: faTv, name: 'TV', description: 'Xe có hệ thống điều hòa' },
      { id: 13, icon: faPersonBooth, name: 'Rèm cửa', description: 'Xe có hệ thống điều hòa' },
      { id: 14, icon: faMattressPillow, name: 'Gối nằm', description: 'Xe có hệ thống điều hòa' },
      { id: 15, icon: faBottleWater, name: 'Nước uống', description: 'Xe có hệ thống điều hòa' },
      { id: 16, icon: faRug, name: 'Chăn', description: 'Xe có hệ thống điều hòa' },
      { id: 17, icon: faFan, name: 'Điều hòa', description: 'Xe có hệ thống điều hòa' },
      { id: 18, icon: faFan, name: 'Điều hòa', description: 'Xe có hệ thống điều hòa' },
    ]
    const typeVehicles = [
      { value: '', label: 'Chọn loại phương tiện' },
      { value: 'Limousine34GiuongNam', label: 'Limousine34GiuongNam' },
    ]
    const [activeAdd, setActiveAdd] = useState(false)
    const [formData, setFormData] = useState({
      departure: '',
      date: '',
      licensePlateNumber: '',
      // typeVehicle: '',
      price: '',
      reduce: '',
      destination: '',
      time: '',
      extendTime: '',
      status: '',
      // numberSeat: '',
    })
    useEffect(() => {
      const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
      setActiveAdd(allFieldsFilled)
      console.log('Có vô', formData)
      console.log(allFieldsFilled)
    }, [formData])
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
      console.log(formData)
    }
    const handleCancel = () => {
      setFormData({
        departure: '',
        date: '',
        licensePlateNumber: '',
        // typeVehicle: '',
        price: '',
        reduce: '',
        destination: '',
        time: '',
        extendTime: '',
        status: '',
        // numberSeat: '',
      })
    }
    const handleAdd = () => {}
    const fileInputRefs = useRef(Array(6).fill(null))
    const [selectedFiles, setSelectedFiles] = useState(Array(6).fill(null))
    const [warningMessage, setWarningMessage] = useState('')
    const handleImageClick = (index) => {
      fileInputRefs.current[index].click()
    }
    const handleFileChange = (index, event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image/')) {
        const newSelectedFiles = [...selectedFiles]
        newSelectedFiles[index] = URL.createObjectURL(file) // Create a URL for the selected file
        setSelectedFiles(newSelectedFiles)
        setWarningMessage('')
      } else if (file && !file.type.startsWith('image/')) {
        setWarningMessage('Vui lòng chọn file ảnh!')
      }
    }
    return (
      <div className={cx('container mt-5 mb-5', 'wrap-container')}>
        <Row className={cx('form-add-bus-trip', 'justify-content-center')}>
          <p className={cx('title-form')}>Thêm xe khách</p>
          <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
              <Form.Label className="mb-3">
                Loại phương tiện<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="typeVehicle"
                name="typeVehicle"
                className={cx('txt', 'selectbox', 'infor-item')}
                onChange={handleInputChange}
                // value={formData.typeVehicle}
              >
                {typeVehicles.map((typeVehicle, index) => (
                  <option key={index} value={typeVehicle.value}>
                    {typeVehicle.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-3">
                Số ghế <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="text"
                  placeholder="45"
                  name="numberSeat"
                  aria-label="numberSeat"
                  className={cx('txt')}
                  disabled
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faTicket} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
              <Form.Label className="mb-3">
                Biển số xe <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="text"
                  placeholder="30G-49344"
                  name="licensePlateNumber"
                  aria-label="licensePlateNumber"
                  className={cx('txt')}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faTicket} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
              <Form.Label className="mb-3">
                Loại ghế<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="typeSeat"
                name="typeSeat"
                className={cx('txt', 'selectbox', 'infor-item')}
                onChange={handleInputChange}
                disabled
              >
                <option>Ghế giường nằm</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <div className={cx('txt', 'padding-5')}>
            Tiện ích<span className="text-danger">*</span>
          </div>
          <SlideUtility listUtilities={listUtilities}></SlideUtility>
        </Row>
        <Row className={cx('infor-img', 'mt-5')}>
          <div className={cx('txt', 'padding-5')}>
            Hình ảnh<span className="text-danger">*</span>
          </div>
        </Row>
        <Row className={cx('infor-img', 'mt-3 ms-5 me-5', 'justify-content-center')}>
          <Row className={cx('list-img')}>
            {[...Array(6)].map((_, index) => (
              <Col xs={4} key={index} className="d-flex justify-content-center">
                <div onClick={() => handleImageClick(index)}>
                  <Image src={selectedFiles[index] || images.no_picture} thumbnail className={cx('img-vehicle')} />
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(event) => handleFileChange(index, event)}
                  />
                </div>
              </Col>
            ))}

            {warningMessage && (
              <Alert variant="danger" className={cx('warn', 'text-center')}>
                {warningMessage}
              </Alert>
            )}
          </Row>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button outline className={cx('ms-5 me-5', 'btn')} onClick={handleCancel}>
              Hủy
            </Button>
            <Button primary className={cx('ms-5 me-5', 'btn')} disabled={!activeAdd} onClick={handleAdd}>
              Thêm
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )
}
export default AddBus