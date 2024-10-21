import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import { useAuthModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { images } from '~/assets/images'
import { useCallback, useEffect, useRef, useState } from 'react'
import { register } from '~/apiServices/register'
import {useUserContext } from '~/Context/UserProvider'
import { toast } from 'react-toastify'
import { config } from '~/config'
import { resendOTP } from '~/apiServices/resendOTP'
import { useGlobalModal } from '~/Context/GlobalModalProvider'
import Spinner from '~/components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)
function RegisterModal() {
  console.log('re-render register modal')
  const showRegister = useSelector((state) => state.authModal.register)
  const dispatch = useDispatch()

  const { openGlobalModal, closeGlobalModal } = useGlobalModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)
  const { saveEmail } = useUserContext()
  const [isShow, setIsShow] = useState(false)

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

  const handleContinue = async (e) => {
    e.preventDefault()
    try {
      openGlobalModal('loading')
      saveEmail(email)
      await register(email, password, confirmPass)
      closeGlobalModal('loading')
      dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER, isVisible: false }))
      reset()
      dispatch(setAuthModalVisible({ modalName: modalNames.AUTH_CODE, isVisible: true }))
    } catch (message) {
      closeGlobalModal('loading')
      toast.error(message, { autoClose: 2000 })
      setIsShow(message.includes(config.message.emailConfirm))
    }
  }

  const handleShowLogin = () => {
    dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER, isVisible: false }))
    dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
  }

  const handleChange = useCallback((value, functionChange) => {
    functionChange(value)
  }, [])

  const handleShowOTPModal = async () => {
    openGlobalModal('loading')
    setIsShow(false)
    await resendOTP(email)
    dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER, isVisible: false }))
    closeGlobalModal('loading')
    toast.info('Kiểm tra email để nhận OTP')
    dispatch(setAuthModalVisible({ modalName: modalNames.AUTH_CODE, isVisible: true }))
  }

  return (
    <Modal
      show={showRegister}
      onHide={() => dispatch(setAuthModalVisible({ modalName: modalNames.REGISTER, isVisible: false }))}
      centered
    >
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
          {isShow && (
            <Button type="button" className={cx('btn-verify')} onClick={handleShowOTPModal}>
              Xác nhận OTP
            </Button>
          )}
          <Button className={cx('btn-submit', 'm-0')} onClick={handleContinue} disabled={!isValid} type="submit">
            Tiếp tục
          </Button>
          <div className={cx('other')}>hoặc</div>
          <button className={cx('btn-google')}>
            <span className={cx('icon')}>
              <img src={images.google} alt="google" className={cx('google-img')}></img>
            </span>
            Đăng nhập bằng Google
          </button>
          <div className={cx('bottom')}>
            <span className={cx('content')}>Bạn đã có tài khoản?</span>
            <button className={cx('btn-link', 'btn-bottom')} onClick={handleShowLogin}>
              Đăng nhập
            </button>
          </div>
        </form>
      </Modal.Body>
      <Spinner />
    </Modal>
  )
}

export default RegisterModal
