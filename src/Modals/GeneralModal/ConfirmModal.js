import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { logoutService } from '~/apiServices/logoutService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { checkLoginSession, logout } from '~/redux/slices/userSlice'
import { toast } from 'react-toastify'
import { unlockAccount } from '~/apiServices/unlockAccount'
import { fetchAllAccounts } from '~/redux/slices/accountSlice'

const cx = classNames.bind(styles)
function ConfirmModal() {
  console.log('re-render confirm modal')
  const showConfirmModal = useSelector((state) => state.generalModal.confirm)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleConfirm = async () => {
    if (showConfirmModal.name === generalModalNames.LOGOUT) {
      try {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
        if (dispatch(checkLoginSession())) {
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          await logoutService()
          dispatch(logout())
          navigate('/')
        }
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      } catch (message) {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        console.error(message)
      }
    } else if (showConfirmModal.name === generalModalNames.EXPIRED_SESSION) {
      dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    } else if (showConfirmModal.name === generalModalNames.UNLOCK_ACCOUNT) {
      const accountId = showConfirmModal.id
      try {
        if (dispatch(checkLoginSession())) {
          await unlockAccount(accountId)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllAccounts({active: false}))
          toast.success('Mở tài khoản thành công', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 800, position: 'top-center' })
      }
    }
  }

  const handleClose = () => {
    dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
    if (showConfirmModal.name === generalModalNames.EXPIRED_SESSION) {
      navigate('/')
    }
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
