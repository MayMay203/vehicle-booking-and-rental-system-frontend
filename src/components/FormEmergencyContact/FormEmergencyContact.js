import classNames from 'classnames/bind'
import styles from './FormEmergencyContact.module.scss'
import { Form } from 'react-bootstrap'
import Button from '../Button'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)
function FormEmergencyContact({ handleSaveFormEmergencyContact }) {
  const [formData, setFormData] = useState({
    nameRepre: '',
    relation: '',
    phoneRepre: '',
    temporaryAddress: '',
  })
  const [activeSave, setActiveSave] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    setActiveSave(allFieldsFilled)
  }, [formData])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setIsSaved(false)
  }
  const handleCancel = (e) => {}
  return (
    <Form className={cx('form-emergency-contact')}>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formEmergencyContact.ControlInput1">
        <Form.Label>
          Tên người liên hệ khẩn cấp<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="nameRepre"
          type="text"
          placeholder="Bố, mẹ, anh chị em,..."
          aria-label="name"
          onChange={handleInputChange}
          className={cx('txt')}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formEmergencyContact.ControlInput2">
        <Form.Label>
          Quan hệ<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="relation"
          type="text"
          placeholder="Nguyễn Văn A"
          aria-label="name"
          onChange={handleInputChange}
          className={cx('txt')}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formEmergencyContact.ControlInput3">
        <Form.Label>
          Điện thoại liên hệ khẩn cấp<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="0842059055"
          name="phoneRepre"
          aria-label="phonenumber"
          className={cx('txt')}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10) // Giới hạn số ký tự nhập vào 10 số
            }
          }}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formEmergencyContact.ControlInput4">
        <Form.Label>
          Địa chỉ thường trú <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="temporaryAddress"
          type="text"
          placeholder="Bố, mẹ, anh chị em,..."
          aria-label="name"
          onChange={handleInputChange}
          className={cx('txt')}
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button outline className={cx('btn', 'btn-cancel')} onClick={() => handleCancel()}>
          Hủy
        </Button>
        <Button
          primary
          className={cx('btn', 'btn-save')}
          disabled={!activeSave}
          onClick={(event) => {
            event.preventDefault() // Ngăn chặn việc tải lại trang
            setIsSaved(true)
            setActiveSave(false)
            handleSaveFormEmergencyContact()
          }}
        >
          {!isSaved ? 'Lưu' : 'Đã lưu'}
        </Button>
      </div>
    </Form>
  )
}
export default FormEmergencyContact
