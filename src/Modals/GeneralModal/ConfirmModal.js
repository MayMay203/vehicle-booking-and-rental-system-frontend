import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { useUserContext } from '~/Context/UserProvider'
import { logout } from '~/apiServices/logout'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)
function ConfirmModal() {
  console.log('re-render confirm modal')
  const showConfirmModal = useSelector((state) => state.generalModal.confirm)
  const dispatch = useDispatch()

  const { toggleLogin } = useUserContext()
  const navigate = useNavigate()

  const handleConfirm = async () => {
    if (showConfirmModal.name === generalModalNames.LOGOUT) {
      try {
        await logout()
        toggleLogin()
        handleClose()
        navigate('/')
      } catch (message) {
        toast.error(String(message))
      }
    } else if (showConfirmModal.name === generalModalNames.EXPIRED_SESSION) {
      dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    }
  }

  const handleClose = () => {
    dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
  }

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

export default ConfirmModal
