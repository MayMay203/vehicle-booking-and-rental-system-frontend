import classNames from "classnames/bind"
import styles from './ModalUtility.module.scss'
const cx = classNames.bind(styles)
function ModalUtility(){
    return (
      <Modal show={showConfirmModal.isOpen} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <div className={cx('header')}>
            <Modal.Title className={cx('title-header')}>{showConfirmModal.title}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className={cx('message', 'mt-3', 'text-center')}>{showConfirmModal.description}</p>
        </Modal.Body>
        <Modal.Footer className={cx('mt-3', 'modal-actions')}>
          <div className="d-flex mt-4 column-gap-4">
            <Button outline onClick={handleClose}>
              Thoát
            </Button>
            <Button primary onClick={handleConfirm}>
              {showConfirmModal.name === generalModalNames.EXPIRED_SESSION ? 'Đăng nhập lại' : 'Xác nhận'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )
}
export default ModalUtility