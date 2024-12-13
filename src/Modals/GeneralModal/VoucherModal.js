import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import FormInput from '~/components/Form/FormInput'
import { setAddVoucherVisible } from '~/redux/slices/generalModalSlice'
import DatePicker from 'react-datepicker'

const cx = classNames.bind(styles)
function VoucherModal() {
  console.log('re-render ticket modal')
  const showAddVoucher = useSelector((state) => state.generalModal.addVoucher)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [effectiveDate, setEffectiveDate] = useState(new Date())
  const [expiredDate, setExpiredDate] = useState(new Date())
  const [quantity, setQuantity] = useState(1)
  const [isValid, setIsValid] = useState(false)
  const [typeValue, setTypeValue] = useState('byPercent')

  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [title, quantity, expiredDate, effectiveDate, value])

  const handleClose = () => {
    setTitle('')
    setValue('')
    setTypeValue('byPercent')
    dispatch(setAddVoucherVisible(false))
  }

  const handleAddVoucher = () => {}

  return (
    <Modal className={cx('custom-modal')} show={showAddVoucher} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header', 'fs-2')}>Thêm mã khuyến mãi</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef} noValidate>
          <FormInput
            title="Tên mã"
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
          <FormInput
            title="Giá trị phần trăm khuyến mãi"
            error={value === '' ? 'Vui lòng nhập giá trị voucher' : 'Giá trị voucher không hợp lệ'}
            id="value"
            type="number"
            min={1}
            max={100}
            placeholder="Nhập giá trị phần trăm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            isValid={isValid}
            required
            star
          ></FormInput>
          <div className={cx('date-wrapper')}>
            <label htmlFor="effectiveDate" className="date-picker-label">
              Ngày có hiệu lực
              <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
            </label>
            <DatePicker
              className={cx('custom-date-picker')}
              selected={effectiveDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              maxDate={new Date('2025-12-31')}
              onKeyDown={(e) => e.preventDefault()}
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
              onChange={(date) => setEffectiveDate(date)}
            />
          </div>
          <div class="d-flex column-gap-3">
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
              title="Giá trị đơn hàng tối thiểu"
              error="Vui lòng nhập giá trị đơn hàng tối thiểu"
              id="quantity"
              placeholder="Nhập giá trị tối thiểu"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              isValid={isValid}
              type="number"
              required
              star
            ></FormInput>
          </div>
          <div className="d-flex justify-content-center column-gap-5 mt-5">
            <Button outline type="button" onClick={handleClose}>
              Huỷ
            </Button>
            <Button primary className={cx('btn-submit')} onClick={handleAddVoucher} disabled={!isValid} type="submit">
              Thêm mã
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default VoucherModal
