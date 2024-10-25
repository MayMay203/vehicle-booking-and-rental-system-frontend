import classNames from 'classnames/bind'
import styles from './FormDriverLicense.module.scss'
import { Form } from 'react-bootstrap'
import Button from '../Button'
import { useEffect, useState } from 'react'
import TakePhotoRegister from '../TakePhotoRegister'
const cx = classNames.bind(styles)
function FormDriverLicense({ handleSaveFormDriverLicense }) {
  const [formData, setFormData] = useState({
    number: '',
    date: '',
    licenseClass: '',
  })
  const [activeSave, setActiveSave] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isCorrectDate, setIsCorrectDate] = useState(false)
  const [allImagesSelected, setAllImagesSelected] = useState(false)
  const licenseClasses = [
    { value: '', label: 'Chọn hạng bằng lái' },
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'A3', label: 'A3' },
    { value: 'A4', label: 'A4' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'FB2', label: 'FB2' },
    { value: 'FC', label: 'FC' },
    { value: 'FD', label: 'FD' },
    { value: 'FE', label: 'FE' },
  ]
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    const datesAreValid = isCorrectDate
    setActiveSave(allFieldsFilled && datesAreValid && allImagesSelected)
  }, [formData, isCorrectDate, allImagesSelected])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/
    if (name === 'date') {
      if (!dateRegex.test(value)) {
        setIsCorrectDate(false)
      } else {
        setIsCorrectDate(true)
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setIsSaved(false)
  }
  const handleSave = () => {
    setAllImagesSelected(true)
  }
  const handleCancel = (e) => {}
  return (
    <Form className={cx('form-infor-ID')}>
      <TakePhotoRegister
        number_photo={2}
        name_photos={['Mặt trước', 'Mặt sau']}
        noButton={true}
        handleSave={handleSave}
      ></TakePhotoRegister>
      <Form.Group className={cx('txt', 'mb-3', 'mt-5')} controlId="formInforID.ControlInput1">
        <Form.Label>
          Số bằng lái <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="number"
          type="text"
          placeholder="049350226688"
          aria-label="number"
          onChange={handleInputChange}
          className={cx('txt')}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput2">
        <Form.Label>
          Ngày cấp <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="dd-mm-yyyy"
          name="date"
          aria-label="date"
          className={cx('txt', 'm-0')}
          onChange={handleInputChange}
        />
        {!isCorrectDate && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput3">
        <Form.Label>
          Hạng bằng lái <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select
          name="licenseClass"
          aria-label="licenseClass"
          className={cx('txt', 'selectbox')}
          onChange={handleInputChange}
        >
          {licenseClasses.map((licenseClass, index) => (
            <option key={index} value={licenseClass.value}>
              {licenseClass.label}
            </option>
          ))}
        </Form.Select>
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
            event.preventDefault()
            setIsSaved(true)
            setActiveSave(false)
            handleSaveFormDriverLicense()
          }}
        >
          {!isSaved ? 'Lưu' : 'Đã lưu'}
        </Button>
      </div>
    </Form>
  )
}
export default FormDriverLicense
