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
import { fetchAllMyRentalOrders, fetchAllMyTicketOrders } from '~/redux/slices/orderSlice'
import { deleteBusType } from '~/apiServices/busPartner/deleteBusType'
import {
  fetchAllBuses,
  fetchAllBusTrips,
  fetchAllBusTypes,
  fetchBusTicketList,
  fetchScheduleListByBusTrip,
  fetchTicketInfor,
} from '~/redux/slices/busPartnerSlice'
import { deleteBus } from '~/apiServices/busPartner/deleteBus'
import { deleteVoucher } from '~/apiServices/vouchers/deleteVoucher'
import { fetchAllVouchers } from '~/redux/slices/voucherSlice'
import { cancelRentalOrder } from '~/apiServices/user/cancelRentalOrder'
import { deleteBusTrip } from '~/apiServices/busPartner/deleteBusTrip'
import { cancelScheduleOneDay } from '~/apiServices/busPartner/cancelScheduleOneDay'
import dayjs from 'dayjs'
import { suspendBusSchedule } from '~/apiServices/busPartner/suspendBusSchedule'
import ModalDetailBusTicket from '~/pages/BusPartner/BusTicketManage/ModalDetailBusTicket'
import { useState } from 'react'
import { updateStatusOrder } from '~/apiServices/rentalPartner/updateStatusOrder'
import { fetchAllOrder } from '~/redux/slices/rentalPartnerSlice'

const cx = classNames.bind(styles)
function ConfirmModal() {
  const showConfirmModal = useSelector((state) => state.generalModal.confirm)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [modalDetailTicketShow, setModalDetailTicketShow] = useState(false)
  const [ticket, setTicket] = useState({})
  const [idTicket, setIDTicket] = useState('')
  const [statusTicket, setStatusTicket] = useState({})
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
    } else if (showConfirmModal.name === generalModalNames.DEL_BUS_TRIP) {
      const busTripId = showConfirmModal.id
      try {
        if (dispatch(checkLoginSession())) {
          await deleteBusTrip(busTripId)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllBusTrips({ dep: '', des: '' }))
          toast.success('Xoá chuyến xe thành công!', { autoClose: 800, position: 'top-center' })
        }
      } catch (message) {
        if (message === "Can't delete the bus trip scheduled")
          toast.error('Chuyến xe đang được hoạt động. Bạn không thể xóa!', { autoClose: 1500, position: 'top-center' })
        else toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1500, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.DEL_BUS_TRIP_SCHEDULE_ONE_DAY) {
      const busTripScheduleId = showConfirmModal.id
      const date = showConfirmModal.date
      const idBusTrip = showConfirmModal.idBusTrip
      try {
        if (dispatch(checkLoginSession())) {
          await cancelScheduleOneDay(busTripScheduleId, dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'))
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(
            fetchScheduleListByBusTrip({
              date: dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
              idBusTrip: idBusTrip,
            }),
          )
          toast.success(`Xóa vé xe ngày ${dayjs(date).format('DD/MM/YYYY')} thành công!`, {
            autoClose: 800,
            position: 'top-center',
          })
        }
      } catch (message) {
        if (message === "Can't delete the bus trip scheduled")
          toast.error('Chuyến xe đang được hoạt động. Bạn không thể xóa!', { autoClose: 1500, position: 'top-center' })
        else toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1500, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.SUSPENDED_BUS_SCHEDULE) {
      const id = showConfirmModal.id
      const status = showConfirmModal.status
      const startDate = showConfirmModal.startDate
      try {
        if (dispatch(checkLoginSession())) {
          await suspendBusSchedule(id, status)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          // dispatch(
          //   fetchScheduleListByBusTrip({
          //     date: dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          //     idBusTrip: idBusTrip,
          //   }),
          // )
          // setTicket(ticket1)
          setStatusTicket(status)
          setIDTicket(id)
          // console.log('ticket nề :-------', ticket, '---', ticket1)
          const formattedDate = dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
          // const formattedDate = dayjs.isDayjs(startDate)
          //   ? startDate.format('YYYY-MM-DD')
          //   : dayjs(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')

          dispatch(fetchTicketInfor({ id: id, date: formattedDate }))

          dispatch(fetchBusTicketList({ dep: '', des: '' }))
          toast.success(`Cập nhật thành công`, {
            autoClose: 800,
            position: 'top-center',
          })
          setTicket((prev) => ({
            ...prev,
            suspended: status,
          }))
        }
      } catch (message) {
        if (message === "Can't delete the bus trip scheduled")
          toast.error('Cập nhật không thành công!', { autoClose: 1500, position: 'top-center' })
        else toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 1500, position: 'top-center' })
      }
      setModalDetailTicketShow(true)
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
    } else if (showConfirmModal.name === generalModalNames.CANCEL_RENTAL_ORDER) {
      try {
        if (dispatch(checkLoginSession())) {
          await cancelRentalOrder(showConfirmModal.id)
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          toast.success('Đơn thuê xe của bạn đã được hủy thành công!', { autoClose: 800, position: 'top-center' })
          dispatch(
            fetchAllMyRentalOrders({
              status: 'current',
            }),
          )
        }
      } catch (message) {
        if (message.includes("You can't cancel this order because it has exceed the time limit")) {
          toast.error('Đơn thuê xe không thể hủy vì đã quá thời hạn.!', { autoClose: 1000, position: 'top-center' })
          return
        }
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau!', { autoClose: 800, position: 'top-center' })
      }
    } else if (showConfirmModal.name === generalModalNames.DEL_VOUCHER) {
      if (dispatch(checkLoginSession())) {
        const id = showConfirmModal.id
        console.log(showConfirmModal)
        console.log(id)
        const response = await deleteVoucher(id)
        if (response?.statusCode === 200) {
          toast.success('Xoá mã khuyến mãi thành công!', { autoClose: 1000, position: 'top-center' })
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllVouchers({ page: 1 }))
        } else {
          toast.error('Mã khuyến mãi đã được sử dụng. Không thể xoá!', { autoClose: 1200, position: 'top-center' })
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
        }
      }
    } else if (showConfirmModal.name === generalModalNames.UPDATE_STATUS_RENTAL_ORDERS) {
      if (dispatch(checkLoginSession())) {
        const id = showConfirmModal.id
        const status = showConfirmModal.status
        console.log(status)
        console.log(id)
        const response = await updateStatusOrder(id, status)
        if (response?.statusCode === 200) {
          toast.success('Cập nhật thành công!', { autoClose: 1000, position: 'top-center' })
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
          dispatch(fetchAllOrder())
        } else {
          toast.error('Cập nhật thất bại. Vui lòng thử lại', { autoClose: 1200, position: 'top-center' })
          dispatch(setConfirmModalVisible({ modalType: 'confirm', isOpen: false }))
        }
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
    <>
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
      <ModalDetailBusTicket
        enableEdit={false}
        functionModal={'view'}
        show={modalDetailTicketShow}
        sendTicket={ticket}
        statusTicket={statusTicket}
        loadAgain={'1'}
        idTicket={idTicket}
        onHide={() => setModalDetailTicketShow(false)}
      ></ModalDetailBusTicket>
    </>
  )
}

export default ConfirmModal
