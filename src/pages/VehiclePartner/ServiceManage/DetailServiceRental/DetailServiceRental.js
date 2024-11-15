import classNames from 'classnames/bind'
import styles from './DetailServiceRental.module.scss'
import { Button, Col, Image, Row, Tab, Tabs } from 'react-bootstrap'
import RatingContentList from '~/components/RatingContent'
import { useEffect, useState } from 'react'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TableListTenant from '~/components/TableListTenant/TableListTenant'
import FormInforServiceRental from '~/components/FormInforServiceRental'
const cx = classNames.bind(styles)
function DetailServiceRental() {
  const [formData, setFormData] = useState({
    car_company: '',
    type_vehicle: '',
    car_year: '',
    quantity: '',
    type_service: 'Cả 2 dịch vụ',
    price1: '',
    price2: '',
    price_according: '',
    location: '',
    reduce: '',
    status: '',
    description: '',
    utility: '',
  })
  const listImageVehicle = [
    {
      id: 1,
      imgLink:
        'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2024/1/21/2024-wmoto-sm125i-1-17058230156551946374049-39-0-1039-1600-crop-17058232068681412114897.jpg',
    },
    {
      id: 3,
      imgLink: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/8/11/1379133/Xe-May-So-Duoi-50-Cc.jpg',
    },
    {
      id: 4,
      imgLink:
        'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2024/1/21/2024-wmoto-sm125i-1-17058230156551946374049-39-0-1039-1600-crop-17058232068681412114897.jpg',
    },
    {
      id: 5,
      imgLink:
        'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2024/1/21/2024-wmoto-sm125i-1-17058230156551946374049-39-0-1039-1600-crop-17058232068681412114897.jpg',
    },
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageVehiclePerPage, setImageVehiclePerPage] = useState(4)

  useEffect(() => {
    const updateImageVehiclePerPage = () => {
      if (window.innerWidth >= 992) {
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
  const handleInputChange = () => {
    setFormData()
  }
  return (
    <div className="container mb-5 mt-5">
      <div className={cx('header', 'd-flex')}>
        <p className={cx('justify-content-center', 'txt-header')}>Dịch vụ cho thuê xe</p>
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
                  {displayedImageVehicle.map((item, index) => (
                    <Image key={index} src={item.imgLink} rounded className={cx('image-vehicle')} />
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
              - Sử dụng xe đúng mục đích.
              <br /> - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
              <br /> - Không sử dụng xe thuê để cầm cố, thế chấp.
              <br /> - Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
              <br /> - Không chở hàng quốc cấm dễ cháy nổ.
              <br /> - Không chở hoa quả, thực phẩm nặng mùi trong xe.
              <br /> - Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ
              thu phí vệ sinh xe.
              <br /> - Xe được giới hạn di chuyển ở mức 400km cho 24h, và lần lượt là 250km, 300km, 350 km cho gói 4h,
              8h, 12h.
              <br /> Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
            </p>
          </Row>
        </Tab>
        <Tab eventKey="order" title="Đơn đặt">
          <Row className={cx('content-tab')}>
            <TableListTenant></TableListTenant>
          </Row>
        </Tab>
        <Tab eventKey="rating" title="Đánh giá">
          <Row className={cx('content-tab', 'rolling-content-tab')}>
            <RatingContentList></RatingContentList>
          </Row>
        </Tab>
      </Tabs>
    </div>
  )
}
export default DetailServiceRental
