import classNames from 'classnames/bind'
import styles from './UpdateBusTrip.module.scss'
import { Tab } from 'bootstrap/dist/js/bootstrap.min'
import { Col, Image, InputGroup, Row, Table, Tabs, Form } from 'react-bootstrap'
import RatingContentList from '~/components/RatingContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faClock,
  faClockRotateLeft,
  faCouch,
  faTicket,
  faBottleWater,
  faFan,
  faHammer,
  faMattressPillow,
} from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
function UpdateBusTrip() {
  const listUtilities = [
    { id: 1, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
    { id: 2, img: faMattressPillow, name: 'Gối nằm', description: 'Trên xe có trang bị gối nằm.' },
    { id: 3, img: faFan, name: 'Điều hòa', description: 'Trên xe có trang bị điều hòa.' },
    {
      id: 4,
      img: faHammer,
      name: 'Búa phá kính',
      description: 'Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp..',
    },
  ]
  return (
    <div className={cx('container mt-5 mb-5', 'wrap-container')}>
      <Row className={cx('form-infor-bus-trip', 'justify-content-center')}>
        <p className={cx('title-form')}>Thông tin chuyến xe</p>
        <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput1">
            <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
            <Form.Select
              value="Đà Nẵng"
              aria-label="departure"
              className={cx('txt', 'selectbox', 'infor-item')}
              readOnly
              disabled
            >
              <option value="Đà Nẵng">Đà Nẵng</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput2">
            <Form.Label className="mb-3">Ngày hoạt động</Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                value="22/10/2024"
                name="date"
                aria-label="date"
                className={cx('txt')}
                readOnly
                disabled
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faCalendar} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput3">
            <Form.Label className="mb-3">Giá vé</Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                value="340.000"
                name="price"
                aria-label="price"
                className={cx('txt')}
                readOnly
                disabled
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faTicket} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput4">
            <Form.Label className="mb-3">Loại phương tiện</Form.Label>
            <Form.Select
              value="Limousine34GiuongNam"
              aria-label="typeVehicle"
              className={cx('txt', 'selectbox', 'infor-item')}
              readOnly
              disabled
            >
              <option value="Limousine34GiuongNam">Limousine 34 giường nằm</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput5">
            <Form.Label className="mb-3">Biển số xe</Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                value="30G-49344"
                name="licensePlateNumber"
                aria-label="licensePlateNumber"
                className={cx('txt')}
                readOnly
                disabled
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faTicket} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className={cx('col-sm-12 col-md-6')}>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
            <Form.Label className="mb-3">Địa điểm đến</Form.Label>
            <Form.Select
              value="Hà Nội"
              aria-label="destination"
              className={cx('txt', 'selectbox', 'infor-item')}
              readOnly
              disabled
            >
              <option value="Hà Nội">Hà Nội</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput12">
            <Form.Label className="mb-3">Giờ khởi hành</Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                value="13:00"
                name="time"
                aria-label="time"
                className={cx('txt')}
                readOnly
                disabled
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faClock} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
            <Form.Label className="mb-3">Thời gian hành trình</Form.Label>
            <InputGroup className={cx('txt', 'infor-item')}>
              <Form.Control
                type="text"
                value="2 tiếng"
                name="extend-time"
                aria-label="extend-time"
                className={cx('txt')}
                readOnly
                disabled
              />
              <InputGroup.Text className={cx('txt')}>
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput14">
                <Form.Label className="mb-3">Số ghế</Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    value="34"
                    name="numberSeat"
                    aria-label="numberSeat"
                    className={cx('txt')}
                    readOnly
                    disabled
                  />
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faCouch} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput15">
                <Form.Label className="mb-3">Còn trống</Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    value="11"
                    name="emptySeat"
                    aria-label="emptySeat"
                    className={cx('txt')}
                    readOnly
                    disabled
                  />
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faCouch} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput16">
            <Form.Label className="mb-3">Trạng thái hoạt động</Form.Label>
            <Form.Select
              value="status"
              aria-label="status"
              className={cx('txt', 'selectbox', 'infor-item')}
              readOnly
              disabled
            >
              <option value="on">Đang hoạt động</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <div className="mb-3 justify-content-center">
        <Tabs defaultActiveKey="image" id="tab-detail-vehicle" className={cx('justify-content-center')}>
          <Tab eventKey="image" title="Hình ảnh">
            <Row className={cx('content-tab', 'justify-content-start')}>
              <span className={cx('title')}>Hình ảnh</span>
              <Col>
                <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
              </Col>
              <Col>
                <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
              </Col>
              <Col>
                <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
              </Col>
              <Col>
                <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="policy" title="Chính sách">
            <Row className={cx('content-tab')}>
              <span className={cx('title')}>Chính sách</span>
              <span className={cx('content')}>
                - Sử dụng xe đúng mục đích.
                <br /> - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
                <br /> - Không sử dụng xe thuê để cầm cố, thế chấp.
                <br /> - Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
                <br /> - Không chở hàng quốc cấm dễ cháy nổ.
                <br /> - Không chở hoa quả, thực phẩm nặng mùi trong xe.
                <br /> - Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi
                phụ thu phí vệ sinh xe.
                <br /> - Xe được giới hạn di chuyển ở mức 400km cho 24h, và lần lượt là 250km, 300km, 350 km cho gói 4h,
                8h, 12h.
                <br /> Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
              </span>
            </Row>
          </Tab>
          <Tab eventKey="utility" title="Tiện ích">
            <Row className={cx('content-tab')}>
              <span className={cx('title')}>Tiện ích</span>
              <Table striped bordered hover className={cx('table-container')}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên tiện ích</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                  </tr>
                </thead>
                <tbody className={cx('body-table')}>
                  {listUtilities.map((utility, index) => (
                    <tr key={utility.id}>
                      <td className="align-middle text-center">
                        <span className={cx('txt', 'text-center')}>{index + 1}</span>
                      </td>
                      <td className="align-middle">
                        <div className={cx('icon-txt')}>
                          <span className={cx('txt')}>{utility.name}</span>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className={cx('icon-txt')}>
                          <span className={cx('txt')}>{utility.description}</span>
                        </div>
                      </td>
                      <td className="align-items-center text-center">
                        <FontAwesomeIcon icon={utility.img} className={cx('icon-utility')}></FontAwesomeIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Tab>
          <Tab eventKey="rating" title="Đánh giá">
            <Row className={cx('content-tab')}>
              <span className={cx('title')}>Đánh giá</span>
              <RatingContentList></RatingContentList>
            </Row>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
export default DetailBusTrip
