import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import { setAddUtilityModalVisible } from '~/redux/slices/generalModalSlice'
import FormInput from '~/components/Form/FormInput'
import { useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import FormTextArea from '~/components/Form/FormTextArea'
import { images } from '~/assets/images'

const cx = classNames.bind(styles)
function AddUtility() {
  console.log('re-render addUtility modal')
  const dispatch = useDispatch()
  const showUtilityModal = useSelector((state) => state.generalModal.addUtility)
  const formRef = useRef(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [name, description, selectedImage])

  const handleClose = (e) => {
    if (e) {
      e.preventDefault()
    }
    setName('')
    setDescription('')
    setSelectedImage(null)
    setIsValid(false)
    dispatch(setAddUtilityModalVisible(false))
  }

  const handleChooseImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
    }
  }

  const hanldeAddUtility = () => {}

  return (
    <Modal show={showUtilityModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>Thêm tiện ích</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef} noValidate>
          <FormInput
            title="Tên"
            error="Vui lòng nhập tên tiện ích"
            id="name"
            type="name"
            placeholder="Nhập tên tiện ích"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isValid={isValid}
            required
          ></FormInput>
          <div className="d-flex flex-column row-gap-4">
            <span>Hình ảnh</span>
            <div className={cx('choose-wrapper')}>
              <input type="file" className={cx('input-file')} onChange={handleChooseImage}></input>
              <img
                alt="addUtility"
                src={selectedImage ? selectedImage : images.addImage}
                className={cx('choose-image')}
              ></img>
            </div>
          </div>
          <FormTextArea
            value={description}
            title="Mô tả"
            placeholder="Nhập mô tả"
            id="description"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            rows={4}
            error="Vui lòng nhập mô tả"
          />
          <div className="mt-5 d-flex column-gap-5 justify-content-center">
            <Button outline onClick={handleClose}>
              Huỷ
            </Button>
            <Button className={cx('btn-submit')} onClick={hanldeAddUtility} disabled={!isValid} type="submit" primary>
              Thêm
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddUtility
