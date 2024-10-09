import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { verifyOTP } from '~/apiServices/verifyOTP'
import { resendOTP } from '~/apiServices/resendOTP'
import { toast } from 'react-toastify'
import { UserContext } from '~/Context/UserProvider'

const cx = classNames.bind(styles)

function AuthCodeModal() {
  const { isOpenModal, openModal, modalData, closeModal } = useModal()
  const { type } = modalData
  const [timeLeft, setTimeLeft] = useState(0)
  const { getEmail } = useContext(UserContext)

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
    if (isOpenModal.authCode) {
      setTimeLeft(120)
    }
  }, [isOpenModal])

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
      closeModal('authCode')
      setOtp('')
      type === 'forget' ? openModal('reset') : openModal('info')
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
    <Modal show={isOpenModal.authCode} onHide={() => closeModal('authCode')} centered>
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
            type="otp"
            placeholder="Nhập OTP"
            value={otp}
            required
            onChange={handleChange}
            isValid={isValid}
          />
          <span className={cx('time')}>{formatTime(timeLeft)}</span>
          <button className={cx('btn-resend')} onClick={handleResendOTP} disabled={timeLeft > 0}>
            Gửi lại mã
          </button>
          <Button className={cx('btn-submit')} onClick={handleContinue} type="submit" disabled={!isValid}>
            Tiếp tục
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AuthCodeModal
