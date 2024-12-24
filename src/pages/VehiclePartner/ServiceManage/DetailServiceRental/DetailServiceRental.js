import classNames from 'classnames/bind'
import styles from './DetailServiceRental.module.scss'
import { Button, Col, Image, Row, Tab, Tabs } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TableListTenant from '~/components/TableListTenant/TableListTenant'
import FormInforServiceRental from '~/components/FormInforServiceRental'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
const cx = classNames.bind(styles)
function DetailServiceRental() {
 
  const location = useLocation()
  const dispatch = useDispatch()
  const inforVehicle = location.state?.inforVehicle || {}
   const [formData, setFormData] = useState(
     inforVehicle,
     // car_company: '',
     // type_vehicle: '',
     // car_year: '',
     // quantity: '',
     // type_service: '',
     // price1: '',
     // price2: '',
     // car_deposit: '',
     // reservation_fees: '',
     // price_according: '1',
     // location: '',
     // reduce: '',
     // status: 'available',
     // description: '',
     // utility: '',
     // policy: '',
     // imagesVehicleRegister: [''],
   )
  console.log('inforVehicle con---', inforVehicle)
  console.log('inforVehicle.imagesVehicleRegister---', inforVehicle.imagesVehicleRegister)
  const [listImageVehicle, setListImageVehicle] = useState(inforVehicle.imagesVehicleRegister)
  console.log('listImageVehicle---', listImageVehicle)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageVehiclePerPage, setImageVehiclePerPage] = useState(3)

  useEffect(() => {
    const fetchVehicleRentalDetails = async () => {
      if (dispatch(checkLoginSession())) {
        if (inforVehicle) {
          // const response = await getVehicleRentalByID(vehicleID)
          setFormData({
            // car_company: response.manufacturer,
            // type_vehicle: response.vehicle_type_id,
            // car_year: response?.vehicleLife,
            // quantity: response?.amount,
            // type_service: response.type,
            // price1: response.price,
            // price2: response.price,
            // car_deposit: response.car_deposit,
            // reservation_fees: response.reservation_fees,
            // price_according: response.quantity,
            // location: response.location,
            // reduce: response.discount_percentage,
            // status: 'available',
            // description: response.description,
            // utility: response.ulties,
            // policy: response.policy,
            // imagesVehicleRegister: response.imagesVehicleRegister,
            car_company: inforVehicle.manufacturer,
            type_vehicle: inforVehicle.vehicle_type_id,
            car_year: inforVehicle.vehicleLife,
            quantity: inforVehicle.amount,
            type_service: inforVehicle.type,
            price1: inforVehicle.selfDriverPrice,
            price2: inforVehicle.driverPrice,
            car_deposit: inforVehicle.car_deposit,
            reservation_fees: inforVehicle.reservation_fees,
            price_according: inforVehicle.quantity,
            location: inforVehicle.location,
            reduce: inforVehicle.discount_percentage,
            status: 'available',
            description: inforVehicle.description,
            utility: inforVehicle.ulties,
            policy: inforVehicle.policy,
            imagesVehicleRegister: inforVehicle.imagesVehicleRegister,
          })
        }
      }
    }
    fetchVehicleRentalDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inforVehicle])
  useEffect(() => {
    const updateImageVehiclePerPage = () => {
      if (window.innerWidth >= 1392) {
        setImageVehiclePerPage(3) // Large screens (lg)
      } else if (window.innerWidth >= 768) {
        setImageVehiclePerPage(2) // Medium screens (md)
      } else if (window.innerWidth >= 500) {
        setImageVehiclePerPage(1) // Small screens (sm)
      } else {
        setImageVehiclePerPage(1) // Extra small screens (xs)
      }
    }
    updateImageVehiclePerPage()
    window.addEventListener('resize', updateImageVehiclePerPage)
    return () => window.removeEventListener('resize', updateImageVehiclePerPage)
  }, [])
  const [currentPage, setCurrentPage] = useState(0)
  const displayedImageVehicle = listImageVehicle.slice(currentIndex, currentIndex + imageVehiclePerPage)
  console.log('displayedImageVehicle', displayedImageVehicle)
  useEffect(() => {
    setListImageVehicle(formData?.imagesVehicleRegister?.map((item, index) => ({ id: index, imgLink: item })) || '')
  }, [formData.imagesVehicleRegister])
  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     policy: formData.policy,
  //   }))
  // }, [formData.policy])
  const handleNext = () => {
    if (currentIndex + imageVehiclePerPage < listImageVehicle.length) {
      // resetImageVehicleStates()
      setCurrentIndex(currentIndex + imageVehiclePerPage)
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevious = () => {
    if (currentIndex - imageVehiclePerPage >= 0) {
      // resetimageVehicleStates()
      setCurrentIndex(currentIndex - imageVehiclePerPage)
      setCurrentPage(currentPage - 1)
    }
  }
  console.log('formData---', formData)
const handleInputChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value, // Cập nhật giá trị mới của policy
  }))
}

  return (
    <div className="container mb-5 mt-5">
      <div className={cx('header', 'd-flex')}>
        <p className={cx('justify-content-center', 'txt-header')}>Chi tiết dịch vụ cho thuê xe</p>
      </div>
      <Tabs defaultActiveKey="information" id="tab-detail-vehicle" className={cx('justify-content-center')}>
        <Tab eventKey="information" title="Thông tin xe">
          <Row className={cx('content-tab')}>
            <FormInforServiceRental
              mode={'view'}
              formData={formData}
              handleInputChange={handleInputChange}
            ></FormInforServiceRental>
            <p className={cx('txt', 'padding', 'mb-5')}>Hình ảnh</p>
            <Row className="justify-content-center align-items-center pt-3 pb-3">
              <Col xs="1" className="d-flex justify-content-start">
                <Button
                  className={cx('nav-button-page')}
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="none"
                >
                  <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                </Button>
              </Col>
              <Col xs="10">
                <div className="d-flex justify-content-center">
                  {/* {(displayedImageVehicle?.[0] || []).map((item, index) => (
                    <Image key={index} src={item.imgLink} rounded className={cx('image-vehicle')} />
                  ))} */}
                  <div className="d-flex justify-content-center">
                    {displayedImageVehicle ? (
                      displayedImageVehicle.map((item, index) => (
                        <Image key={index} src={item.imgLink} rounded className={cx('image-vehicle')} />
                      ))
                    ) : (
                      <p>No images available</p> // Hiển thị thông báo khi không có hình ảnh
                    )}
                  </div>

                  {/* Thêm các Col giả nếu danh sách không đủ utilitiesPerPage */}
                  {Array.from({ length: imageVehiclePerPage - displayedImageVehicle.length }, (_, index) => (
                    <div
                      className="utility-placeholder"
                      key={`placeholder-${index}`}
                      style={{ flex: '1 0 auto', visibility: 'hidden' }}
                    ></div>
                  ))}
                </div>
              </Col>
              <Col xs="1" className="d-flex justify-content-end">
                <Button
                  className={cx('nav-button-page')}
                  onClick={handleNext}
                  disabled={currentIndex + imageVehiclePerPage >= listImageVehicle.length}
                  variant="none"
                >
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                </Button>
              </Col>
            </Row>
          </Row>
        </Tab>
        <Tab eventKey="policy" title="Chính sách">
          <Row className={cx('content-tab')}>
            <p className={cx('content')}>
              {/* - Sử dụng xe đúng mục đích.
              <br /> - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
              <br /> - Không sử dụng xe thuê để cầm cố, thế chấp.
              <br /> - Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
              <br /> - Không chở hàng quốc cấm dễ cháy nổ.
              <br /> - Không chở hoa quả, thực phẩm nặng mùi trong xe.
              <br /> - Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ
              thu phí vệ sinh xe.
              <br /> - Xe được giới hạn di chuyển ở mức 400km cho 24h, và lần lượt là 250km, 300km, 350 km cho gói 4h,
              8h, 12h.
              <br /> Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời ! */}
              {inforVehicle?.policy
                .split('@#$%&')
                .filter(Boolean)
                .map((value, index) => (
                  <>
                    <span key={index}>- {value.trim()}</span> <br />
                  </>
                )) || ''}
            </p>
          </Row>
        </Tab>
        <Tab eventKey="order" title="Đơn đặt">
          <Row className={cx('content-tab')}>
            <TableListTenant idRegister={inforVehicle.vehicle_register_id}></TableListTenant>
          </Row>
        </Tab>
        <Tab eventKey="rating" title="Đánh giá">
          <Row className={cx('content-tab', 'rolling-content-tab')}>
            {/* <RatingContentList></RatingContentList> */}
          </Row>
        </Tab>
      </Tabs>
    </div>
  )
}
export default DetailServiceRental
