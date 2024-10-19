import { useCallback, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerInfo } from '~/apiServices/registerInfo'
import Button from '~/components/Button'
import FormGender from '~/components/Form/FormGender'
import FormInput from '~/components/Form/FormInput'
import { useAuthModal } from '~/Context/AuthModalProvider'
import { useUserContext } from '~/Context/UserProvider'
import classNames from 'classnames/bind'
import styles from './AuthModal.module.scss'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

const cx = classNames.bind(styles)

function PersonalModal() {
  const { isOpenAuthModal, openAuthModal, closeAuthModal } = useAuthModal()
  const [isValid, setIsValid] = useState(false)
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('MALE')
  const formRef = useRef(null)
  const { getEmail } = useUserContext()

  const [birthday, setBirthday] = useState(new Date())

  const reset = useCallback(() => {
    setFullName('')
    setGender('MALE')
    setPhone('')
    setBirthday((new Date()))
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const accountInfo = {
        username: getEmail(),
        name: fullName,
        gender,
        birthDay: birthday.toLocaleDateString('en-GB').replace(/\//g, '-'),
        phoneNumber: phone
      }
      const formData = new FormData()
      formData.append('account_info', new Blob([JSON.stringify(accountInfo)], { type: 'application/json' }))
      await registerInfo(formData)

      toast.success('Đăng ký thông tin thành công', { autoClose: 1500 })
      closeAuthModal('info')
      reset()
      openAuthModal('login')
    } catch (message) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại hoặc bỏ qua bước này', { autoClose: 2000 })
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
    closeAuthModal('info')
    toast.success('Đăng ký tài khoản thành công.', { autoClose: 1000 })
    openAuthModal('login')
  }

  return (
    <Modal show={isOpenAuthModal.info} onHide={() => closeAuthModal('info')} centered>
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
            <Button className={cx('btn-submit','btn-cancel')} onClick={handleCancel} type="button">
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
