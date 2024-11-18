import classNames from 'classnames/bind'
import styles from './FormInforServiceRental.module.scss'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { faBoxArchive, faClock, faCodeBranch, faDongSign, faPercent } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const cx = classNames.bind(styles)
function FormInforServiceRental({ mode, formData, handleInputChange }) {
    const view = mode==='view'
  const typeVehicles = [
    { value: '', label: 'Chọn loại xe' },
    { value: 'Xe máy', label: 'Xe máy' },
    { value: 'Xe ô tô 4 chỗ', label: 'Xe ô tô 4 chỗ' },
    { value: 'Xe ô tô 7 chỗ', label: 'Xe ô tô 7 chỗ' },
  ]
  const typeServices = [
    { value: '', label: 'Chọn loại dịch vụ' },
    { value: 'Thuê xe tự lái', label: 'Thuê xe tự lái' },
    { value: 'Thuê xe có người lái', label: 'Thuê xe có người lái' },
    { value: 'Cả 2 dịch vụ', label: 'Cả 2 dịch vụ' },
  ]
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
  const statuses = [
    { value: 'Đang hoạt động', label: 'Đang hoạt động' },
    { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
    { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
  ]
  return (
    <>
      <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput1">
          <Form.Label className="mb-3">Hãng xe<span className="text-danger">*</span></Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="text"
              value={formData.car_company}
              name="car_company"
              aria-label="car_company"
              className={cx('txt')}
              onChange={handleInputChange}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput2">
          <Form.Label className="mb-3">
            Đời xe <span className="text-danger">*</span></Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="text"
              value={formData.car_year}
              name="car_year"
              aria-label="car_year"
              className={cx('txt')}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faClock} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput3">
          <Form.Label className="mb-3">
            Loại dịch vụ<span className="text-danger">*</span></Form.Label>
          <Form.Select
            value={formData.type_service}
            aria-label="type_service"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
          >
            {typeServices.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput4">
          <Form.Label className="mb-3">
            Giá tính theo<span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="price_according"
            aria-label="price_according"
            className={cx('txt', 'selectbox', 'infor-item')}
            value={formData.price_according}
            readOnly={view}
            disabled={view}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput5">
          <Form.Label className="mb-3">
            Địa chỉ<span className="text-danger">*</span></Form.Label>
          <Form.Select
            value={formData.location}
            name="location"
            aria-label="location"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
          >
            {provinces.map((province, index) => (
              <option key={index} value={province.value}>
                {province.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput11">
          <Form.Label className="mb-3">Loại xe<span className="text-danger">*</span></Form.Label>
          <Form.Select
            value={formData.type_vehicle}
            aria-label="type_vehicle"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
          >
            {typeVehicles.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput6">
          <Form.Label className="mb-3">Số lượng<span className="text-danger">*</span></Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="text"
              value={formData.quantity}
              name="quantity"
              aria-label="quantity"
              className={cx('txt')}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faBoxArchive} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <div className="d-flex">
          {(formData.type_service === 'Thuê xe tự lái' || formData.type_service === 'Cả 2 dịch vụ') && (
            <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput7">
              <Form.Label className="mb-3">
                Giá thuê tự lái<span className="text-danger">*</span></Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="text"
                  value={formData.price1}
                  name="price1"
                  aria-label="price1"
                  className={cx('txt')}
                  onChange={handleInputChange}
                  readOnly={view}
                  disabled={view}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faDongSign} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )}

          {(formData.type_service === 'Thuê xe có người lái' || formData.type_service === 'Cả 2 dịch vụ') && (
            <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput8">
              <Form.Label className="mb-3">
                Giá thuê có người lái<span className="text-danger">*</span></Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="text"
                  value={formData.price2}
                  name="price2"
                  aria-label="price2"
                  className={cx('txt')}
                  onChange={handleInputChange}
                  readOnly={view}
                  disabled={view}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faDongSign} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )}
        </div>
        <Form.Group className={cx('txt', 'mb-5', 'padding')} controlId="formInfor.ControlInput9">
          <Form.Label className="mb-3">Giảm giá<span className="text-danger">*</span></Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="text"
              value={formData.reduce}
              name="reduce"
              aria-label="reduce"
              className={cx('txt')}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faPercent} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput10">
          <Form.Label className="mb-3">
            Trạng thái<span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="status"
            aria-label="status"
            className={cx('txt', 'selectbox', 'infor-item')}
            value={formData.status}
            onChange={handleInputChange}
            readOnly={view}
            disabled={view}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status.value}>
                {status.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput9">
        <Form.Label className="mb-3">Mô tả<span className="text-danger">*</span></Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.description}
          maxLength={500}
          readOnly={view}
          disabled={view}
        />
        <p className={cx('max-description')}>{formData.description.length}/500</p>
      </Form.Group>
      <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput9">
        <Form.Label className="mb-3">Tiện ích<span className="text-danger">*</span></Form.Label>
        <Form.Control
          name="utility"
          as="textarea"
          rows={3}
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.utility}
          maxLength={300}
          readOnly={view}
          disabled={view}
        />
        <p className={cx('max-description')}>{formData.description.length}/300</p>
      </Form.Group>
    </>
  )
}
export default FormInforServiceRental
