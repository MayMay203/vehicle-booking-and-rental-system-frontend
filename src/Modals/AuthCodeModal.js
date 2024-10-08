import { Modal } from 'react-bootstrap'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { verifyOTP } from '~/apiServices/verifyOTP'
import { resendOTP } from '~/apiServices/resendOTP'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function AuthCodeModal() {
  const { isOpenModal, openModal, modalData, closeModal } = useModal()
  const { type, email } = modalData
  const [timeLeft, setTimeLeft] = useState(5)

  const [isValid, setIsValid] = useState(false)
  const [otp, setOtp] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [otp])

  useEffect(() => {
    if (timeLeft > 0) {
      const timeoutId = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timeoutId) 
    }
  }, [timeLeft])

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, [])

  const handleContinue = async (e) => {
    e.preventDefault()
    const data = await verifyOTP(email, otp)
    if (data) {
      console.log(data)
      closeModal('authCode')
      if (type === 'forget') {
        openModal('reset')
      } else if (type === 'register') {
        openModal('info')
      }
    } else {
      alert('Mã OTP hết hạn vui lòng thử lại')
    }
  }

  const handleResendOTP = async (e) => {
    e.preventDefault()
    setOtp('')
    // const data = await resendOTP(email)
    // if (data) {
      setTimeLeft(5)
      toast.info('Kiểm tra lại email để nhận OTP')
    // }
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
