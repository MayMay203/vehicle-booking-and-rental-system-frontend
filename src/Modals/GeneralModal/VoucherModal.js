import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import FormInput from '~/components/Form/FormInput'
import { generalModalNames, setAddVoucherVisible, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'
import DatePicker from 'react-datepicker'
import { createVoucher } from '~/apiServices/vouchers/createVoucher'
import { fetchAllVouchers } from '~/redux/slices/voucherSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getVoucherById } from '~/apiServices/vouchers/getVoucherById'
import { updateVoucher } from '~/apiServices/vouchers/updateVoucher'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)
function VoucherModal() {
  console.log('re-render ticket modal')
  const showAddVoucher = useSelector((state) => state.generalModal.addVoucher)
  const { isOpen, voucherId } = showAddVoucher
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const now = new Date()
  const [effectiveDate, setEffectiveDate] = useState(now)
  const [expiredDate, setExpiredDate] = useState(now)
  const [quantity, setQuantity] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const [minOrderValue, setMinOrderValue] = useState(0)
  const [maxDiscountValue, setMaxDiscountValue] = useState(0)

  const formRef = useRef(null)

useEffect(() => {
  if (formRef.current) {
    setIsValid(formRef.current.checkValidity())
  }

  const expiredTime = new Date(expiredDate).getTime()
  const effectiveTime = new Date(effectiveDate).getTime()

  if (!isNaN(expiredTime) && !isNaN(effectiveTime)) {
    console.log('expiredTime:', expiredTime, 'effectiveTime:', effectiveTime)

    if (expiredTime < effectiveTime) {
      console.log('Invalid: expiredDate is earlier than effectiveDate')
      setIsValid(false)
    }
  }
}, [title, quantity, expiredDate, effectiveDate, value])

  useEffect(() => {
    async function getVoucher() {
      const data = await getVoucherById(voucherId)
      if (data) {
        setTitle(data.name)
        setEffectiveDate(new Date(data.startDate.split('-').reverse().join('-')))
        setExpiredDate(new Date(data.endDate.split('-').reverse().join('-')))
        setValue(data.voucherPercentage)
        setMaxDiscountValue(Number(data.maxDiscountValue.replace(/\./g, '').replace(' VND', '')))
        setQuantity(data.remainingQuantity)
        setMinOrderValue(Number(data.minOrderValue.replace(/\./g, '').replace(' VND', '')))
      }
    }
    if (voucherId) getVoucher()
  }, [voucherId])

  const handleClose = () => {
    setTitle('')
    setValue('')
    setMaxDiscountValue('')
    setQuantity('')
    setMinOrderValue(0)
    setEffectiveDate(new Date())
    setExpiredDate(new Date())
    dispatch(setAddVoucherVisible({ isOpen: false }))
  }

  const handleAddVoucher = async (e) => {
    e.preventDefault()
    dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
    const startDate = effectiveDate.toISOString().split('T')[0].split('-').reverse().join('-')
    const endDate = expiredDate.toISOString().split('T')[0].split('-').reverse().join('-')
    if (dispatch(checkLoginSession())) {
      await createVoucher({
        name: title,
        startDate,
        endDate,
        voucherPercentage: value,
        maxDiscountValue,
        minOrderValue,
        remainingQuantity: quantity,
      })
      handleClose()
      dispatch(fetchAllVouchers({ page: 1 }))
    }
    dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
  }

  const handleUpdateVoucher = async (e) => {
    e.preventDefault()
    dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
    const startDate = effectiveDate.toISOString().split('T')[0].split('-').reverse().join('-')
    const endDate = expiredDate.toISOString().split('T')[0].split('-').reverse().join('-')
    if (dispatch(checkLoginSession())) {
      const data = await updateVoucher({
        id: voucherId,
        name: title,
        startDate,
        endDate,
        voucherPercentage: value,
        maxDiscountValue,
        minOrderValue,
        remainingQuantity: quantity,
      })
      if (data) {
        handleClose()
        toast.success('Cập nhật mã khuyến mãi thành công!', { autoClose: 1000, position: 'top-center' })
        dispatch(fetchAllVouchers({ page: 1 }))
      } else {
        toast.error('Mã khuyến mãi đã được sử dụng. Không thể cập nhật!', { autoClose: 1200, position: 'top-center' })
      }
    }
    dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
  }

  return (
    <Modal className={cx('custom-modal')} show={isOpen} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header', 'fs-2')}>
            {voucherId ? 'Cập nhật mã khuyến mãi' : 'Thêm mã khuyến mãi'}
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef} noValidate>
          <FormInput
            title="Tên mã khuyến mãi"
            error="Vui lòng nhập tên mã"
            id="title"
            type="text"
            placeholder="Nhập tên mã khuyến mãi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isValid={isValid}
            required
            star
          ></FormInput>
          <div className="row row-cols-1 row-cols-lg-2">
            <FormInput
              title="Phần trăm khuyến mãi (%)"
              error={value === '' ? 'Vui lòng nhập giá trị voucher' : 'Giá trị voucher không hợp lệ'}
              id="value"
              type="number"
              min={1}
              max={100}
              placeholder="Nhập phần trăm giảm"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              isValid={isValid}
              required
              star
            ></FormInput>
            <FormInput
              title="Giá trị giảm tối đa (VNĐ)"
              error={maxDiscountValue === '' ? 'Vui lòng nhập giá trị tối đa' : 'Giá trị tối đa phải lớn hơn 0'}
              id="value"
              type="number"
              min={1}
              placeholder="Nhập giá trị giảm tối đa"
              value={maxDiscountValue}
              onChange={(e) => setMaxDiscountValue(e.target.value)}
              isValid={isValid}
              required
              star
            ></FormInput>
          </div>
          <div className={cx('date-wrapper')}>
            <label htmlFor="effectiveDate" className="date-picker-label">
              Ngày có hiệu lực
              <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
            </label>
            <DatePicker
              className={cx('custom-date-picker')}
              selected={effectiveDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()} // Ngày hiện tại
              maxDate={new Date('2025-12-31')} // Giới hạn đến 31/12/2025
              onKeyDown={(e) => e.preventDefault()} // Ngăn nhập bằng phím
              onChange={(date) => setEffectiveDate(date)}
            />
          </div>
          <div className={cx('date-wrapper')}>
            <label htmlFor="expiredDate" className="date-picker-label">
              Ngày hết hạn
              <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
            </label>
            <DatePicker
              className={cx('custom-date-picker')}
              selected={expiredDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              maxDate={new Date('2025-12-31')}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(date) => {
                setExpiredDate(date)
              }}
            />
          </div>
          <FormInput
            title="Số lượng"
            error="Số lượng phải lớn hơn 0"
            id="quantity"
            placeholder="Nhập số lượng voucher"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            isValid={isValid}
            type="number"
            required
            star
          ></FormInput>
          <FormInput
            title="Giá trị đơn hàng tối thiểu áp dụng (VNĐ)"
            error="Vui lòng nhập giá trị đơn hàng tối thiểu"
            id="quantity"
            placeholder="Nhập giá đơn hàng tối thiểu"
            min={0}
            value={minOrderValue}
            onChange={(e) => setMinOrderValue(e.target.value)}
            isValid={isValid}
            type="number"
            required
            star
          ></FormInput>
          <div className="d-flex justify-content-center column-gap-5 mt-5">
            <Button outline type="button" onClick={handleClose}>
              Huỷ
            </Button>
            <Button
              primary
              className={cx('btn-submit')}
              onClick={(e) => (voucherId ? handleUpdateVoucher(e) : handleAddVoucher(e))}
              disabled={!isValid}
              type="submit"
            >
              {voucherId ? 'Cập nhật' : 'Thêm mã'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default VoucherModal
