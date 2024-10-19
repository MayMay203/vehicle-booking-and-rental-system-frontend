import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import { useAuthModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'
import { useCallback, useEffect, useRef, useState } from 'react'
import { register } from '~/apiServices/register'
import { useUserContext } from '~/Context/UserProvider'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { resendOTP } from '~/apiServices/resendOTP'
import { useGlobalModal } from '~/Context/GlobalModalProvider'
import Spinner from '~/components/Spinner'

const cx = classNames.bind(styles)
function RegisterAdminModal() {
  const { isOpenAuthModal, closeAuthModal } = useAuthModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
    if (password !== confirmPass) {
      setIsValid(false)
    }
  }, [email, password, confirmPass])

  const reset = useCallback(() => {
    setEmail('')
    setPassword('')
    setConfirmPass('')
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    toast.success('Đăng ký tài khoản thành công.',{autoClose: 800, position: 'top-center'})
    reset();
}
  const handleChange = useCallback((value, functionChange) => {
    functionChange(value)
  }, [])

  return (
    <Modal show={isOpenAuthModal.registerAdmin} onHide={() => closeAuthModal('registerAdmin')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Đăng ký</Modal.Title>
          <p className={cx('desc')}>"Tham gia ngay hôm nay để bắt đầu hành trình của bạn!"</p>
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
            onChange={(e) => handleChange(e.target.value, setEmail)}
            pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
            isValid={isValid}
            required
          ></FormInput>
          <FormInput
            title="Mật khẩu"
            error={password ? 'Mật khẩu có ít nhất 8 kí tự' : 'Vui lòng nhập mật khẩu'}
            id="password"
            type="password"
            minLength="8"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => handleChange(e.target.value, setPassword)}
            required
            isValid={isValid}
            autoComplete="new-password"
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
            onChange={(e) => handleChange(e.target.value, setConfirmPass)}
            isValid={isValid}
            required
            autoComplete="new-password"
          ></FormInput>
          <Button className={cx('btn-submit', 'm-0')} onClick={handleRegister} disabled={!isValid} type="submit">
            Đăng ký tài khoản
          </Button>
        </form>
      </Modal.Body>
      <Spinner />
    </Modal>
  )
}

export default RegisterAdminModal
