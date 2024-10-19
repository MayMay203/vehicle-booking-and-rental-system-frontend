import { Modal } from 'react-bootstrap'
import styles from './ServiceModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { toast } from 'react-toastify'
import { useServiceModal } from '~/Context/ServiceModalProvider'

const cx = classNames.bind(styles)
function ConfirmModal() {
  const { isOpenServiceModal, closeServiceModal } = useServiceModal()

  const handleConfirm = async () => {
    toast.success('Mở tài khoản thành công.')
  }

  return (
    <Modal show={isOpenServiceModal.confirm} onHide={() => closeServiceModal('confirm')} centered size="md">
      <Modal.Header closeButton>
        <div className={cx('header')}>
          <Modal.Title className={cx('title-header')}>Xác nhận mở tài khoản</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className={cx('message', 'mt-3', 'text-center')}>Bạn chắc chắn muốn mở lại tài khoản này?</p>
      </Modal.Body>
      <Modal.Footer className={cx('mt-3', 'modal-actions')}>
        <div className="d-flex mt-4 column-gap-4">
          <Button outline onClick={() => closeServiceModal('confirm')}>
            Thoát
          </Button>
          <Button primary onClick={handleConfirm}>
            Xác nhận
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
