import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerInfo } from '~/apiServices/registerInfo'
import Button from '~/components/Button'
import FormGender from '~/components/Form/FormGender'
import FormInput from '~/components/Form/FormInput'
import { useModal } from '~/Context/AuthModalProvider'
import { UserContext } from '~/Context/UserProvider'

const cx = classNames.bind(styles)
function PersonalModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const [isValid, setIsValid] = useState(false)
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('MALE')
  const formRef = useRef(null)
  const { getEmail } = useContext(UserContext)

  const formatDate = useCallback((date) => {
    let d = new Date(date)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const year = d.getFullYear()
    return [year, month, day].join('-')
  }, [])

  const [birthday, setBirthday] = useState(formatDate(new Date()))

  const reset = useCallback(() => {
    setFullName('')
    setGender('MALE')
    setPhone('')
    setBirthday(formatDate(new Date()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await registerInfo(getEmail(), fullName, phone, birthday, gender)
      toast.success('Đăng ký thông tin thành công', { autoClose: 1500 })
      closeModal('info')
      reset()
      openModal('login')
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

  return (
    <Modal show={isOpenModal.info} onHide={() => closeModal('info')} centered>
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
          <FormInput
            id="date"
            value={birthday}
            type="date"
            title="Ngày sinh"
            required
            isValid={isValid}
            error="Ngày sinh không hợp lệ"
            onChange={(e) => handleChange(e.target.value, setBirthday)}
            max={formatDate(new Date())}
          />
          <FormGender handleGender={handleGender} gender={gender} />
          <Button className={cx('btn-submit')} onClick={handleSignUp} disabled={!isValid} type='submit'>
            Đăng ký thông tin
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default PersonalModal
