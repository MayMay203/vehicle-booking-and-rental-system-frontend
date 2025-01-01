import { useCallback, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerInfo } from '~/apiServices/registerInfo'
import Button from '~/components/Button'
import FormGender from '~/components/Form/FormGender'
import FormInput from '~/components/Form/FormInput'
import classNames from 'classnames/bind'
import styles from './AuthModal.module.scss'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)

function PersonalModal() {
  const showInfoModal = useSelector((state) => state.authModal.info)
  const email = useSelector((state) => state.user.email)
  const dispatch = useDispatch()

  const [isValid, setIsValid] = useState(false)
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('MALE')
  const formRef = useRef(null)

  const [birthday, setBirthday] = useState(new Date())

  const reset = useCallback(() => {
    setFullName('')
    setGender('MALE')
    setPhone('')
    setBirthday(new Date())
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const accountInfo = {
        username: email,
        name: fullName,
        gender,
        birthDay: birthday.toLocaleDateString('en-GB').replace(/\//g, '-'),
        phoneNumber: phone,
      }
      console.log(accountInfo)
      const formData = new FormData()
      formData.append('account_info', new Blob([JSON.stringify(accountInfo)], { type: 'application/json' }))
      await registerInfo(formData)

      toast.success('Đăng ký thông tin thành công', { autoClose: 1500 })
      dispatch(setAuthModalVisible({ modalName: modalNames.INFO, isVisible: false }))
      reset()
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    } catch (message) {
      toast.error('Số điện thoại này đã được đăng ký làm thông tin cá nhân cho tài khoản khác!', { autoClose: 2000 })
    }
  }

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [fullName, phone, birthday])

  const handleGender = (gender) => {
    setGender(gender)
  }

  const handleChange = useCallback((value, functionChange) => {
    functionChange(value)
  }, [])

  const handleCancel = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.INFO, isVisible: false }))
    toast.success('Đăng ký tài khoản thành công.', { autoClose: 1000 })
    dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
  }

  return (
    <Modal
      show={showInfoModal}
      onHide={() => dispatch(setAuthModalVisible({ modalName: modalNames.INFO, isVisible: false }))}
      centered
    >
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Thông tin cá nhân</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            id="fullname"
            value={fullName}
            type="fullname"
            title="Họ và tên"
            error="Vui lòng nhập họ và tên"
            required
            isValid={isValid}
            onChange={(e) => handleChange(e.target.value, setFullName)}
          />
          <FormInput
            id="phone"
            value={phone}
            type="phone"
            title="Số điện thoại"
            error={phone ? 'Số điện thoại không đúng định dạng' : 'Vui lòng nhập số điện thoại'}
            required
            pattern="[0-9]{10}"
            isValid={isValid}
            onChange={(e) => handleChange(e.target.value, setPhone)}
          />
          <div className="mb-3">
            <label className="mb-4">Ngày sinh</label>
            <div className={cx('date-wrapper', 'd-flex', 'align-items-center')}>
              <DatePicker
                className={cx('date-input')} // Sử dụng class để áp dụng style cho input
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
                placeholderText="Chọn ngày sinh"
              />
              <FontAwesomeIcon icon={faCalendar} className={cx('calendar-icon')} />
            </div>
          </div>
          <FormGender handleGender={handleGender} gender={gender} />
          <div className="d-flex column-gap-3 mt-5">
            <Button className={cx('btn-submit', 'btn-cancel')} onClick={handleCancel} type="button">
              Bỏ qua bước này
            </Button>
            <Button className={cx('btn-submit')} onClick={handleSignUp} disabled={!isValid} type="submit">
              Đăng ký thông tin
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default PersonalModal
