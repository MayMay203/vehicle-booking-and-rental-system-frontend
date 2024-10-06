import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useEffect, useRef, useState } from 'react'

const cx = classNames.bind(styles)
function ResetPasswordModal() {
  const { isOpenModal, openModal, closeModal } = useModal()
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [password, confirmPass])

  const handleChangePass = () => {
    closeModal('reset')
    openModal('login')
  }

  const handleShowLogin = () => {
    closeModal('reset')
    openModal('login')
  }

  return (
    <Modal show={isOpenModal.reset} onHide={() => closeModal('reset')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Đặt lại mật khẩu</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            title="Mật khẩu mới"
            error="Mật khẩu có ít nhất 8 kí tự"
            id="password"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValid}
            required
          ></FormInput>
          <FormInput
            title="Xác nhận mật khẩu"
            error="Mật khẩu xác nhận không đúng"
            id="confirmPassword"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu xác nhận"
            value={confirmPass}
            password={password}
            onChange={(e) => setConfirmPass(e.target.value)}
            isValid={isValid}
            required
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleChangePass} disabled={!isValid}>
            Đổi mật khẩu
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

export default ResetPasswordModal
