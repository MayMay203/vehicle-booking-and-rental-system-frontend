import classNames from 'classnames/bind'
import styles from './FormInforID.module.scss'
import { Form } from 'react-bootstrap'
import Button from '../Button'
import { useEffect, useState } from 'react'
import TakePhotoRegister from '../TakePhotoRegister'
const cx = classNames.bind(styles)
function FormInforID({ handleSaveFormInforID }) {
  const [formData, setFormData] = useState({
    number: '',
    date: '',
    place: '',
    expiryDate: '',
  })
  const [activeSave, setActiveSave] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isCorrectDate, setIsCorrectDate] = useState(false)
  const [isCorrectExpiryDate, setIsCorrectExpiryDate] = useState(false)
  const [allImagesSelected, setAllImagesSelected] = useState(false)
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    const datesAreValid = isCorrectDate && isCorrectExpiryDate
    setActiveSave(allFieldsFilled && datesAreValid && allImagesSelected)
  }, [formData, isCorrectDate, isCorrectExpiryDate, allImagesSelected])
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

    if (name === 'expiryDate') {
      if (!dateRegex.test(value)) {
        setIsCorrectExpiryDate(false)
      } else {
        setIsCorrectExpiryDate(true)
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
          Số CMND/ Số CCCD/ Hộ chiếu <span className="text-danger">*</span>
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
          placeholder="12-01-2003"
          name="date"
          aria-label="date"
          className={cx('txt', 'm-0')}
          onChange={handleInputChange}
        />
        {!isCorrectDate && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput3">
        <Form.Label>
          Nơi cấp <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="place"
          type="text"
          placeholder="Công an trật tự an toàn..."
          aria-label="place"
          onChange={handleInputChange}
          className={cx('txt')}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput4">
        <Form.Label>
          Ngày hết hạn<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="12-01-2003"
          name="expiryDate"
          aria-label="expiryDate"
          className={cx('txt', 'm-0')}
          onChange={handleInputChange}
        />
        {!isCorrectExpiryDate && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
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
            handleSaveFormInforID()
          }}
        >
          {!isSaved ? 'Lưu' : 'Đã lưu'}
        </Button>
      </div>
    </Form>
  )
}
export default FormInforID
