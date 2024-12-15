import classNames from 'classnames/bind'
import styles from './AddBus.module.scss'
import { Col, InputGroup, Row, Form, Image, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCouch,
  faTicket,
} from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { useState, useEffect, useRef, useCallback } from 'react'
import SlideUtility from '~/components/SlideUtility'
import { images } from '~/assets/images'
import { getAllBusTypes } from '~/apiServices/busPartner/getAllBusTypes'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchBusTypeByID } from '~/apiServices/busPartner/fetchBusTypeByID'
import { toast } from 'react-toastify'
import { addBus } from '~/apiServices/busPartner/addBus'
import { fetchAllUtilities } from '~/redux/slices/busPartnerSlice'
const cx = classNames.bind(styles)
function AddBus() {
  const dispatch = useDispatch()
  const [allBusTypes, setAllBusTypes] = useState(null)
  const listUtilities = useSelector((state) => state.busPartner.utilityList)
  const [updateUtilitiesOfBus, setUpdateUtilitiesOfBus] = useState([])
  // const listUtilities = [
  //   {
  //     id: 1,
  //     image:
  //       'https://vehiclerentalbookingsystem.s3.ap-southeast-2.amazonaws.com/f274a51e-5e30-46e7-8103-e6fb040dfb76_food2.png',
  //     name: 'Quạt',
  //     description: 'Xe có hệ thống điều hòa',
  //   },
  // ]
  // const typeVehicles = [
  //   { value: '', label: 'Chọn loại phương tiện' },
  //   { value: 'Limousine34GiuongNam', label: 'Limousine34GiuongNam' },
  // ]
  const [activeAdd, setActiveAdd] = useState(false)
  const [formData, setFormData] = useState({
    licensePlateNumber: '',
    idBusType: '',
    // typeVehicle: '',
    typeSeat: '',
    numberSeat: '',
    utilities: [],
    busImages: [''],
  })
  const [utilitiesOfBus, setUtilitiesOfBus] = useState(formData.utilities)
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllUtilities())
    }
  }, [dispatch])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      listUtilities.map((utility) => ({
        id: utility.id,
        image: utility.image,
        name: utility.name,
        description: utility.description,
      }))
    }
  })
  useEffect(() => {
    setFormData({
      ...formData,
      utilities: updateUtilitiesOfBus,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUtilitiesOfBus])
  const handleGetAllBusTypes = useCallback(async () => {
    if (dispatch(checkLoginSession())) {
      try {
        const response = await getAllBusTypes()
        setAllBusTypes(response?.result)
        //  console.log('allBusTypes:', allBusTypes)
      } catch (message) {
        console.log(message)
      }
    }
  }, [dispatch])

  useEffect(() => {
    handleGetAllBusTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInforBusType = async () => {
    if (dispatch(checkLoginSession())) {
      if (formData.idBusType != null) {
        try {
          const data = await fetchBusTypeByID(formData.idBusType)
          setFormData({
            ...formData,
            idBusType: data.id,
            numberSeat: data.numberOfSeat.toString(),
            typeSeat: data.chairType,
          })
          // setFormDataDefault({
          //   typeVehicle: data.name,
          //   numberSeat: data.numberOfSeat.toString(),
          //   typeSeat: data.chairType,
          // })
        } catch (error) {
          console.log('Lỗi khi lấy thông tin xe:', error)
        }
      }
    }
  }
  // const [enableAdd, setEnableAdd] = useState(false)
  // const prevFormData = useRef(formData)
  useEffect(() => {
    getInforBusType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.idBusType])
  useEffect(() => {
    const { busImages = [], utilities = [], ...restOfFormData } = formData
    const allFieldsFilled =
      Object.values(restOfFormData).every((value) => value.toString().trim() !== '') &&
      busImages.some((img) => img.trim() !== '') &&
      utilities.length > 0
    setActiveAdd(allFieldsFilled)
    console.log('Có vô', formData)
    console.log(allFieldsFilled)
    // prevFormData.current = formData
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleCancel = () => {
    setFormData({
      licensePlateNumber: '',
      idBusType: '',
      // typeVehicle: '',
      utilities: [],
      typeSeat: '',
      numberSeat: '',
      busImages: [''],
    })
    setSelectedFiles([])
    setUtilitiesOfBus([])
  }
  // useEffect(() => {
  //   handleCancel()
  // }, [])
  const handleAdd = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      try {
        const busInfor = {
          licensePlate: formData.licensePlateNumber,
          utilities: formData.utilities.map((utilityId) => ({ id: utilityId })),
          busType: { id: formData.idBusType },
        }
        const formDataAddBus = new FormData()
        formDataAddBus.append('busInfo', new Blob([JSON.stringify(busInfor)], { type: 'application/json' }))
        formData.busImages.forEach((imageBase64, index) => {
          if (imageBase64 !== null) {
            const base64DataBus = imageBase64.split(',')[1]
            const byteCharactersBus = atob(base64DataBus)
            const byteNumbersBus = new Array(byteCharactersBus.length)
              .fill(0)
              .map((_, i) => byteCharactersBus.charCodeAt(i))
            const byteArrayBus = new Uint8Array(byteNumbersBus)
            const imageBlobBus = new Blob([byteArrayBus], { type: 'image/png' })
            formDataAddBus.append('busImages', imageBlobBus, `busImages${index + 1}.png`)
          }
        })
        const response = await addBus(formDataAddBus)
        if (response) {
          toast.success('Thêm xe thành công!', { autoClose: 2000 })
          console.log('Thêm xe thành công!', response)
          handleCancel()
        }
      } catch (error) {
        console.log('Thêm thất bại:')
        console.log(error)
        if (error === 'Bus is available') {
          toast.error('Biển số xe đã tồn tại!', { autoClose: 2000, position: 'top-center' })
        } else {
          toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
        }
      }
    }
  }
  const fileInputRefs = useRef(Array(6).fill(null))
  const [selectedFiles, setSelectedFiles] = useState(formData.busImages)
  const [warningMessage, setWarningMessage] = useState('')
  const handleImageClick = (index) => {
    fileInputRefs.current[index].click()
  }
  const maxSizeImage = 3 * 1024 * 1024
  const handleFileChange = (index, event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/') && file.size <= maxSizeImage) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const newFiles = [...selectedFiles]
        newFiles[index] = e.target.result // Lấy Data URL của ảnh
        setSelectedFiles(newFiles)
        setWarningMessage('')

        setFormData((prevState) => ({
          ...prevState,
          busImages: newFiles,
        }))
      }
    } else if (file && !file.type.startsWith('image/')) {
      setWarningMessage('Vui lòng chọn file ảnh!')
    } else if (file && file.type.startsWith('image/') && file.size > maxSizeImage) {
      setWarningMessage('Vui lòng chọn file có kích thước <= 3MB !')
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
              aria-label="idBusType"
              name="idBusType"
              className={cx('txt', 'selectbox', 'infor-item')}
              onChange={handleInputChange}
              value={formData.idBusType}
            >
              <option key='-1' value="">
                Chọn loại xe
              </option>
              {allBusTypes &&
                allBusTypes.map((typeVehicle, index) => (
                  <option key={index} value={typeVehicle.id}>
                    {typeVehicle.name}
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
                name="numberSeat"
                aria-label="numberSeat"
                className={cx('txt')}
                value={formData.numberSeat}
                readOnly
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
                value={formData.licensePlateNumber}
                onChange={handleInputChange}
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
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                aria-label="typeSeat"
                name="typeSeat"
                className={cx('txt', 'selectbox', 'infor-item')}
                value={formData.typeSeat}
                readOnly
              ></Form.Control>
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faCouch} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <div className={cx('txt', 'padding-5')}>
          Tiện ích<span className="text-danger">*</span>
        </div>
        <SlideUtility
          listUtilities={listUtilities}
          setUpdateUtilitiesOfBus={setUpdateUtilitiesOfBus}
          utilitiesOfBus={utilitiesOfBus}
        ></SlideUtility>
      </Row>
      <Row className={cx('infor-img', 'mt-5')}>
        <div className={cx('txt', 'padding-5')}>
          Hình ảnh<span className="text-danger">*</span>
        </div>
      </Row>
      <Row className={cx('infor-img', 'mt-3 ms-5 me-5', 'justify-content-center')}>
        <Row className={cx('list-img')}>
          {[...Array(6)].map((_, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="d-flex justify-content-center">
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
