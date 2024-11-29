import classNames from 'classnames/bind'
import styles from './FormInforID.module.scss'
import { Form } from 'react-bootstrap'
import Button from '../Button'
import { useEffect, useState } from 'react'
import TakePhotoRegister from '../TakePhotoRegister'
const cx = classNames.bind(styles)
function FormInforID({ updateActive, formInforID, handleSaveFormInforID }) {
  const [formData, setFormData] = useState(formInforID)
  const [activeSave, setActiveSave] = useState(updateActive)
  const [isSaved, setIsSaved] = useState(updateActive)
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/
  const [isCorrectDate, setIsCorrectDate] = useState(dateRegex.test(formData.dateOfIssue))
  const [isCorrectExpiryDate, setIsCorrectExpiryDate] = useState(dateRegex.test(formData.expiryDate))
  // const [allImagesSelected, setAllImagesSelected] = useState(formData.im)
  const placeOfIssue = [
    { value: '', label: 'Chọn nơi cấp' },
    { value: 'Cục Cảnh sát Q.lý HC về TTXH', label: 'Cục Cảnh sát Q.lý HC về TTXH' },
    { value: 'Cục CS ĐKQL CT và DLQG về DC', label: 'Cục CS ĐKQL CT và DLQG về DC' },
    { value: 'Bộ công an', label: 'Bộ công an' },
  ]
  useEffect(() => {
    // const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    // Tạo một bản sao của formData nhưng loại bỏ trường citizenImages
    const { citizenImages, ...restOfFormData } = formData
    const allFieldsFilled =
      Object.values(restOfFormData).every((value) => value && value.trim() !== '') &&
      formData.citizenImages.every((img) => img !== '')
    const datesAreValid = isCorrectDate && isCorrectExpiryDate
    setActiveSave(allFieldsFilled && datesAreValid)
  }, [formData, isCorrectDate, isCorrectExpiryDate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'dateOfIssue') {
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
  const handleSave = (id, images) => {
    // setAllImagesSelected(true)
    setFormData((formDataPrev) => ({
      ...formDataPrev,
      citizenImages: images,
    }))
    console.log("ảnh ID:", formData)
    // handleSaveFormInforID((formDataPrev) => ({
    //   ...formDataPrev,
    //   citizenImages: images,
    // }))
  }
  const handleCancel = (e) => {}
  return (
    <Form className={cx('form-infor-ID')}>
      <TakePhotoRegister
        id={0}
        initialNumberPhoto={2}
        name_photos={['Mặt trước', 'Mặt sau']}
        handleSave={handleSave}
        obligatory={true}
        urlImages={[formData.citizenImages[0], formData.citizenImages[1]]}
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
          value={formData.number}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput2">
        <Form.Label>
          Ngày cấp <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="dd-mm-yyyy"
          name="dateOfIssue"
          aria-label="dateOfIssue"
          className={cx('txt', 'm-0')}
          onChange={handleInputChange}
          value={formData.dateOfIssue}
        />
        {!isCorrectDate && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput3">
        <Form.Label>
          Nơi cấp <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select
          name="place"
          aria-label="place"
          className={cx('txt', 'selectbox')}
          onChange={handleInputChange}
          value={formData.place}
        >
          {placeOfIssue.map((place, index) => (
            <option key={index} value={place.value}>
              {place.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInforID.ControlInput4">
        <Form.Label>
          Ngày hết hạn<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="dd-mm-yyyy"
          name="expiryDate"
          aria-label="expiryDate"
          className={cx('txt', 'm-0')}
          onChange={handleInputChange}
          value={formData.expiryDate}
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
          disabled={!activeSave || isSaved}
          onClick={(event) => {
            event.preventDefault()
            setIsSaved(true)
            setActiveSave(false)
            handleSaveFormInforID(formData)
          }}
        >
          {!isSaved ? 'Lưu' : 'Đã lưu'}
        </Button>
      </div>
    </Form>
  )
}
export default FormInforID
