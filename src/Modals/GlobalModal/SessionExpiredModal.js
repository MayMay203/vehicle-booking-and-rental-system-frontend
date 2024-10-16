import { Modal } from 'react-bootstrap'
import styles from './GlobalModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useAuthModal } from '~/Context/AuthModalProvider'
import { useGlobalModal } from '~/Context/GlobalModalProvider'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
function SessionExpiredModal() {
  const { isOpenGlobalModal, closeGlobalModal } = useGlobalModal()
  const { openAuthModal } = useAuthModal()
  const navigate = useNavigate()

  const handleReLogin = () => {
    closeGlobalModal('expiredSession')
    openAuthModal('login')
  }

  const handleCancel = async () => {
    navigate('/')
    closeGlobalModal('expiredSession')
  }

  return (
    <Modal show={isOpenGlobalModal.expiredSession} onHide={handleCancel} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>Thông báo</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className={cx('message', 'mt-3', 'text-center')}>Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!</p>
      </Modal.Body>
      <Modal.Footer className={cx('mt-3', 'modal-actions')}>
        <div className="d-flex mt-4 column-gap-4">
          <Button outline onClick={handleCancel}>
            Bỏ qua
          </Button>
          <Button primary onClick={handleReLogin}>
            Đăng nhập
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionExpiredModal
