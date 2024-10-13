import { Modal } from 'react-bootstrap'
import styles from './GlobalModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useAuthModal } from '~/Context/AuthModalProvider'
import { useGlobalModal } from '~/Context/GlobalModalProvider'

const cx = classNames.bind(styles)
function SessionExpiredModal() {
  const { isOpenGlobalModal, closeGlobalModal } = useGlobalModal()
  const { openAuthModal } = useAuthModal()

  const handleReLogin = () => {
    closeGlobalModal('expiredSession')
    openAuthModal('login')
  }

  return (
    <Modal
      show={isOpenGlobalModal.expiredSession}
      onHide={() => closeGlobalModal('expiredSession')}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>Thông báo</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className={cx('message', 'mt-3')}>Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!</p>
      </Modal.Body>
      <Modal.Footer className="mt-3">
        <div className="d-flex mt-4 justify-content-center">
          <Button outline onClick={() => closeGlobalModal('expiredSession')}>Bỏ qua</Button>
          <Button primary onClick={handleReLogin}>
            Đăng nhập
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionExpiredModal
