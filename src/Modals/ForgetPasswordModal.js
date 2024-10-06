import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useEffect, useRef, useState } from 'react'

const cx = classNames.bind(styles)
function ForgetPasswordModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [email])

  const handleReceiveOTP = () => {
    closeModal('forget')
    openModal('authCode', { type: 'forget' })
  }

  const handleShowLogin = () => {
    closeModal('forget')
    openModal('login')
  }

  return (
    <Modal show={isOpenModal.forget} onHide={() => closeModal('forget')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Quên mật khẩu</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            title="Email"
            error="Email không đúng định dạng"
            id="email"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            isValid={isValid}
            required
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleReceiveOTP} type="submit" disabled={!isValid}>
            Nhận mã OTP
          </Button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn có muốn quay lại?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowLogin}>
              Đăng nhập
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ForgetPasswordModal
