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
            title="Tiêu đề"
            error="Vui lòng nhập tiêu đề"
            id="title"
            type="text"
            placeholder="Nhập tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isValid={isValid}
            required
            star
          ></FormInput>
          <div className="d-flex column-gap-3 mt-5">
            <FormInput
              title="Giá trị khuyến mãi"
              error={value === '' ? 'Vui lòng nhập giá trị voucher' : 'Giá trị voucher phải lớn hơn 0'}
              id="value"
              type="number"
              min={1}
              placeholder="Nhập giá trị"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              isValid={isValid}
              required
              star
            ></FormInput>
            <div className="flex flex-column align-items-center justify-content-center row-gap-3">
              <div className="d-flex justify-content-center">
                <Button
                  rounded
                  style={{
                    fontSize: '1.3rem',
                    height: '30px',
                    minWidth: '90px',
                    backgroundColor: '#fff',
                    color: 'var(--orange-color)',
                    borderColor: 'var(--orange-color)',
                  }}
                  className={cx({ active: typeValue === 'byPercent' })}
                  onClick={() => setTypeValue('byPercent')}
                  type="button"
                >
                  Theo %
                </Button>
                <Button
                  rounded
                  style={{
                    fontSize: '1.3rem',
                    height: '30px',
                    minWidth: '110px',
                    backgroundColor: '#fff',
                    color: 'var(--orange-color)',
                    borderColor: 'var(--orange-color)',
                  }}
                  className={cx({ active: typeValue === 'byValue' })}
                  onClick={() => setTypeValue('byValue')}
                  type="button"
                >
                  Theo giá trị
                </Button>
              </div>
              <span className={cx('note')}>
                {typeValue === 'byPercent'
                  ? 'Giảm phần trăm theo giá trị đơn hàng'
                  : 'Giảm giá trị cố định cho mỗi đơn hàng'}
              </span>
            </div>
          </div>
          <div className={cx('date-wrapper')}>
            <label htmlFor="effectiveDate" className="date-picker-label">
              Ngày có hiệu lực
              <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
            </label>
            <DatePicker
              className={cx('custom-date-picker')}
              id="effectiveDate"
              selected={effectiveDate}
              onChange={(date) => setEffectiveDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          <div className={cx('date-wrapper')}>
            <label htmlFor="expiredDate" className="date-picker-label">
              Ngày hết hạn
              <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
            </label>
            <DatePicker
              className={cx('custom-date-picker')}
              id="expiredDate"
              selected={expiredDate}
              onChange={(date) => setExpiredDate(date)}
              showTimeSelect
              dateFormat="Pp"
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
