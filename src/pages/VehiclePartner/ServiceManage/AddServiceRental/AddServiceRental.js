import classNames from 'classnames/bind'
import styles from './AddServiceRental.module.scss'
import FormInforServiceRental from '~/components/FormInforServiceRental'
import { Col, Modal, Row, Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CRUDImage from '~/components/CRUDImage'
import Button from '~/components/Button'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { toast } from 'react-toastify'
import { addRentalService } from '~/apiServices/rentalPartner/addRentalService'

const cx = classNames.bind(styles)
function AddServiceRental({ ...props }) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    car_company: '',
    type_vehicle: '',
    car_year: '',
    quantity: '',
    type_service: '',
    price1: '',
    price2: '',
    car_deposit: '',
    reservation_fees: '',
    price_according: '1',
    location: '',
    reduce: '',
    status: 'available',
    description: '',
    utility: '',
    policy: '',
    imageVehicle: [''],
  })
  const [activeAdd, setActiveAdd] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSave = (image) => {
    setFormData((prevState) => ({
      ...prevState,
      imageVehicle: image,
    }))
  }
  const handleCancel = () => {
    setFormData({
      car_company: '',
      type_vehicle: '',
      car_year: '',
      quantity: '',
      type_service: '',
      price1: '',
      price2: '',
      car_deposit: '',
      reservation_fees: '',
      price_according: '1',
      location: '',
      reduce: '',
      status: 'available',
      description: '',
      utility: '',
      policy: '',
      imageVehicle: [''],
    })
  }
  useEffect(() => {
    const { imageVehicle = [], price1, price2, ...restOfFormData } = formData
    const allFieldsFilled =
      Object.values(restOfFormData).every((value) => value.toString().trim() !== '') &&
      imageVehicle.some((img) => img.trim() !== '')
    setActiveAdd(allFieldsFilled)
    console.log('Có vô', formData)
    console.log(allFieldsFilled)
    // prevFormData.current = formData
  }, [formData])
  console.log('formData', formData, '--date:', today)
  const handleAddRentalService = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      setLoading(true)
      try {
        const vehicleRegisterInfo = {
          location: formData.location,
          vehicle_life: formData.car_year,
          manufacturer: formData.car_company,
          description: formData.description,
          quantity: parseInt(formData.quantity, 10), // Ensure integer value
          status: formData.status,
          date_of_status: today,
          discount_percentage: formData.reduce, // Assuming reduce is a number
          car_deposit: parseInt(formData.car_deposit, 10), // Ensure integer value
          reservation_fees: parseInt(formData.reservation_fees, 10), // Ensure integer value
          ulties: formData.utility,
          policy: formData.policy,
          rating_total: 0,
          amount: parseInt(formData.quantity, 10),
        }
        const formDataAdd = new FormData()
        formDataAdd.append(
          'vehicleRegisterInfo',
          new Blob([JSON.stringify(vehicleRegisterInfo)], { type: 'application/json' }),
        )
        formDataAdd.append('service_type', formData.type_service)

        if (formData.price2 !== '') {
          formDataAdd.append('driver_price', formData.price2)
        }

        if (formData.price1 !== '') {
          formDataAdd.append('no_driver_price', formData.price1)
        }
        formDataAdd.append('vehicle_type_id', formData.type_vehicle)
        for (let [key, value] of formDataAdd.entries()) {
          console.log(`${key}:`, value)
        }
        formData.imageVehicle.forEach((imageBase64, index) => {
          if (imageBase64 !== null) {
            const base64Data = imageBase64.split(',')[1] // Lấy phần base64 từ chuỗi (loại bỏ phần data:image/png;base64,...)
            const byteCharacters = atob(base64Data) // Giải mã base64 thành chuỗi ký tự
            const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i)) // Chuyển mỗi ký tự thành mã số byte
            const byteArray = new Uint8Array(byteNumbers) // Tạo mảng Uint8Array từ mã byte
            const imageBlob = new Blob([byteArray], { type: 'image/png' }) // Tạo Blob từ mảng byte

            formDataAdd.append('vehicleRegisterImages', imageBlob, `ImagesVehicle${index + 1}.png`)
          }
        })
        const response = await addRentalService(formDataAdd)
        if (response) {
          toast.success('Thêm dịch vụ cho thuê xe thành công!', { autoClose: 2000 })
          console.log('Thêm dịch vụ cho thuê xe thành công!', response)
          handleCancel()
        }
      } catch (error) {
        console.log('Thêm thất bại:')
        console.log(error)
        // if (error === 'Bus is available') {
        //   toast.error('Biển số xe đã tồn tại!', { autoClose: 2000, position: 'top-center' })
        // } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
        // }
      } finally {
        setLoading(false) 
      }
    }
  }
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title', 'justify-content-center')}>
          THÊM DỊCH VỤ CHO THUÊ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container mb-2 mt-2">
          {loading && <Spinner animation="border" variant="primary" />}
          {/* <div className={cx('header', 'd-flex')}>
             <p className={cx('justify-content-center', 'txt-header')}>Thêm dịch vụ cho thuê xe</p>
           </div> */}
          {/* <Row className={cx('content-tab')}> */}
          <Row className={cx('')}>
            <FormInforServiceRental
              mode={'add'}
              formData={formData}
              handleInputChange={handleInputChange}
            ></FormInforServiceRental>
            <p className={cx('txt', 'padding', 'mb-5', 'mt-5')}>Hình ảnh</p>
            <CRUDImage
              initialNumberPhoto={1}
              imagePerRow={4}
              handleSave={handleSave}
              obligatory={true}
              urlImages={formData.imageVehicle}
            ></CRUDImage>
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
              disabled={!activeAdd}
              // disabled={!activeUpdate}
              onClick={handleAddRentalService}
            >
              Thêm xe
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Modal.Footer>
    </Modal>
    //  <div className="container mb-5 mt-5">
    //        <div className={cx('header', 'd-flex')}>
    //          <p className={cx('justify-content-center', 'txt-header')}>Thêm dịch vụ cho thuê xe</p>
    //        </div>
    //        <Row className={cx('content-tab')}>
    //          <FormInforServiceRental formData={formData} handleInputChange={handleInputChange}></FormInforServiceRental>
    //          <p className={cx('txt', 'padding', 'mb-5')}>Hình ảnh</p>
    //          <CRUDImage
    //            initialNumberPhoto={1}
    //            imagePerRow={4}
    //            handleSave={handleSave}
    //            obligatory={true}
    //            urlImages={['']}
    //          ></CRUDImage>
    //        </Row>
    //        <Row className="d-flex row-cols-6 justify-content-center">
    //          <Button primary className={cx('btn')}>
    //            Hủy
    //          </Button>
    //          <div></div>
    //          <Button primary className={cx('btn')}>
    //            Thêm
    //          </Button>
    //        </Row>
    //      </div>
  )
}
export default AddServiceRental
