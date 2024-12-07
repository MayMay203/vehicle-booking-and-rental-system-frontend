import { images } from '~/assets/images'
import styles from './Ticket.module.scss'
import classNames from 'classnames/bind'
import { MessageIcon, StarIcon } from '../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import Voucher from '../Voucher'
import { useEffect, useMemo, useState } from 'react'
import UtilitiesList from '../UtilitiesList'
import ImageList from '../ImageList'
import FeedbackSlider from '../FeedbackSlider'
import Tabs from '../Tabs'
import { faReadme } from '@fortawesome/free-brands-svg-icons'
import Comment from '../Comment'
import { useDispatch, useSelector } from 'react-redux'
import {
  generalModalNames,
  setConfirmModalVisible,
  setMessageModalVisible,
  setTicketModalVisible,
} from '~/redux/slices/generalModalSlice'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { getBusUtilities } from '~/apiServices/ticket/getBusUtilities'
import { getPoliciesTicket } from '~/apiServices/ticket/getPoliciesTicket'
import { getBusImage } from '~/apiServices/ticket/getBusImage'
import { getPickReturnLocations } from '~/apiServices/ticket/getPickReturnLocations'
import { config } from '~/config'
import { createCoversation } from '~/apiServices/messageService/createConverstation'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function TicketItem({ status, data = {} }) {
  const dispatch = useDispatch()
  const { busTripScheduleId } = data
  const [type, setType] = useState(status ? 'feedback' : 'discount')
  const [isDetail, setIsDetail] = useState(false)
  const [detailInfor, setDetaiInfor] = useState({})
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)

  const settings = useMemo(
    () => ({
      slidesToShow: 6,
      infinite: false,
      swipe: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [],
  )

  const tabList = useMemo(() => {
    const tabs = [
      {
        label: 'Giảm giá',
        value: 'discount',
      },
      {
        label: 'Đón/trả',
        value: 'pickReturn',
      },
      {
        label: 'Đánh giá',
        value: 'feedback',
      },
      {
        label: 'Hình ảnh',
        value: 'image',
      },
      {
        label: 'Chính sách',
        value: 'policy',
      },
      {
        label: 'Tiện ích',
        value: 'utility',
      },
    ]

    return tabs
  }, [])

  console.log(data)

  useEffect(() => {
    async function getDetail() {
      const actions = {
        utility: async () => {
          const utilitiesList = await getBusUtilities(data.busInfo?.busType?.id || data.busInfo?.busId)
          setDetaiInfor((prev) => ({ ...prev, [type]: utilitiesList }))
        },
        policy: async () => {
          const policiesList = await getPoliciesTicket(data.businessPartnerInfo?.id || data.businessPartner.id)
          setDetaiInfor((prev) => ({ ...prev, [type]: policiesList }))
        },
        image: async () => {
          const imagesList = await getBusImage(data.busInfo?.busType?.id || data.busInfo?.busId)
          setDetaiInfor((prev) => ({ ...prev, [type]: imagesList }))
        },
        feedback: async () => {
          // Implement feedback logic here
        },
        discount: async () => {
          // Implement discount logic here
        },
        pickReturn: async () => {
          const locations = await getPickReturnLocations(
            data.busTripScheduleId || data.tripInfo?.id,
            data.busTripInfo?.arrivalLocation,
          )
          setDetaiInfor((prev) => ({ ...prev, [type]: locations }))
        },
      }

      const action = actions[type]
      if (action) {
        await action()
      } else {
        console.log('No tab found')
      }
    }

    if (isDetail && !detailInfor[type]) {
      getDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetail, type, busTripScheduleId])

  const handleShowDetail = () => {
    setIsDetail((prev) => !prev)
  }

  const handleClickTab = (type) => {
    setType(type)
  }

  const handleChooseTicket = () => {
    if (isLogin) {
      dispatch(
        setTicketModalVisible({
          name: generalModalNames.BUY_TICKET,
          type: '',
          id: busTripScheduleId,
          isOpen: true,
        }),
      )
    } else {
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    }
  }

  const handleShowDetailOrder = () => {
    dispatch(
      setTicketModalVisible({
        name: generalModalNames.BUY_TICKET,
        type: 'detailOrder',
        transactionCode: data.orderInfo.transactionCode,
        isOpen: true,
      }),
    )
  }

  const handleCancelTicket = () => {
    dispatch(
      setConfirmModalVisible({
        modalType: 'confirm',
        isOpen: true,
        title: 'Xác nhận huỷ vé',
        description: 'Vui lòng hủy vé ít nhất 12 tiếng trước giờ khởi hành. Bạn có chắc chắn muốn hủy vé xe này không?',
        name: generalModalNames.CANCEL_TICKET,
        id: data.orderInfo.orderId,
      }),
    )
  }

  const handleSendMessage = async () => {
    if (dispatch(checkLoginSession())) {
      // Create new conversation
      const idConversation = await createCoversation(
        currentUser.id,
        currentRole,
        data.businessPartnerInfo?.accountId,
        config.variables.busPartner,
      )
      dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'gx-4', 'gy-4')}>
        <div className="col">
          <div className={cx('image-wrapper')}>
            <img src={data.busInfo?.imageRepresentative} alt="car" className={cx('image')}></img>
            {currentUser.id !== data.businessPartnerInfo?.id && (
              <button className={cx('btn-msg')} onClick={handleSendMessage}>
                <MessageIcon />
              </button>
            )}
          </div>
        </div>
        <div className="col d-flex flex-column gap-2 gap-lg-4">
          <div className="d-flex gap-4 align-items-center">
            <span className={cx('name')}>{data.businessPartnerInfo?.name || data.businessPartner?.name}</span>
            {/* {status && <span className={cx('amount')}>2 x 150.000đ</span>} */}
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <span className={cx('type')}>{data.busInfo?.nameVehicleType || data.busInfo?.nameBusType}</span>
            <div className={cx('rating')}>
              <StarIcon className={cx('icon')} width="2.6rem" />
              <span>4.5(5)</span>
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <img className={cx('location-img')} alt="location" src={images.location} />
            <div className={cx('location-time', 'd-flex', 'flex-column', 'gap-4', 'justify-content-center')}>
              <div className="d-flex gap-4">
                <p style={{ fontWeight: 400 }}>
                  <span style={{ fontWeight: 600 }}>{data.departureTime || data.tripInfo?.departureDateTime}</span>
                  {` • ${data.busTripInfo?.departureLocation || data.tripInfo?.departureLocation}`}
                </p>
                {/* {status && (
                  <p className={cx('date')}>
                    <FontAwesomeIcon icon={faCalendar} />
                    05/10/2024
                  </p>
                )} */}
              </div>

              <span className={cx('duration')}>
                {data.busTripInfo?.durationJourney || data.tripInfo?.durationJourney}
              </span>
              <p style={{ fontWeight: 400 }}>
                <span style={{ fontWeight: 600 }}>{data.arrivalTime || data.tripInfo?.arrivalDateTime}</span>
                {` • ${data.busTripInfo?.arrivalLocation || data.tripInfo?.arrivalLocation}`}
              </p>
            </div>
          </div>
        </div>
        <div className=" col col-md-12 d-flex flex-column justify-content-between align-items-start align-items-lg-end justify-content-md-end justify-content-lg-between">
          <div className="d-flex justify-content-md-end w-100 flex-lg-column gap-5 mb-4 mb-lg-0 gap-lg-4 align-items-center align-items-lg-end">
            <span className={cx('price', { amount: status })}>
              {data.priceTicket || `${data.orderInfo?.numberOfTicket} x ${data.orderInfo?.pricePerTicket}`}
            </span>
            {status ? (
              <span className={cx('sale-off')}>{`-${Math.round(data.orderInfo?.discountPercentage)}%`}</span>
            ) : (
              <span className={cx('sale-off')}>{`-${Math.round(data.discountPercentage)}%`}</span>
            )}
          </div>
          {!status && <span className={cx('status', 'w-100')}>{`Còn ${data.availableSeats} chỗ trống`}</span>}
          {status && (
            <button
              className={cx('d-flex', 'align-items-center', 'gap-2', 'fs-4', 'detail-btn')}
              onClick={handleShowDetailOrder}
            >
              Chi tiết hoá đơn
              <FontAwesomeIcon icon={faReadme} className={cx('icon')}></FontAwesomeIcon>
            </button>
          )}
          <div className="d-flex w-100 align-items-center justify-content-between justify-content-md-end justify-content-lg-none mt-4 mt-lg-0 gap-sm-2 gap-md-5 gap-lg-5">
            <button className={cx('actions', 'd-flex', 'gap-2', 'align-items-center')} onClick={handleShowDetail}>
              <span>Chi tiết chuyến xe</span>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ rotate: isDetail ? '-180deg' : '0deg', transition: 'rotate .2s ease' }}
              />
            </button>
            {!status ? (
              <Button rounded onClick={handleChooseTicket}>
                Đặt ngay
              </Button>
            ) : status === 'current' ? (
              <Button rounded onClick={handleCancelTicket}>
                Huỷ
              </Button>
            ) : (
              <></>
              // <Button rounded onClick={handleChooseTicket}>
              //   Đặt lại
              // </Button>
            )}
          </div>
        </div>
      </div>
      <div style={{ color: '#484848', fontSize: '1.5rem', marginTop: '20px', lineHeight: '1.4' }}>
        <span style={{ color: 'red' }}>* </span>
        {data.journey}
      </div>
      {isDetail && (
        <div className="mt-5">
          <Tabs tabList={tabList} settings={settings} type={type} handleClickTab={handleClickTab}></Tabs>
          {type === 'discount' && (
            <div className="mt-5 row row-cols-1 justify-content-center row-cols-lg-2 gy-5">
              <div className="col mt-0">
                <Voucher className="m-auto" />
              </div>
              <div className="col mt-0">
                <Voucher className="m-auto" />
              </div>
              <div className="col mt-0">
                <Voucher className="m-auto" />
              </div>
              <div className="col mt-0">
                <Voucher className="m-auto" />
              </div>
            </div>
          )}
          {type === 'pickReturn' && detailInfor['pickReturn'] && (
            <div className="py-5 mt-4" style={{ backgroundColor: 'var(--primary-bg)', borderRadius: 8 }}>
              <span className="text-center mb-5 d-block" style={{ lineHeight: '1.3' }}>
                Khách hàng vui lòng liên hệ với chủ nhà xe để được đón/trả tại những địa điểm dưới đây:
              </span>
              <div className="d-flex flex-column flex-lg-row justify-content-center gap-5 mt-2">
                <div>
                  <p className={cx('title', 'fst-italic')}>Điểm đón</p>
                  <div className={cx('policies')}>
                    {detailInfor['pickReturn'].pickupLocations.map((pickup) => (
                      <span className={cx('policy', 'fst-italic')} style={{ fontSize: '1.5rem' }}>
                        {pickup}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={cx('title', 'fst-italic')}>Điểm trả</p>
                  <div className={cx('policies')}>
                    {detailInfor['pickReturn'].dropOffLocations.map((dropOff) => (
                      <span className={cx('policy', 'fst-italic')} style={{ fontSize: '1.5rem' }}>
                        {dropOff}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {type === 'feedback' && (
            <div className="position-relative">
              <div className={cx('top')}>
                <div className={cx('rating')}>
                  <StarIcon className={cx('icon')} width="2.6rem" />
                  <span>4.5(5)</span>
                </div>
                <span className={cx('number')}>830 đánh giá</span>
              </div>
              <div className="p-5 pt-3">
                <FeedbackSlider />
              </div>
              {status === 'completed' && <Comment />}
            </div>
          )}
          {type === 'policy' && detailInfor['policy'] && (
            <div className={cx('policy-wrapper', 'mt-5')}>
              <p className={cx('title')}>Chính sách nhà xe</p>
              <div className={cx('policies')}>
                {detailInfor['policy'].map((policy, index) => (
                  <span key={index} className={cx('policy')}>
                    {policy}
                  </span>
                ))}
              </div>
            </div>
          )}
          {type === 'utility' && detailInfor['utility'] && <UtilitiesList dataList={detailInfor['utility']} />}
          {type === 'image' && detailInfor['image'] && (
            <div className="mt-5">
              <span
                className="d-block text-center fst-italic"
                style={{ fontWeight: 500 }}
              >{`Biển kiểm số: ${data.busInfo.licensePlate}`}</span>
              <ImageList dataList={detailInfor['image']} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TicketItem
