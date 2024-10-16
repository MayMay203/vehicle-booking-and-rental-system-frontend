import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import { useAuthModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { verifyOTP } from '~/apiServices/verifyOTP'
import { resendOTP } from '~/apiServices/resendOTP'
import { toast } from 'react-toastify'
import { useUserContext } from '~/Context/UserProvider'

const cx = classNames.bind(styles)

function AuthCodeModal() {
  const { isOpenAuthModal, openAuthModal, modalAuthData, closeAuthModal } = useAuthModal()
  const { type } = modalAuthData
  const [timeLeft, setTimeLeft] = useState(0)
  const { getEmail } = useUserContext()

  const [isValid, setIsValid] = useState(false)
  const [otp, setOtp] = useState('')
  const formRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [otp])

  useEffect(() => {
    if (timeLeft > 0) {
      timeoutRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timeoutRef.current)
    }
  }, [timeLeft])

  useEffect(() => {
    if (isOpenAuthModal.authCode) {
      setTimeLeft(120)
    }
  }, [isOpenAuthModal])

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, [])

  const handleContinue = async (e) => {
    e.preventDefault()
    try {
      await verifyOTP(getEmail(), otp)
      setTimeLeft(0)
      closeAuthModal('authCode')
      setOtp('')
      type === 'forget' ? openAuthModal('reset') : openAuthModal('info')
    } catch (message) {
      toast.error(message)
    }
  }

  const handleResendOTP = async (e) => {
    e.preventDefault()
    setOtp('')
    try {
      await resendOTP(getEmail())
      setTimeLeft(120)
      toast.info('Kiểm tra lại email để nhận OTP')
    } catch (message) {
      toast.error(message)
    }
  }

  const handleChange = useCallback((e) => setOtp(e.target.value), [])

  return (
    <Modal show={isOpenAuthModal.authCode} onHide={() => closeAuthModal('authCode')} centered>
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title')}>Nhập mã xác thực</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form ref={formRef}>
          <FormInput
            title="Nhập OTP gửi từ email"
            id="otp"
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            required
            onChange={handleChange}
            isValid={isValid}
          />
          <span className={cx('time')}>{formatTime(timeLeft)}</span>
          <button className={cx('btn-resend')} onClick={handleResendOTP} disabled={timeLeft > 0} type='button'>
            Gửi lại mã
          </button>
          <Button className={cx('btn-submit')} onClick={handleContinue} disabled={!isValid} type="submit">
            Tiếp tục
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AuthCodeModal
