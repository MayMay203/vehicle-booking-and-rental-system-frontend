import { images } from '~/assets/images'
import styles from './Ticket.module.scss'
import classNames from 'classnames/bind'
import { MessageIcon, StarIcon } from '../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import { useEffect, useMemo, useRef, useState } from 'react'
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
import { getAllRatingOfTicket } from '~/apiServices/ratingService/getAllRatingOfTicket'
import { Empty } from 'antd'
import { createRating } from '~/apiServices/ratingService/createRating'
import { deleteRating } from '~/apiServices/ratingService/deleteRating'
import { updatRating } from '~/apiServices/ratingService/updateRating'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'
import SlideVoucher from '../Voucher/SlideVoucher'

const cx = classNames.bind(styles)
function TicketItem({ status, data = {}, isDetailOrder = false }) {
  const dispatch = useDispatch()
  const { voucherUser } = useSelector((state) => state.voucher)
  const { busTripScheduleId } = data
  const [type, setType] = useState(status ? 'feedback' : 'discount')
  const [isDetail, setIsDetail] = useState(false)
  const [detailInfor, setDetaiInfor] = useState({})
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const [isCommentable, setIsCommentable] = useState(false)
  const detailRef = useRef(null)

  useEffect(() => {
    if (data.tripInfo) {
      const [time, date] = data.tripInfo.arrivalDateTime.split(' ')
      const [day, month, year] = date.split('-')
      const isoDate = `${year}-${month}-${day}T${time}:00`
      setIsCommentable(new Date() - new Date(isoDate) <= 24 * 60 * 60 * 1000 * 5)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const tabList = useMemo(() => {
    const tabs = [
      ...(isDetailOrder === false
        ? [
            {
              label: 'Giảm giá',
              value: 'discount',
            },
          ]
        : []),
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
  }, [isDetailOrder])

  const settings = useMemo(
    () => ({
      slidesToShow: isDetailOrder ? 5 : 6,
      infinite: false,
      swipe: true,
      draggable: true,
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
    [isDetailOrder],
  )
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
          const dataRating = await getAllRatingOfTicket(data.busTripScheduleId || data.tripInfo?.busTripScheduleId)
          setDetaiInfor((prev) => ({ ...prev, [type]: dataRating || {} }))
        },
        pickReturn: async () => {
          const locations = await getPickReturnLocations(
            data.busTripScheduleId || data.tripInfo?.busTripScheduleId,
            data.busTripInfo?.arrivalLocation || data.tripInfo?.arrivalLocation,
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
        config.constants.busPartner,
      )
      dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
      dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
    }
  }

  const reGetAllRating = async () => {
    const dataRating = await getAllRatingOfTicket(data.busTripScheduleId || data.tripInfo?.busTripScheduleId)
    setDetaiInfor((prev) => ({ ...prev, [type]: dataRating || {} }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const handleComment = async (id, ratingValue, comment, action) => {
    switch (action) {
      case 'create':
        await createRating(data.orderInfo.orderId, ratingValue, comment)
        break
      case 'update':
        await updatRating(id, ratingValue, comment)
        break
      case 'delete':
        await deleteRating(id)
        break
      default:
    }
    reGetAllRating()
  }

  const handleFeedback = () => {
    if (detailRef.current) {
      detailRef.current.click()
      if (type !== 'feedback') setType('feedback')
    }
  }

  return (
    <div className={cx('wrapper', { minHeight: isDetail })}>
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
            {/* <div className={cx('rating')}>
              <StarIcon className={cx('icon')} width="2.6rem" />
              <span>{`${detailInfor}`}</span>
            </div> */}
          </div>
          <div className="d-flex gap-3 align-items-center">
            <img className={cx('location-img')} alt="location" src={images.location} />
            <div
              className={cx('location-time', 'd-flex', 'flex-column', 'justify-content-center')}
              style={{ gap: '16px' }}
            >
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

              <span className={cx('duration')}>{data.journeyDuration || data.tripInfo?.durationJourney}</span>
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
            <button
              className={cx('actions', 'd-flex', 'gap-2', 'align-items-center')}
              onClick={handleShowDetail}
              ref={detailRef}
            >
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
            )}
            {status === 'completed' && isCommentable && (
              <Button rounded onClick={handleFeedback}>
                Đánh giá
              </Button>
            )}
            {status === 'canceled' && isCommentable && currentUser.id !== data.cancelUserId && (
              <Button rounded onClick={handleFeedback}>
                Đánh giá
              </Button>
            )}
          </div>
        </div>
      </div>
      {data.journey && (
        <div style={{ color: '#484848', fontSize: '1.5rem', marginTop: '20px', lineHeight: '1.4' }}>
          <span style={{ color: 'red' }}>* </span>
          {data.journey}
        </div>
      )}
      {isDetail && (
        <div className="mt-5">
          <Tabs tabList={tabList} settings={settings} type={type} handleClickTab={handleClickTab}></Tabs>
          {type === 'discount' && !isDetailOrder && (
            // <div className="mt-5 row row-cols-1 justify-content-center row-cols-lg-2 gy-5">
            <div className="mt-5 row justify-content-center">
              {/* {voucherUser.map((voucher) => (
                <div className="col mt-0" key={voucher.id}>
                  <Voucher className="m-auto" data={voucher} />
                </div>
              ))} */}
              <SlideVoucher listVoucher={voucherUser}></SlideVoucher>
            </div>
          )}
          {type === 'pickReturn' && detailInfor['pickReturn'] && (
            <div
              className="d-flex flex-column flex-lg-row justify-content-center gap-5 mt-2"
              style={{
                padding: '20px',
                backgroundColor: '#f3f4f6',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Điểm đón */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                }}
              >
                <p
                  className={cx('title', 'fst-italic')}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '15px',
                  }}
                >
                  Điểm đón
                </p>
                <div className={cx('policies')} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {detailInfor['pickReturn'].pickupLocations.map((pickup, index) => (
                    <span
                      key={index}
                      className={cx('policy', 'fst-italic')}
                      style={{
                        fontSize: '1.4rem',
                        color: '#555',
                        padding: '8px 12px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '5px',
                      }}
                    >
                      {pickup}
                    </span>
                  ))}
                </div>
              </div>

              {/* Điểm trả */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                }}
              >
                <p
                  className={cx('title', 'fst-italic')}
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '15px',
                  }}
                >
                  Điểm trả
                </p>
                <div className={cx('policies')} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {detailInfor['pickReturn'].dropOffLocations.map((dropOff, index) => (
                    <span
                      key={index}
                      className={cx('policy', 'fst-italic')}
                      style={{
                        fontSize: '1.4rem',
                        color: '#555',
                        padding: '8px 12px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '5px',
                      }}
                    >
                      {dropOff}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {type === 'feedback' && (
            <div className="position-relative">
              {detailInfor['feedback']?.result?.result.length > 0 && (
                <div className={cx('top')}>
                  <div className={cx('rating')}>
                    <StarIcon className={cx('icon')} width="2.6rem" />
                    <span>{`${detailInfor['feedback']?.averageRating || 0}(5)`}</span>
                  </div>
                  <span className={cx('number')}>{`${
                    detailInfor['feedback']?.result?.result.length || 0
                  } đánh giá`}</span>
                </div>
              )}
              <div className="p-5 pt-3">
                {detailInfor['feedback']?.result?.result.length > 0 ? (
                  <FeedbackSlider
                    dataList={detailInfor['feedback'].result.result.reverse()}
                    handleComment={handleComment}
                  />
                ) : (
                  <Empty
                    style={{ marginTop: '40px', marginBottom: '12px' }}
                    description="Không có đánh giá nào gần đây"
                  />
                )}
              </div>
              {status === 'completed' &&
                isCommentable &&
                !detailInfor['feedback']?.result?.result.some((feedback) => feedback.accountId === currentUser.id) && (
                  <Comment handleComment={handleComment} />
                )}
            </div>
          )}
          {type === 'policy' && detailInfor['policy'] && (
            <div
              className={cx('policy-wrapper', 'mt-5')}
              style={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p
                className={cx('title')}
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                Chính sách nhà xe
              </p>
              <div className={cx('policies')} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {detailInfor['policy'].map((policy, index) => (
                  <span
                    key={index}
                    className={cx('policy')}
                    style={{
                      fontSize: '1.4rem',
                      color: '#555',
                      padding: '10px 15px',
                      backgroundColor: '#e9ecef',
                      borderRadius: '5px',
                      // transition: 'background-color 0.3s ease, transform 0.2s ease',
                    }}
                    // onMouseEnter={(e) => (e.target.style.backgroundColor = '#dbe2e6')}
                    // onMouseLeave={(e) => (e.target.style.backgroundColor = '#e9ecef')}
                  >
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
