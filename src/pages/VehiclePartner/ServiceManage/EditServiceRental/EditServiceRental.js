import classNames from "classnames/bind"
import styles from './EditServiceRental.module.scss'
import FormInforServiceRental from "~/components/FormInforServiceRental"
import { Button, Col, Image, Row } from "react-bootstrap"
import { useEffect, useState } from 'react'
import {
  faChevronLeft,
  faChevronRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const cx = classNames.bind(styles)
function EditServiceRental(){
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
        <FontAwesomeIcon icon={faTrash} className={cx('icon', 'icon-edit', 'flex-end')}></FontAwesomeIcon>
      </div>
      <Row className={cx('content-tab')}>
        <FormInforServiceRental formData={formData} handleInputChange={handleInputChange}></FormInforServiceRental>
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
    </div>
  )
}
export default EditServiceRental