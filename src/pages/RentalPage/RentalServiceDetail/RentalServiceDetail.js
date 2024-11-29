import { config } from '~/config'
import classNames from 'classnames/bind'
import styles from './RentalServiceDetail.module.scss'
import { Breadcrumb, Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxArchive,
  faCar,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faLocationDot,
  faPhone,
  faStopwatch,
  faThumbTack,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Rating from '~/components/Rating'
import { images } from '~/assets/images'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import RatingContentList from '~/components/RatingContent/RatingContentList'
import InforRental from '~/components/InforRental'
import SurchargeFee from '~/components/InforRental/SurchargeFee'

const cx = classNames.bind(styles)
function RentalServiceDetail() {
  const location = useLocation()
  const typeService = location.state?.typeService
  const typeVehicle = location.state?.typeVehicle
  const inforVehicle = location.state?.infor
  const manned = 'manned'
  const self_driving = 'self_driving'
  const newPrice = inforVehicle.amount - inforVehicle.amount * (inforVehicle.discount_percentage / 100)
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
      <Row className="mb-5">
        <Col xs="6">
          <div className={cx('d-flex justify-content-start', 'trapezoid_lelf')}>
            <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.vehicle}></img>
          </div>
        </Col>
        {/* ---Trường hợp 2 ảnh--- */}
        {/* <Col xs='6'>
            <div className={cx('d-flex justify-content-end', 'trapezoid_right')}>
              <img className={cx('d-block w-100')} alt="slider1_rental_page" src={images.vehicle1}></img>
            </div>
          </Col> */}

        {/* ---Trường hợp 5 ảnh--- */}
        <Col xs="6" className={cx('')}>
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
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xl="8" lg="7" md="6">
          <Row className="mb-5">
            <div className={cx('d-flex', 'name-location-vehicle')}>
              <span className={cx('name-vehicle')}>{inforVehicle.manufacturer} 2023 </span>
              <Rating></Rating>
            </div>
            <div className={cx('icon-txt')}>
              <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'icon-location')} />
              <span className={cx('txt')}>{inforVehicle.location}</span>
            </div>
          </Row>
          <Row className="mb-5">
            <Tabs defaultActiveKey="information" id="tab-detail-vehicle" className="mb-3">
              <Tab eventKey="information" title="Thông tin">
                <Row>
                  <Col>
                    <div className={cx('icon-txt')}>
                      <FontAwesomeIcon icon={faUser} className={cx('icon', 'icon-owner')} />
                      <span className={cx('txt')}>Chủ xe:</span>
                      <span className={cx('txt')}>Nguyễn Văn An</span>
                    </div>
                    <div className={cx('icon-txt')}>
                      <FontAwesomeIcon icon={faPhone} className={cx('icon', 'icon-phone')} />
                      <span className={cx('txt')}>Số điện thoại:</span>
                      <span className={cx('txt')}>0842059998</span>
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
                          <p className={cx('txt', 'content-feature')}>{typeVehicle.name}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="4" md="6" lg="4">
                      <div className={cx('feature', 'type-vehicle')}>
                        <FontAwesomeIcon icon={faClock} className={cx('icon', 'icon-year')} />
                        <div>
                          <p className={cx('txt', 'name-feature')}>Đời xe</p>
                          <p className={cx('txt', 'content-feature')}>2020</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="4" md="6" lg="4">
                      <div className={cx('feature', 'type-vehicle')}>
                        <FontAwesomeIcon icon={faBoxArchive} className={cx('icon', 'icon-amount')} />
                        <div>
                          <p className={cx('txt', 'name-feature')}>Số lượng</p>
                          <p className={cx('txt', 'content-feature')}>{inforVehicle.quantity} chiếc</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <span className={cx('title')}>Mô tả</span>
                  <span className={cx('content')}>{inforVehicle.description}</span>
                </Row>
                <Row>
                  <span className={cx('title')}>Các tiện ích</span>
                  <span className={cx('content')}>{inforVehicle.ulties}</span>
                </Row>
              </Tab>
              <Tab eventKey="policy" title="Điều khoản">
                <Row>
                  <span className={cx('title')}>Quy định</span>
                  <span className={cx('content')}>
                    - Sử dụng xe đúng mục đích. - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật. - Không
                    sử dụng xe thuê để cầm cố, thế chấp. - Không hút thuốc, nhả kẹo cao su, xả rác trong xe. - Không chở
                    hàng quốc cấm dễ cháy nổ. - Không chở hoa quả, thực phẩm nặng mùi trong xe. - Khi trả xe, nếu xe bẩn
                    hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe. - Xe
                    được giới hạn di chuyển ở mức 400km cho 24h, và lần lượt là 250km, 300km, 350 km cho gói 4h, 8h,
                    12h. Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
                  </span>
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
                <RatingContentList></RatingContentList>
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
            <span className={cx('txt', 'charge-old')}>{inforVehicle.amount.toLocaleString('vi-VN')}đ/ngày</span>
            <span className={cx('txt', 'charge-new')}>{newPrice.toLocaleString('vi-VN')}đ/ngày</span>
          </Row>
          <Row className={cx('order')}>
            <InforRental typeService={typeService}></InforRental>
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
