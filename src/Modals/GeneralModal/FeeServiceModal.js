import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import {
  generalModalNames,
  setFeeServiceModal,
  setLoadingModalVisible,
} from '~/redux/slices/generalModalSlice'
import FormInput from '~/components/Form/FormInput'
import { useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import FormTextArea from '~/components/Form/FormTextArea'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllFeeServices } from '~/redux/slices/generalAdminSlice'
import { toast } from 'react-toastify'
import { getFeeService } from '~/apiServices/manageFeeService/getFeeService'
import { createFeeService } from '~/apiServices/manageFeeService/createFeeService'
import { updateFeeService } from '~/apiServices/manageFeeService/updateFeeService'

const cx = classNames.bind(styles)
function FeeServiceModal() {
  const dispatch = useDispatch()
  const showFeeServiceModal = useSelector((state) => state.generalModal.feeServiceModal)
  const { id, isOpen } = showFeeServiceModal
  const formRef = useRef(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [name, description, price])

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getFeeService(id)
        console.log(data)
        setName(data.name)
        setDescription(data.description)
        setPrice(data.price)
      }
    }
    fetchData()
  }, [id])

  console.log('id', id)

  const handleClose = (e) => {
    if (e) {
      e.preventDefault()
    }
    setName('')
    setDescription('')
    setPrice(0)
    setIsValid(false)
    dispatch(setFeeServiceModal({ isOpen: false }))
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    if (dispatch(checkLoginSession())) {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      const data = !id
        ? await createFeeService(name, price, description)
        : await updateFeeService(id, name, price, description)
      if (data) {
        handleClose()
        dispatch(fetchAllFeeServices())
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
          <Modal.Title className={cx('title-header')}>{id ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ'}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef} noValidate>
          <FormInput
            title="Tên dịch vụ"
            error="Vui lòng nhập tên dịch vụ"
            id="name"
            type="name"
            placeholder="Nhập tên dịch vụ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isValid={isValid}
            required
            star
          ></FormInput>
          <FormInput
            title="Giá dịch vụ"
            error={price?'Phí dịch vụ phải lớn hơn 0':'Vui lòng nhập phí cho dịch vụ'}
            id="price"
            type="number"
            placeholder="Nhập phí dịch vụ"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isValid={isValid}
            required
            star
          ></FormInput>
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
            star
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

export default FeeServiceModal
