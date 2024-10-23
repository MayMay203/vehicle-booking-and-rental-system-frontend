import classNames from "classnames/bind"
import styles from './FormBank.module.scss'
import { Form } from "react-bootstrap"
import Button from "../Button"
const  cx = classNames.bind(styles)
function FormBank({ handleSaveFormBank }) {
  const banks = [
    { value: '', label: 'Chọn ngân hàng' },
    { value: 'vietcombank', label: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)' },
    { value: 'vietinbank', label: 'Ngân hàng TMCP Công Thương Việt Nam (Vietinbank)' },
    { value: 'bidv', label: 'Ngân hàng TMCP Đầu Tư và Phát Triển Việt Nam (BIDV)' },
    { value: 'agribank', label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank)' },
    { value: 'techcombank', label: 'Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)' },
    { value: 'mbbank', label: 'Ngân hàng TMCP Quân Đội (MB Bank)' },
    { value: 'acb', label: 'Ngân hàng TMCP Á Châu (ACB)' },
    { value: 'sacombank', label: 'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)' },
    { value: 'vpbank', label: 'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank)' },
    { value: 'hdbank', label: 'Ngân hàng TMCP Phát triển Nhà Thành phố Hồ Chí Minh (HDBank)' },
    { value: 'shinhanbank', label: 'Ngân hàng TNHH MTV Shinhan Việt Nam (Shinhan Bank)' },
    { value: 'tpbank', label: 'Ngân hàng TMCP Tiên Phong (TPBank)' },
    { value: 'vib', label: 'Ngân hàng TMCP Quốc tế Việt Nam (VIB)' },
    { value: 'scb', label: 'Ngân hàng TMCP Sài Gòn (SCB)' },
    { value: 'ocb', label: 'Ngân hàng TMCP Phương Đông (OCB)' },
    { value: 'seabank', label: 'Ngân hàng TMCP Đông Nam Á (SeaBank)' },
    { value: 'eximbank', label: 'Ngân hàng TMCP Xuất Nhập Khẩu Việt Nam (Eximbank)' },
    { value: 'pvcombank', label: 'Ngân hàng TMCP Đại Chúng Việt Nam (PVcomBank)' },
  ]
  const sortedBanks = banks.sort((a, b) => a.label.localeCompare(b.label))
  return (
    <Form className={cx('form-bank')}>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formBank.ControlInput1">
        <Form.Label>
          Tên chủ tài khoản <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control type="text" placeholder="Nguyễn Văn A" aria-label="name" className={cx('txt')} />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formBank.ControlInput2">
        <Form.Label>
          Số tài khoản <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="10042003555"
          aria-label="number-bank"
          className={cx('txt')}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
          }}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formBank.ControlInput3">
        <Form.Label>
          Tên ngân hàng <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select aria-label="name-bank" className={cx('txt', 'selectbox')}>
          {sortedBanks.map((bank, index) => (
            <option key={index} value={bank.value}>
              {bank.label}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Tôi cam kết cung cấp thông tin tài khoản ngân hàng chính chủ của tôi"
            className="lh-base fs-4"
          />
        </Form.Group>
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button outline className={cx('btn', 'btn-cancel')}>
          Hủy
        </Button>
        <Button primary className={cx('btn', 'btn-save')} onClick={handleSaveFormBank}>
          Lưu
        </Button>
      </div>
    </Form>
  )
}
export default FormBank