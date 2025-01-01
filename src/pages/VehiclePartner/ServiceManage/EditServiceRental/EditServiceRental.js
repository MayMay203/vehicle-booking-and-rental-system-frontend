import classNames from 'classnames/bind'
import styles from './EditServiceRental.module.scss'
import FormInforServiceRental from '~/components/FormInforServiceRental'
import { Col, Modal, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CRUDImage from '~/components/CRUDImage'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getVehicleRentalByIDRegis } from '~/apiServices/user/getVehicleRentalByIDRegis'
import { generalModalNames, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'
import { format } from 'date-fns'
import { updateRentalService } from '~/apiServices/rentalPartner/updateRentalService'
import { fetchAllVehicle, fetchAllVehicleTypes } from '~/redux/slices/rentalPartnerSlice'
import { toast } from 'react-toastify'
const cx = classNames.bind(styles)
function EditServiceRental({ idRegister, ...props }) {
  console.log('idRegister:', idRegister)
  const today = format(new Date(), 'yyyy-MM-dd')
  const typeVehicles = useSelector((state) => state.rentalPartner.vehicleTypeList)

  const [formData, setFormData] = useState({
    car_company: '',
    type_vehicle: '',
    vehicleLife: '',
    quantity: '',
    type_service: 'Cả 2 dịch vụ',
    price1: '',
    price2: '',
    car_deposit: '',
    reservation_fees: '',
    price_according: '',
    location: '',
    reduce: '',
    status: 'available',
    description: '',
    utility: '',
    policy: '',
    rating: '',
    imageVehicle: [''],
  })
  const [activeUpdate, setActiveUpdate] = useState(false)
  const dispatch = useDispatch()
  const getInforVehicle = async () => {
    const response = await getVehicleRentalByIDRegis(idRegister)
    setFormData({
      car_company: response?.manufacturer,
      type_vehicle: response?.vehicle_type,
      vehicleLife: response?.vehicleLife,
      quantity: response?.amount,
      type_service: response?.type,
      // response?.type === 2 ? 'Cả 2 dịch vụ' : response?.type === 1 ? 'Thuê xe có người lái' : 'Thuê xe tự lái',
      price1: response?.selfDriverPrice,
      price2: response?.driverPrice,
      car_deposit: response?.car_deposit,
      reservation_fees: response?.reservation_fees,
      price_according: response?.quantity,
      location: response?.location,
      reduce: response?.discount_percentage,
      status: response?.status,
      date_of_status: today,
      description: response?.description,
      utility: response?.ulties,
      policy: response?.policy,
      rating: response?.rating_total,
      imageVehicle: response?.imagesVehicleRegister,
    })
    console.log('response:', response)
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllVehicleTypes())
    }
  }, [dispatch])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      if (idRegister) {
        getInforVehicle()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRegister])
  const handleCancel = () => {
    getInforVehicle()
  }
  useEffect(() => {
    const { imageVehicle = [], price1, price2, ...restOfFormData } = formData
    const allFieldsFilled =
      Object.values(restOfFormData).every((value) => value?.toString().trim() !== '') &&
      imageVehicle.some((img) => img !== '')
    setActiveUpdate(allFieldsFilled)
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
  const handleSave = (image) => {
    setFormData((prevState) => ({
      ...prevState,
      imageVehicle: image,
    }))
  }
  console.log('formData:', formData)
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      try {
        const vehicleRegisterInfo = {
          vehicle_register_id: idRegister,
          type: formData.type_service,
          driverPrice: formData.price2,
          selfDriverPrice: formData.price1,
          vehicleLife: formData.vehicleLife,
          location: formData.location,
          manufacturer: formData.car_company,
          description: formData.description,
          quantity: parseInt(formData.quantity, 10),
          status: 'available',
          date_of_status: today,
          discount_percentage: formData.reduce,
          car_deposit: parseInt(formData.car_deposit, 10),
          reservation_fees: parseInt(formData.reservation_fees, 10),
          ulties: formData.utility,
          policy: formData.policy,
          rating_total: formData.rating,
          amount: parseInt(formData.quantity, 10),
          // vehicle_type_id: formData.type_vehicle,
          vehicle_type_id: typeVehicles.find((type) => type.name === formData.type_vehicle)?.id,
        }
        // {
        //   vehicle_register_id: idRegister,
        //   location: formData.location,
        //   vehicleLife: formData.vehicleLife,
        //   manufacturer: formData.car_company,
        //   description: formData.description,
        //   quantity: parseInt(formData.quantity, 10),
        //   status: formData.status,
        //   date_of_status: today,
        //   discount_percentage: formData.reduce,
        //   car_deposit: parseInt(formData.car_deposit, 10),
        //   reservation_fees: parseInt(formData.reservation_fees, 10),
        //   ulties: formData.utility,
        //   policy: formData.policy,
        //   rating_total: 0,
        //   amount: parseInt(formData.quantity, 10),

        // }
        const formDataAdd = new FormData()
        formDataAdd.append(
          'vehicleRentalService',
          new Blob([JSON.stringify(vehicleRegisterInfo)], { type: 'application/json' }),
        )

        for (let [key, value] of formDataAdd.entries()) {
          console.log(`${key}:`, value)
        }
        // formData.imageVehicle.forEach((imageBase64, index) => {
        //   if (imageBase64 !== null) {
        //     const base64Data = imageBase64.split(',')[1] // Lấy phần base64 từ chuỗi (loại bỏ phần data:image/png;base64,...)
        //     const byteCharacters = atob(base64Data) // Giải mã base64 thành chuỗi ký tự
        //     const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i)) // Chuyển mỗi ký tự thành mã số byte
        //     const byteArray = new Uint8Array(byteNumbers) // Tạo mảng Uint8Array từ mã byte
        //     const imageBlob = new Blob([byteArray], { type: 'image/png' }) // Tạo Blob từ mảng byte

        //     formDataAdd.append('vehicleRegisterImages', imageBlob, `ImagesVehicle${index + 1}.png`)
        //   }
        // })
        for (let index = 0; index < formData.imageVehicle.length; index++) {
          const imageBase64 = formData.imageVehicle[index]
          if (imageBase64) {
            console.log(`Image ${index}:`, imageBase64)

            if (imageBase64.includes('http')) {
              const response = await fetch(imageBase64)
              const imageBlobVehicle = await response.blob()
              formDataAdd.append('vehicleRegisterImages', imageBlobVehicle, `imageVehicle${index + 1}.png`)
            } else {
              const base64DataVehicle = imageBase64.split(',')[1]
              const byteCharactersVehicle = atob(base64DataVehicle)
              const byteNumbersVehicle = new Array(byteCharactersVehicle.length)
                .fill(0)
                .map((_, i) => byteCharactersVehicle.charCodeAt(i))
              const byteArrayVehicle = new Uint8Array(byteNumbersVehicle)
              const imageBlobVehicle = new Blob([byteArrayVehicle], { type: 'image/png' })
              formDataAdd.append('vehicleRegisterImages', imageBlobVehicle, `imageVehicle${index + 1}.png`)
            }
          } else {
            console.warn(`Image ${index} is null or undefined`)
          }
        }
        const response = await updateRentalService(formDataAdd)
        if (response) {
          dispatch(fetchAllVehicle({ typeService: '2', status: 'available' }))
          toast.success('Cập nhật dịch vụ cho thuê xe thành công!', { autoClose: 2000 })
          console.log('Cập nhật dịch vụ cho thuê xe thành công!', response)
          handleCancel()
          props.onHide()
        }
      } catch (error) {
        console.log('Cập nhật thất bại:')
        console.log(error)
        // if (error === 'Bus is available') {
        //   toast.error('Biển số xe đã tồn tại!', { autoClose: 2000, position: 'top-center' })
        // } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        // }
      } finally {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      }
    }
  }
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title', 'justify-content-center')}>
          CẬP NHẬT DỊCH VỤ CHO THUÊ XE
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container mb-2 mt-2">
          {/* <div className={cx('header', 'd-flex')}>
            <p className={cx('justify-content-center', 'txt-header')}>Cập nhật dịch vụ cho thuê xe</p> */}
          {/* <FontAwesomeIcon icon={faTrash} className={cx('icon', 'icon-edit', 'flex-end')}></FontAwesomeIcon> */}
          {/* </div> */}
          <Row className={cx('content-tab')}>
            <FormInforServiceRental
              mode={'edit'}
              formData={formData}
              handleInputChange={handleInputChange}
            ></FormInforServiceRental>
            <p className={cx('txt', 'padding', 'mb-5', 'mt-5')}>Hình ảnh</p>
            <CRUDImage
              initialNumberPhoto={formData?.imageVehicle.length}
              imagePerRow={4}
              handleSave={handleSave}
              obligatory={true}
              urlImages={formData?.imageVehicle}
            ></CRUDImage>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Row className="justify-content-center">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button primary className={cx('btn')}>
              Hủy
            </Button>
            <Button primary className={cx('btn')} disabled={!activeUpdate} onClick={handleUpdate}>
              Cập nhật
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}
export default EditServiceRental
