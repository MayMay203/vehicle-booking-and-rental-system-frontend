import { Modal } from 'react-bootstrap'
import styles from './AuthModal.module.scss'
import classNames from 'classnames/bind'
import { useAuthModal } from '~/Context/AuthModalProvider'
import FormInput from '~/components/Form/FormInput'
import Button from '~/components/Button'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { forgetPassword } from '~/apiServices/forgetPassword'
import { useGlobalModal } from '~/Context/GlobalModalProvider'

const cx = classNames.bind(styles)
function ForgetPasswordModal() {
  const { isOpenAuthModal, openAuthModal, closeAuthModal } = useAuthModal()
  const { openGlobalModal, closeGlobalModal } = useGlobalModal()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }, [email])

  const handleShowLogin = () => {
    setEmail('')
    closeAuthModal('forget')
    openAuthModal('login')
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    try {
      openGlobalModal('loading')
      const data = await forgetPassword(email)
      closeGlobalModal('loading')
      toast.success(data.info, { autoClose: 1500, position: 'top-center' })
    } catch (message) {
      toast.error(message, { autoClose: 1500, position: 'top-center' })
    }
  }

  return (
    <Modal show={isOpenAuthModal.forget} onHide={() => closeAuthModal('forget')} centered>
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
            pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
            isValid={isValid}
            required
          ></FormInput>
          <Button className={cx('btn-submit')} onClick={handleConfirm} type="submit" disabled={!isValid}>
            Xác nhận
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
