import { Modal } from 'react-bootstrap'
import styles from './GlobalModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useGlobalModal } from '~/Context/GlobalModalProvider'
import { useUserContext } from '~/Context/UserProvider'
import { logout } from '~/apiServices/logout'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
function LogoutModal() {
  const { toggleLogin } = useUserContext()
  const { isOpenGlobalModal, closeGlobalModal } = useGlobalModal()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toggleLogin()
      closeGlobalModal('logout')
      navigate('/')
    } catch (message) {
      toast.error(String(message))
    }
  }

  return (
    <Modal show={isOpenGlobalModal.logout} onHide={() => closeGlobalModal('logout')} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>Xác nhận đăng xuất</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className={cx('message', 'mt-3', 'text-center')}>Bạn chắc chắn muốn đăng xuất tài khoản?</p>
      </Modal.Body>
      <Modal.Footer className={cx('mt-3', 'modal-actions')}>
        <div className="d-flex mt-4 column-gap-4">
          <Button outline onClick={() => closeGlobalModal('logout')}>
            Thoát
          </Button>
          <Button primary onClick={handleLogout}>
            Xác nhận
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default LogoutModal;