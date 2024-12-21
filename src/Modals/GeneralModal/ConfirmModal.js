import { Modal } from 'react-bootstrap'
import styles from './GeneralModal.module.scss'
import classNames from 'classnames/bind'
import Button from '~/components/Button'
import { logoutService } from '~/apiServices/logoutService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { checkLoginSession, logout, setCurrentUser } from '~/redux/slices/userSlice'
import { toast } from 'react-toastify'
import { unlockAccount } from '~/apiServices/unlockAccount'
import { fetchAllAccounts } from '~/redux/slices/accountSlice'
import { setMenu } from '~/redux/slices/menuSlice'
import { deleteUtility } from '~/apiServices/manageUtilities/deleteUtility'
import { fetchAllFeeServices, fetchAllUtilities } from '~/redux/slices/generalAdminSlice'
import { deleteFeeService } from '~/apiServices/manageFeeService/deleteFeeService'
import { cancelTicket } from '~/apiServices/ticket/cancelTicket'
import { fetchAllMyTicketOrders } from '~/redux/slices/orderSlice'
import { deleteBusType } from '~/apiServices/busPartner/deleteBusType'
import { fetchAllBuses, fetchAllBusTypes } from '~/redux/slices/busPartnerSlice'
import { deleteBus } from '~/apiServices/busPartner/deleteBus'

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
        dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
        await logoutService()
        dispatch(setMenu('userMenu'))
        dispatch(setCurrentUser({ currentUser: {} }))
        dispatch(logout())
        // add localstorage
        localStorage.removeItem('accessToken')
        navigate('/')
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
          dispatch(fetchAllAccounts({ active: false }))
          toast.success('Mở tài khoản thành công', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 800, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.UTILITY_MODAL) {
      const utilityId = showConfirmModal.id
      try {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
        if (dispatch(checkLoginSession())) {
          await deleteUtility(utilityId)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllUtilities())
          toast.success('Xoá tiện ích thành công!', { autoClose: 800, position: 'top-center' })
        }
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      } catch (message) {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        if (message.includes('Cannot delete this utility')) {
          toast.error('Tiện ích đã được sử dụng. Không thể xoá!', { autoClose: 1000, position: 'top-center' })
          return
        }
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1000, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.FEE_SERVICE_MODAL) {
      const feeServiceId = showConfirmModal.id
      try {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
        if (dispatch(checkLoginSession())) {
          await deleteFeeService(feeServiceId)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllFeeServices())
          toast.success('Xoá dịch vụ thành công!', { autoClose: 800, position: 'top-center' })
        }
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      } catch (message) {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 800, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.DEL_BUS_TYPE) {
      const busTypeId = showConfirmModal.id
      try {
        if (dispatch(checkLoginSession())) {
          await deleteBusType(busTypeId)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllBusTypes())
          toast.success('Xoá loại xe thành công!', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        if (message === 'Internal Server Error')
          toast.error('Loại xe đang được sử dụng. Bạn không thể xóa!', { autoClose: 1500, position: 'top-center' })
        else toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1500, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.DEL_BUS) {
      const busId = showConfirmModal.id
      try {
        if (dispatch(checkLoginSession())) {
          await deleteBus(busId)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllBuses())
          toast.success('Xoá xe thành công!', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        if (message === 'Internal Server Error')
          toast.error('Xe đang được sử dụng. Bạn không thể xóa!', { autoClose: 1500, position: 'top-center' })
        else toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1500, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.CANCEL_TICKET) {
      try {
        if (dispatch(checkLoginSession())) {
          await cancelTicket(showConfirmModal.id)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          toast.success('Vé của bạn đã được hủy thành công!', { autoClose: 800, position: 'top-center' })
          dispatch(
            fetchAllMyTicketOrders({
              isCanceled: 0,
              isGone: false,
            }),
          )
        }
      } catch (message) {
        if (message.includes("You can't cancel this order because it has exceed the time limit")) {
          toast.error('Vé xe không thể hủy vì đã quá thời hạn.!', { autoClose: 1000, position: 'top-center' })
          return
        }
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau!', { autoClose: 800, position: 'top-center' })
      }
    }
  }

  const handleClose = () => {
    dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
    if (showConfirmModal.name === generalModalNames.EXPIRED_SESSION) {
      dispatch(setMenu('userMenu'))
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
