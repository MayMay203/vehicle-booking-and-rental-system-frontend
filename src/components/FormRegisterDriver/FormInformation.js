import classNames from 'classnames/bind'
import styles from './FormRegisterDriver.module.scss'
import { Form } from 'react-bootstrap'
const cx = classNames.bind(styles)
function FormInformation() {
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
  const type_vehicle = [
    { value: '', label: 'Chọn loại xe' },
    { value: 'Xe máy', label: 'Xe máy' },
    { value: 'Xe điện', label: 'Xe điện' },
    { value: 'Xe ô tô 4 chỗ', label: 'Xe ô tô 4 chỗ' },
  ]
  return (
    <Form className={cx('form-infor')}>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput1">
        <Form.Label>Họ và tên</Form.Label>
        <Form.Control type="text" placeholder="Nguyễn Văn A" aria-label="name" className={cx('txt')} />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput2">
        <Form.Label>Số điện thoại</Form.Label>
        <Form.Control
          type="text"
          placeholder="0842059055"
          aria-label="phonenumber"
          className={cx('txt')}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10) // Giới hạn số ký tự nhập vào 10 số
            }
          }}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput3">
        <Form.Label>Địa chỉ email</Form.Label>
        <Form.Control type="email" placeholder="pbl06@gmail.com" aria-label="gmail" className={cx('txt')} />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput4">
        <Form.Label>Khu vực</Form.Label>
        <Form.Select aria-label="location" className={cx('txt', 'selectbox')}>
          {provinces.map((province, index) => (
            <option key={index} value={province.value}>
              {province.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="row">
        <Form.Group className={cx('txt', 'mb-3', 'col-6')} controlId="formInfor.ControlInput5">
          <Form.Label>Loại xe</Form.Label>
          <Form.Select aria-label="type-vehicle" className={cx('txt', 'selectbox')}>
            {type_vehicle.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'mb-3', 'col-6')} controlId="formInfor.ControlInput1">
          <Form.Label>Biển số xe</Form.Label>
          <Form.Control type="text" placeholder="92H-63 3647" aria-label="name" className={cx('txt')} />
        </Form.Group>
      </div>
    </Form>
  )
}
export default FormInformation
