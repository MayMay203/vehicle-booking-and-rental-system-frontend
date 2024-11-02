import classNames from "classnames/bind"
import styles from './AddBusTrip.module.scss'
import { Col, InputGroup, Row, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faClock,
  faClockRotateLeft,
  faCouch,
  faTicket,
} from '@fortawesome/free-solid-svg-icons'
import Button from "~/components/Button"
import { useState } from "react"
const cx = classNames.bind(styles)
function AddBusTrip(){
    const provinces = [
      { value: '', label: 'Chọn tỉnh/thành phố' },
      { value: 'An Giang', label: 'An Giang' },
      { value: 'Bà Rịa - Vũng Tàu', label: 'Bà Rịa - Vũng Tàu' },
      { value: 'Bắc Giang', label: 'Bắc Giang' },
      { value: 'Bắc Kạn', label: 'Bắc Kạn' },
      { value: 'Bạc Liêu', label: 'Bạc Liêu' },
      { value: 'Bắc Ninh', label: 'Bắc Ninh' },
      { value: 'Bến Tre', label: 'Bến Tre' },
      { value: 'Bình Định', label: 'Bình Định' },
      { value: 'Bình Dương', label: 'Bình Dương' },
      { value: 'Bình Phước', label: 'Bình Phước' },
      { value: 'Bình Thuận', label: 'Bình Thuận' },
      { value: 'Cà Mau', label: 'Cà Mau' },
      { value: 'Cần Thơ', label: 'Cần Thơ' },
      { value: 'Cao Bằng', label: 'Cao Bằng' },
      { value: 'Đà Nẵng', label: 'Đà Nẵng' },
      { value: 'Đắk Lắk', label: 'Đắk Lắk' },
      { value: 'Đắk Nông', label: 'Đắk Nông' },
      { value: 'Điện Biên', label: 'Điện Biên' },
      { value: 'Đồng Nai', label: 'Đồng Nai' },
      { value: 'Đồng Tháp', label: 'Đồng Tháp' },
      { value: 'Gia Lai', label: 'Gia Lai' },
      { value: 'Hà Giang', label: 'Hà Giang' },
      { value: 'Hà Nam', label: 'Hà Nam' },
      { value: 'Hà Nội', label: 'Hà Nội' },
      { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
      { value: 'Hải Dương', label: 'Hải Dương' },
      { value: 'Hải Phòng', label: 'Hải Phòng' },
      { value: 'Hậu Giang', label: 'Hậu Giang' },
      { value: 'Hòa Bình', label: 'Hòa Bình' },
      { value: 'Hưng Yên', label: 'Hưng Yên' },
      { value: 'Khánh Hòa', label: 'Khánh Hòa' },
      { value: 'Kiên Giang', label: 'Kiên Giang' },
      { value: 'Kon Tum', label: 'Kon Tum' },
      { value: 'Lai Châu', label: 'Lai Châu' },
      { value: 'Lâm Đồng', label: 'Lâm Đồng' },
      { value: 'Lạng Sơn', label: 'Lạng Sơn' },
      { value: 'Lào Cai', label: 'Lào Cai' },
      { value: 'Long An', label: 'Long An' },
      { value: 'Nam Định', label: 'Nam Định' },
      { value: 'Nghệ An', label: 'Nghệ An' },
      { value: 'Ninh Bình', label: 'Ninh Bình' },
      { value: 'Ninh Thuận', label: 'Ninh Thuận' },
      { value: 'Phú Thọ', label: 'Phú Thọ' },
      { value: 'Phú Yên', label: 'Phú Yên' },
      { value: 'Quảng Bình', label: 'Quảng Bình' },
      { value: 'Quảng Nam', label: 'Quảng Nam' },
      { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
      { value: 'Quảng Ninh', label: 'Quảng Ninh' },
      { value: 'Quảng Trị', label: 'Quảng Trị' },
      { value: 'Sóc Trăng', label: 'Sóc Trăng' },
      { value: 'Sơn La', label: 'Sơn La' },
      { value: 'Tây Ninh', label: 'Tây Ninh' },
      { value: 'Thái Bình', label: 'Thái Bình' },
      { value: 'Thái Nguyên', label: 'Thái Nguyên' },
      { value: 'Thanh Hóa', label: 'Thanh Hóa' },
      { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
      { value: 'Tiền Giang', label: 'Tiền Giang' },
      { value: 'TP Hồ Chí Minh', label: 'TP Hồ Chí Minh' },
      { value: 'Trà Vinh', label: 'Trà Vinh' },
      { value: 'Tuyên Quang', label: 'Tuyên Quang' },
      { value: 'Vĩnh Long', label: 'Vĩnh Long' },
      { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
      { value: 'Yên Bái', label: 'Yên Bái' },
    ]
    const typeVehicles = [
      { value: '', label: 'Chọn loại phương tiện' },
      { value: 'Limousine34GiuongNam', label: 'Limousine34GiuongNam' },
    ]
    const statuses = [
      { value: '', label: 'Chọn trạng thái' },
      { value: 'Đang hoạt động', label: 'Đang hoạt động' },
      { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
      { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
    ]
    const [formAdd, setFormAdd] = useState({
        
    })
    return (
      <div className={cx('container mt-5 mb-5', 'wrap-container')}>
        <Row className={cx('form-add-bus-trip', 'justify-content-center')}>
          <p className={cx('title-form')}>Thêm chuyến xe</p>
          <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
              <Form.Label className="mb-3">
                Địa điểm xuất phát<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select aria-label="departure" className={cx('txt', 'selectbox', 'add-item')}>
                {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput2">
              <Form.Label className="mb-3">
                Ngày hoạt động<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="text"
                  placeholder="dd/mm/yyyy"
                  name="date"
                  aria-label="date"
                  className={cx('txt')}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faCalendar} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
                  <Form.Label className="mb-3">
                    Giá vé <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup className={cx('txt', 'infor-item')}>
                    <Form.Control
                      type="text"
                      placeholder="0 vnđ"
                      name="price"
                      aria-label="price"
                      className={cx('txt')}
                    />
                    <InputGroup.Text className={cx('txt')}>
                      <FontAwesomeIcon icon={faTicket} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput33">
                  <Form.Label className="mb-3">Giảm giá</Form.Label>
                  <InputGroup className={cx('txt', 'infor-item')}>
                    <Form.Control
                      type="text"
                      placeholder="0%"
                      name="reduce"
                      aria-label="reduce"
                      className={cx('txt')}
                    />
                    <InputGroup.Text className={cx('txt')}>
                      <FontAwesomeIcon icon={faTicket} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
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
                Loại phương tiện<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select aria-label="typeVehicle" className={cx('txt', 'selectbox', 'infor-item')} disabled>
                {typeVehicles.map((typeVehicle, index) => (
                  <option key={index} value={typeVehicle.value}>
                    {typeVehicle.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput11">
              <Form.Label className="mb-3">
                Địa điểm đến<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select aria-label="destination" className={cx('txt', 'selectbox', 'infor-item')}>
                {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput12">
              <Form.Label className="mb-3">
                Giờ khởi hành<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control type="text" placeholder="hh:mm" name="time" aria-label="time" className={cx('txt')} />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faClock} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput13">
              <Form.Label className="mb-3">
                Thời gian hành trình<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="text"
                  placeholder="0 tiếng"
                  name="extend-time"
                  aria-label="extend-time"
                  className={cx('txt')}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput16">
              <Form.Label className="mb-3">
                Trạng thái hoạt động<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select aria-label="status" className={cx('txt', 'selectbox', 'infor-item')}>
                {statuses.map((status, index) => (
                  <option key={index} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput14">
                  <Form.Label className="mb-3">
                    Số ghế <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup className={cx('txt', 'infor-item')}>
                    <Form.Control
                      type="text"
                      placeholder="0"
                      name="numberSeat"
                      aria-label="numberSeat"
                      className={cx('txt')}
                      disabled
                    />
                    <InputGroup.Text className={cx('txt')}>
                      <FontAwesomeIcon icon={faCouch} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button outline className="ms-5 me-5">
              Hủy
            </Button>
            <Button primary className="ms-5 me-5">
              Thêm
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )
}
export default AddBusTrip