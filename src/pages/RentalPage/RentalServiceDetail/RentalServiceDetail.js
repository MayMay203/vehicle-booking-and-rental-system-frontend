import { config } from '~/config'
import classNames from 'classnames/bind'
import styles from './RentalServiceDetail.module.scss'
import { Breadcrumb, Row, Col, Carousel } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxArchive,
  faCar,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faHomeUser,
  faLocationDot,
  faPhone,
  faStopwatch,
  faThumbTack,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Rating from '~/components/Rating'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
// import RatingContentList from '~/components/RatingContent/RatingContentList'
import InforRental from '~/components/InforRental'
import SurchargeFee from '~/components/InforRental/SurchargeFee'
import { getVehicleRentalByID } from '~/apiServices/user/getVehicleRentalByID'
import { getRatingsRentalByIDService } from '~/apiServices/user/getRatingsRentalByIDService'
import { Empty } from 'antd'
import RatingContent from '~/components/RatingContent'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { createCoversation } from '~/apiServices/messageService/createConverstation'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'
import { setMessageModalVisible } from '~/redux/slices/generalModalSlice'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)
function RentalServiceDetail() {
  const location = useLocation()
  const dispatch = useDispatch()
  const typeService = location.state?.typeService
  const typeVehicle = location.state.typeVehicle
  const inforVehicle = location.state?.infor
  const startDateTime = location.state?.startDateTime
  const endDateTime = location.state?.endDateTime
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const manned = 'manned'
  const self_driving = 'self_driving'
  const newPrice =
    typeService === 'manned'
      ? inforVehicle?.driverPrice - inforVehicle?.driverPrice * (inforVehicle?.discount_percentage / 100)
      : inforVehicle?.selfDriverPrice - inforVehicle?.selfDriverPrice * (inforVehicle?.discount_percentage / 100)
  const [inforVehicleRental, setInforVehicleRental] = useState(null)
  const [listRating, setListRating] = useState([])
  const chunkArray = (array, size) => {
    const result = []
    for (let i = 0; i < array?.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }
  // Chia mảng ảnh thành các cặp (2 ảnh mỗi nhóm)
  const imagePairs = chunkArray(inforVehicleRental?.imagesVehicleRegister, 2)
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await getRatingsRentalByIDService(inforVehicle?.vehicle_rental_service_id)
        setListRating(response)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error)
      }
    }

    fetchRatings()
  }, [inforVehicle?.vehicle_rental_service_id])
  // console.log(' inforVehicle---3---', inforVehicle)
  useEffect(() => {
    const getInforVehicleRentalByID = async () => {
      try {
        const response = await getVehicleRentalByID(inforVehicle?.vehicle_rental_service_id)
        setInforVehicleRental(response)
      } catch (error) {
        console.error('Failed to fetch vehicle rental info:', error)
      }
    }
    getInforVehicleRentalByID()
  }, [inforVehicle?.vehicle_rental_service_id])
  console.log('endDatatime ---3---', endDateTime)
  console.log('startDatatime ---- 3----', startDateTime)
  // Chia mảng ảnh thành các cặp

  const handleSendMessage = async () => {
    if (dispatch(checkLoginSession()) && isLogin) {
      // Create new conversation
      const idConversation = await createCoversation(
        currentUser.id,
        currentRole,
        inforVehicleRental?.partnerAccountId,
        'CAR_RENTAL_PARTNER',
      )
      dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
      dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
    } else {
      //gọi modal đăng nhập
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    }
  }

  return (
    <div className={cx('wrapper', 'container')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.renting}>Thuê xe</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.rentalService}>
          {typeService === self_driving && 'Thuê xe tự lái'}
          {typeService === manned && 'Thuê xe có người lái'}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.rentalServiceDetail} active>
          Chi tiết xe
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mb-1">
        {/* <Col xs="6">
          <div className={cx('d-flex justify-content-start', 'trapezoid_lelf')}>
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.vehicle}></img>
          </div>
        </Col> */}
        {/* ---Trường hợp 2 ảnh--- */}
        {/* <Col xs="6">
          <div className={cx('d-flex justify-content-end', 'trapezoid_right')}>
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.vehicle1}></img>
          </div>
        </Col> */}

        {/* ---Trường hợp 4 ảnh--- */}
        {/* <Col xs="6">
          <Row className="justify-content-center">
            <Col xs="12">
              <img
                className={cx('d-flex justify-content-center', 'img-basic')}
                alt="Vehicle"
                src={images.vehicle1}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <img
                className={cx('d-flex justify-content-center', 'img-basic')}
                alt="Vehicle"
                src={images.vehicle}
              ></img>
            </Col>
          </Row>
        </Col>
        <Col xs="6">
          <Row className="justify-content-center">
            <Col xs="12">
              <img
                className={cx('d-flex justify-content-center', 'img-basic')}
                alt="Vehicle"
                src={images.vehicle1}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <img
                className={cx('d-flex justify-content-center', 'img-basic')}
                alt="Vehicle"
                src={images.vehicle}
              ></img>
            </Col>
          </Row>
        </Col> */}
        {/* ---Trường hợp 5 ảnh--- */}
        {/* <Col xs="6" className={cx('')}>
          <Row>
            <Col xs="6">
              <img
                className={cx('d-flex justify-content-end', 'img-vehicle-5', 'img-up')}
                alt="Vehicle"
                src={images.vehicle}
              ></img>
            </Col>
            <Col xs="6">
              <img
                className={cx('d-flex justify-content-end', 'img-vehicle-5', 'img-up')}
                alt="Vehicle"
                src={images.vehicle1}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <img
                className={cx('d-flex justify-content-end', 'img-vehicle-5', 'img-down')}
                alt="Vehicle"
                src={images.vehicle}
              ></img>
            </Col>
            <Col xs="6">
              <img
                className={cx('d-flex justify-content-end', 'img-vehicle-5', 'img-down')}
                alt="Vehicle"
                src={images.vehicle1}
              ></img>
            </Col>
          </Row>
        </Col> */}
      </Row>
      <Row className="mb-5">
        <Col xl="8" lg="7" md="6">
          <Row className="mb-5">
            <Col>
              <Carousel>
                {imagePairs.map((pair, index) => (
                  <Carousel.Item key={index} className={cx('carousel-item')}>
                    <Row>
                      {pair.map((image, idx) => (
                        <Col xs="6" key={idx}>
                          <img
                            className={cx('d-flex justify-content-end', 'img-vehicle')}
                            alt={`Vehicle ${index * 2 + idx + 1}`}
                            src={image}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
          <Row className="mb-5">
            <div className={cx('d-flex', 'name-location-vehicle')}>
              <span className={cx('name-vehicle')}>{inforVehicle?.manufacturer + ' ' + inforVehicle?.vehicleLife}</span>
              <Rating rating={inforVehicle?.rating_total}></Rating>
            </div>
            <div className={cx('icon-txt')}>
              <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'icon-location')} />
              <span className={cx('txt')}>{inforVehicle?.location}</span>
            </div>
          </Row>
          <Row className="mb-5">
            <Tabs defaultActiveKey="information" id="tab-detail-vehicle" className="mb-3">
              <Tab eventKey="information" title="Thông tin">
                <Row>
                  <Row>
                    <span className={cx('title')}>Liên hệ</span>
                  </Row>

                  <Col>
                    <div className={cx('icon-txt')}>
                      <FontAwesomeIcon icon={faHomeUser} className={cx('icon', 'icon-agency')} />
                      {/* <span className={cx('txt')}>Chủ xe:</span> */}
                      <span className={cx('txt')}>{inforVehicleRental?.partnerName}</span>
                      <span className={cx('txt-chat')} onClick={handleSendMessage}>
                        Nhắn tin ngay
                      </span>
                    </div>
                    <div className={cx('icon-txt')}>
                      <FontAwesomeIcon icon={faUser} className={cx('icon', 'icon-owner')} />
                      <span className={cx('txt')}>Người đại diện:</span>
                      <span className={cx('txt')}>{inforVehicleRental?.partnerName}</span>
                    </div>
                    <div className={cx('icon-txt')}>
                      <FontAwesomeIcon icon={faPhone} className={cx('icon', 'icon-phone')} />
                      <span className={cx('txt')}>Số điện thoại:</span>
                      <span className={cx('txt')}>{inforVehicleRental?.partnerPhoneNumber}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Row>
                    <span className={cx('title')}>Đặc điểm</span>
                  </Row>
                  <Row>
                    <Col xs="4" md="6" lg="4">
                      <div className={cx('feature', 'type-vehicle')}>
                        <FontAwesomeIcon icon={faCar} className={cx('icon', 'icon-type')} />
                        <div>
                          <p className={cx('txt', 'name-feature')}>Loại xe</p>
                          <p className={cx('txt', 'content-feature')}>{typeVehicle?.name}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="4" md="6" lg="4">
                      <div className={cx('feature', 'type-vehicle')}>
                        <FontAwesomeIcon icon={faClock} className={cx('icon', 'icon-year')} />
                        <div>
                          <p className={cx('txt', 'name-feature')}>Đời xe</p>
                          <p className={cx('txt', 'content-feature')}>{inforVehicle?.vehicleLife}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="4" md="6" lg="4">
                      <div className={cx('feature', 'type-vehicle')}>
                        <FontAwesomeIcon icon={faBoxArchive} className={cx('icon', 'icon-amount')} />
                        <div>
                          <p className={cx('txt', 'name-feature')}>Số lượng</p>
                          <p className={cx('txt', 'content-feature')}>{inforVehicle?.amount} chiếc</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <span className={cx('title')}>Mô tả</span>
                  <span className={cx('content')}>{inforVehicle?.description}</span>
                </Row>
                <Row>
                  <span className={cx('title')}>Các tiện ích</span>
                  <span className={cx('content')}>{inforVehicle?.ulties}</span>
                </Row>
              </Tab>
              <Tab eventKey="policy" title="Điều khoản">
                <Row>
                  <span className={cx('title')}>Quy định</span>

                  {inforVehicle?.policy
                    .split('@#$%&')
                    .filter(Boolean)
                    .map((value, index) => (
                      <>
                        <span className={cx('content')} key={index}>
                          - {value.trim()}
                        </span>{' '}
                        <br />
                      </>
                    )) || ''}
                </Row>
                <Row>
                  <span className={cx('title')}>Chính sách hủy chuyến</span>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Thời điểm hủy chuyến</th>
                        <th>Khách thuê hủy chuyến</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className={cx('icon-txt')}>
                            <FontAwesomeIcon icon={faStopwatch} className={cx('icon', 'icon-clock-notice')} />
                            <span className={cx('txt')}>Sau thanh toán &lt;= 1 giờ</span>
                          </div>
                        </td>
                        <td>
                          <div className={cx('icon-txt')}>
                            <FontAwesomeIcon icon={faCircleCheck} className={cx('icon', 'icon-tick')} />
                            <span className={cx('txt')}>Hoàn 100% toàn bộ chi phí đã thanh toán</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className={cx('icon-txt')}>
                            <FontAwesomeIcon icon={faStopwatch} className={cx('icon', 'icon-clock-warn')} />
                            <span className={cx('txt')}>Sau thanh toán &gt; 1 giờ</span>
                          </div>
                        </td>
                        <td>
                          <div className={cx('icon-txt')}>
                            <FontAwesomeIcon icon={faCircleXmark} className={cx('icon', 'icon-x')} />
                            <span className={cx('txt')}>Khách thuê hủy chuyến</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className={cx('d-flex')}>
                    <span className={cx('txt', 'note')}>Lưu ý:</span>
                    <span className={cx('txt', 'note-content')}>
                      Mọi tiền bạn đã thanh toán sẽ được hoàn trả 100% nếu chủ xe hủy đơn và hệ thống sẽ đánh giá xe 1
                      sao.
                    </span>
                  </div>
                </Row>
              </Tab>
              <Tab eventKey="rating" title="Đánh giá">
                <div className={cx('content-tab', 'rolling-content-tab')}>
                  {/* <RatingContentList></RatingContentList> */}

                  <div>
                    {Array.isArray(listRating?.result?.result) &&
                      listRating.result.result.map((rating, index) => <RatingContent data={rating} />)}

                    {listRating?.result?.result?.length === 0 && (
                      <div style={{ marginTop: '60px' }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có đánh giá nào." />
                      </div>
                    )}
                    {(listRating === null || listRating === undefined) && (
                      <div style={{ marginTop: '60px' }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có đánh giá nào." />
                      </div>
                    )}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Row>
        </Col>
        <Col xl="4" lg="5" md="6" className={cx('')}>
          <Row className={cx('charge')}>
            <div className={cx('icon-txt', 'd-flex justify-content-center align-items-center')}>
              <FontAwesomeIcon icon={faThumbTack} className={cx('icon', 'm-0')} />
              <span className={cx('txt', 'txt-price-list')}>Bảng giá:</span>
            </div>
            <span className={cx('txt', 'charge-old')}>
              {typeService === 'manned'
                ? inforVehicle?.driverPrice.toLocaleString('vi-VN')
                : inforVehicle?.selfDriverPrice.toLocaleString('vi-VN')}
              đ/ngày
            </span>
            <span className={cx('txt', 'charge-new')}>{Math.floor(newPrice).toLocaleString('vi-VN')}đ/ngày</span>
          </Row>
          <Row className={cx('order')}>
            <InforRental
              typeService={typeService}
              inforVehicleRental={inforVehicleRental}
              newPrice={newPrice}
              startDateTime={startDateTime}
              endDateTime={endDateTime}
            ></InforRental>
          </Row>
          <Row className={cx('surcharge')}>
            <SurchargeFee></SurchargeFee>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default RentalServiceDetail
