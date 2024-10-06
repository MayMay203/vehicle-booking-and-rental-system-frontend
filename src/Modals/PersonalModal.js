import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '~/components/Button'
import FormGender from '~/components/Form/FormGender'
import FormInput from '~/components/Form/FormInput'
import { useModal } from '~/Context/AuthModalProvider'

const cx = classNames.bind(styles)
function PersonalModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const [isValid, setIsValid] = useState(false)
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState(null)
  const formRef = useRef(null)

  const handleSignUp = () => {
    closeModal('info')
    openModal('login')
  }

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [fullName, phone, birthday])

  const handleGender = (gender) => {
    setGender(gender)
  }
  return (
    <Modal show={isOpenModal.personal} onHide={() => closeModal('info')} centered>
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
            error="Trường này là bắt buộc"
            required
            isValid={isValid}
            onChange={(e) => setFullName(e.target)}
          />
          <FormInput
            id="phone"
            value={phone}
            type="phone"
            title="Số điện thoại"
            error="Số điện thoại không đúng định dạng"
            required
            pattern="[0-9]{10}"
            isValid={isValid}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormInput
            id="date"
            value={birthday}
            type="date"
            title="Ngày sinh"
            required
            isValid={isValid}
            error="Trường này là bắt buộc"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <FormGender handleGender={handleGender} gender={gender} />
          <Button className={cx('btn-submit')} onClick={handleSignUp} disabled={!isValid}>
            Đăng ký
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default PersonalModal
