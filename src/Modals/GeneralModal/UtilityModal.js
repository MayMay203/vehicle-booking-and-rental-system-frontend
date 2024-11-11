import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import { generalModalNames, setLoadingModalVisible, setUtilityModal } from '~/redux/slices/generalModalSlice'
import FormInput from '~/components/Form/FormInput'
import { useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import FormTextArea from '~/components/Form/FormTextArea'
import { images } from '~/assets/images'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { addUtility } from '~/apiServices/manageUtilities/addUtility'
import { fetchAllUtilities } from '~/redux/slices/generalAdminSlice'
import { toast } from 'react-toastify'
import { updateUtility } from '~/apiServices/manageUtilities/updateUtility'

const cx = classNames.bind(styles)
function UtilityModal() {
  console.log('re-render addUtility modal')
  const dispatch = useDispatch()
  const showUtilityModal = useSelector((state) => state.generalModal.utilityModal)
  const { id, isOpen } = showUtilityModal
  const formRef = useRef(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
    if (!selectedImage) {
      setIsValid(false)
    }
  }, [name, description, selectedImage])

  useEffect(() => {
    if (id) {
      //fetch api get 1 utility
      let data = {}
      setName(data.name)
      setDescription(data.description)
      setSelectedImage(data.image)
    }
  }, [id])

  const handleClose = (e) => {
    if (e) {
      e.preventDefault()
    }
    setName('')
    setDescription('')
    setSelectedImage(null)
    setIsValid(false)
    dispatch(setUtilityModal({ isOpen: false }))
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

  const handleConfirm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const utilityInfo = {
      name,
      description,
    }
    if (id) {
      utilityInfo.id = id
    }
    formData.append('utilityInfo', new Blob([JSON.stringify(utilityInfo)], { type: 'application/json' }))
    const base64Data = selectedImage.split(',')[1]
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i))
    const byteArray = new Uint8Array(byteNumbers)
    const imageBlob = new Blob([byteArray], { type: 'image/png' })
    formData.append('utilityImage', imageBlob, `${utilityInfo.name}.png`)
    if (dispatch(checkLoginSession())) {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      const data = !id ? await addUtility(formData) : await updateUtility(formData)
      if (data) {
        handleClose()
        dispatch(fetchAllUtilities())
      } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1000, position: 'top-center' })
      }
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
    }
  }

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>{id ? 'Cập nhật tiện ích' : 'Thêm tiện ích'}</Modal.Title>
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
              <input type="file" accept="image/*" className={cx('input-file')} onChange={handleChooseImage}></input>
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
            <Button className={cx('btn-submit')} onClick={handleConfirm} disabled={!isValid} type="submit" primary>
              {id ? 'Cập nhật' : 'Thêm'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default UtilityModal
