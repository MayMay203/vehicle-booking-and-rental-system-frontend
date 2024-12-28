import classNames from "classnames/bind"
import styles from './FormBank.module.scss'
import { Form } from "react-bootstrap"
import Button from "../Button"
import { useEffect, useState } from "react"
import { getAllBankAccounts } from '~/apiServices/bankAccount/getAllBankAccount'
const cx = classNames.bind(styles)
function FormBank({
  updateActive = undefined,
  noButton,
  setActiveNextFormBank = undefined,
  formBank,
  handleFormBankChange = undefined,
  handleSaveFormBank,
}) {
  const [banks, setBanks] = useState([])
  useEffect(() => {
    async function fetchAllBanks() {
      const data = await getAllBankAccounts()
      if (data) {
        setBanks(
          data
            .map((item) => ({ value: item.shortName, label: item.name }))
            .sort((a, b) => a.label.localeCompare(b.label)),
        )
      }
    }
    fetchAllBanks()
  }, [])
  const [formData, setFormData] = useState(formBank)
  const [activeSave, setActiveSave] = useState(updateActive ? updateActive : false)
  const [isSaved, setIsSaved] = useState(updateActive ? updateActive : false)
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => {
      if (typeof value === 'boolean') {
        return value === true
      }
      return value.trim() !== ''
    })
    setActiveSave(allFieldsFilled)
    setActiveNextFormBank?.(allFieldsFilled)
    handleFormBankChange?.(formData)
  }, [formData, setActiveNextFormBank, handleFormBankChange])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setIsSaved(false)
  }
  const handleCancel = (e) => {}
  return (
    <Form className={cx('form-bank')}>
      <Form.Group
        className={cx({ txt: !noButton }, { 'txt-noButton': noButton }, 'mb-3')}
        controlId="formBank.ControlInput1"
      >
        <Form.Label>
          Tên chủ tài khoản <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Nguyễn Văn A"
          aria-label="name"
          onChange={handleInputChange}
          className={cx({ txt: !noButton }, { 'txt-noButton': noButton })}
          value={formData.name}
        />
      </Form.Group>
      <Form.Group
        className={cx({ txt: !noButton }, { 'txt-noButton': noButton }, 'mb-3')}
        controlId="formBank.ControlInput2"
      >
        <Form.Label>
          Số tài khoản <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="10042003555"
          name="numberBank"
          aria-label="number-bank"
          className={cx({ txt: !noButton }, { 'txt-noButton': noButton })}
          onChange={handleInputChange}
          value={formData.numberBank}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
          }}
        />
      </Form.Group>
      <Form.Group
        className={cx({ txt: !noButton }, { 'txt-noButton': noButton }, 'mb-3')}
        controlId="formBank.ControlInput3"
      >
        <Form.Label>
          Tên ngân hàng <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select
          name="nameBank"
          aria-label="name-bank"
          className={cx({ txt: !noButton }, { 'txt-noButton': noButton }, 'selectbox')}
          onChange={handleInputChange}
          value={formData.nameBank}
        >
          {banks.map((bank, index) => (
            <option key={index} value={bank.value}>
              {bank.label + '(' + bank.value + ')'}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            name="commit"
            type="checkbox"
            label="Tôi cam kết cung cấp thông tin tài khoản ngân hàng chính chủ của tôi"
            className="lh-base fs-4"
            onChange={handleInputChange}
            checked={formData.commit}
          />
        </Form.Group>
      </Form.Group>
      {!noButton && (
        <div className="d-flex justify-content-center">
          <Button outline className={cx('btn', 'btn-cancel')} onClick={() => handleCancel()}>
            Hủy
          </Button>
          <Button
            primary
            className={cx('btn', 'btn-save')}
            disabled={!activeSave || isSaved}
            onClick={(event) => {
              event.preventDefault()
              setIsSaved(true)
              setActiveSave(false)
              handleSaveFormBank(formData)
            }}
          >
            {!isSaved ? 'Lưu' : 'Đã lưu'}
          </Button>
        </div>
      )}
    </Form>
  )
}
export default FormBank