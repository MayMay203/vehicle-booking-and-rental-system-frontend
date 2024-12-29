import classNames from "classnames/bind";
import styles from './Notification.module.scss'
import { images } from "~/assets/images";
import { updateStatusNotification } from '~/apiServices/messageService/updateStatusNotification'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllNotificationsByAcc } from "~/redux/slices/conversationSlice";
import { config } from '~/config'
import { useNavigate } from 'react-router-dom'
import { generalModalNames, setTicketModalVisible } from '~/redux/slices/generalModalSlice'
import { constants } from '~/config/constants'
import { useEffect, useState } from 'react'
import { checkLoginSession, setCurrentUser } from '~/redux/slices/userSlice'
import { getMyAccount } from '~/apiServices/getMyAccount'
import ModalDetailOrderRental from '../ModalDetailOrderRental'

const cx = classNames.bind(styles)
function NotificationItem({ data, handleClose }) {
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const [modalDetailShow, setModalDetailShow] = useState(false)
  const [transactionCodeState, setTransactionCodeState] = useState('')
  const [src, setSrc] = useState('')
  const {
    NEW_BOOKING,
    BOOKING_CANCELLED,
    BOOKING_COMPLETED,
    CANCELED_REGISTER_PARTNER,
    APPROVAL_REGISTER_PARTNER,
    RECEIVED_REGISTER_PARTNER,
    REFUSED_REGISTER_PARTNER,
  } = config.constants
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data.type === NEW_BOOKING) setSrc(images.newBooking)
    else if (data.type === BOOKING_CANCELLED) setSrc(images.bookingCancelled)
    else if (data.type === BOOKING_COMPLETED) setSrc(images.bookingComplete)
    else if (data.type === CANCELED_REGISTER_PARTNER) setSrc(images.deletePartner)
    else if (data.type === APPROVAL_REGISTER_PARTNER) setSrc(images.approvalPartner)
    else if (data.type === REFUSED_REGISTER_PARTNER) setSrc(images.refusePartner)
    else if (data.type === RECEIVED_REGISTER_PARTNER) setSrc(images.receivedPartner)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.type])

  useEffect(() => {
    if (data.type === NEW_BOOKING) setSrc(images.newBooking)
    else if (data.type === BOOKING_CANCELLED) setSrc(images.bookingCancelled)
    else if (data.type === BOOKING_COMPLETED) setSrc(images.bookingComplete)
    else if (data.type === CANCELED_REGISTER_PARTNER) setSrc(images.deletePartner)
    else if (data.type === APPROVAL_REGISTER_PARTNER) setSrc(images.approvalPartner)
    else if (data.type === REFUSED_REGISTER_PARTNER) setSrc(images.refusePartner)
    else if (data.type === RECEIVED_REGISTER_PARTNER) setSrc(images.receivedPartner)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.type])

  const handleReaded = async () => {
    if (!data.seen) {
      await updateStatusNotification(currentUser.id, currentRole, data.id)
      dispatch(fetchAllNotificationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
    }
    if (currentRole === 'USER' && (data.type === BOOKING_CANCELLED || data.type === BOOKING_COMPLETED)) {
      navigate(config.routes.order)
      handleClose()
    } else if (data.type === NEW_BOOKING) {
      const { transactionCode, orderType } = JSON.parse(data.metadata)
      
      if (orderType === constants.BUS_TRIP_ORDER) {
        dispatch(
          setTicketModalVisible({
            name: generalModalNames.BUY_TICKET,
            type: 'detailOrder',
            isNoti: true,
            transactionCode: transactionCode,
            isOpen: true,
          }),
        )
      } else {
        setTransactionCodeState(transactionCode)
        setModalDetailShow(true)
      }
      handleClose()
    } else if (data.type === RECEIVED_REGISTER_PARTNER) {
      if (data.title.includes('đối tác cho thuê xe')) {
        navigate(`${config.routes.managePartners}?type=${config.constants.carRentalPartner}`)
      } else if (data.title.includes('đối tác nhà xe')) {
        navigate(`${config.routes.managePartners}?type=${config.constants.busPartner}`)
      } else {
        navigate(`${config.routes.managePartners}?type=${config.constants.driverPartner}`)
      }
      handleClose()
    } else if (data.type === CANCELED_REGISTER_PARTNER || data.type === APPROVAL_REGISTER_PARTNER) {
      if (dispatch(checkLoginSession())) {
        const currentAccount = await getMyAccount()
        dispatch(setCurrentUser({ currentUser: currentAccount.accountInfo }))
      }
    }
  }

  return (
    <div>
      <div className={cx('d-flex', 'column-gap-3', 'item', { status: !data.seen })} onClick={handleReaded}>
        <div className={cx('image-wrapper')}>
          <img src={src} alt="avatar" className={cx('image')}></img>
        </div>
        <div className={cx('d-flex', 'flex-column', 'row-gap-2', 'info')}>
          <p className={cx('title')}>{data.title}</p>
          <p className={cx('content')}>{data.message}</p>
          <span className={cx('time')}>{data.create_at}</span>
        </div>
        {!data.seen && <span className={cx('unread')}></span>}
      </div>
      <ModalDetailOrderRental
        show={modalDetailShow}
        transactionCode={transactionCodeState}
        onHide={() => setModalDetailShow(false)}
      />
    </div>
  )
}

export default NotificationItem;