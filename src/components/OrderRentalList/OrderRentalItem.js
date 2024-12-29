import styles from './OrderRentalItem.module.scss'
import classNames from 'classnames/bind'
import { MessageIcon, StarIcon } from '../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import { useEffect, useMemo, useRef, useState } from 'react'
import FeedbackSlider from '../FeedbackSlider'
import Tabs from '../Tabs'
import { faReadme } from '@fortawesome/free-brands-svg-icons'
import Comment from '../Comment'
import { useDispatch, useSelector } from 'react-redux'
import {
  generalModalNames,
  setConfirmModalVisible,
  setMessageModalVisible,
  // setTicketModalVisible,
} from '~/redux/slices/generalModalSlice'
// import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { createCoversation } from '~/apiServices/messageService/createConverstation'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { Empty } from 'antd'
import { createRating } from '~/apiServices/ratingService/createRating'
import { deleteRating } from '~/apiServices/ratingService/deleteRating'
import { updatRating } from '~/apiServices/ratingService/updateRating'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'
import SlideVoucher from '../Voucher/SlideVoucher'
import { getVehicleRentalByID } from '~/apiServices/user/getVehicleRentalByID'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { convertDateTimeFormat } from '~/utils/convertDateTimeFormat'
import ModalDetailOrderRental from '../ModalDetailOrderRental'
import { getRatingsRentalByIDService } from '~/apiServices/user/getRatingsRentalByIDService'
import { Col, Image, Row } from 'react-bootstrap'

const cx = classNames.bind(styles)
function OrderRentalItem({ status, data = {}, isDetailOrder = false }) {
  const dispatch = useDispatch()
  const { voucherUser } = useSelector((state) => state.voucher)
  // const { busTripScheduleId } = data
  const [type, setType] = useState(status ? 'feedback' : 'discount')
  const [isDetail, setIsDetail] = useState(false)
  const [detailInfor, setDetaiInfor] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const [isCommentable, setIsCommentable] = useState(false)
  const detailRef = useRef(null)
  const [inforRentalVehicle, setInforRentalVehicle] = useState({})
  const [modalDetailShow, setModalDetailShow] = useState(false)
  const getInforRentalVehicle = async (id) => {
    console.log('---vô-00---')
    const response = await getVehicleRentalByID(id)
    return response
  }
  console.log('data?.rentalInfo?.carRentalServiceId:', data?.rentalInfo?.carRentalServiceId)
  const tabList = useMemo(() => {
    const tabs = [
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
  const [listImageVehicle, setListImageVehicle] = useState(inforRentalVehicle?.imagesVehicleRegister)
  // console.log('listImageVehicle---', listImageVehicle)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [imageVehiclePerPage, setImageVehiclePerPage] = useState(3)
  const imageVehiclePerPage = 2
  const displayedImageVehicle = listImageVehicle?.slice(currentIndex, currentIndex + imageVehiclePerPage)
  // console.log('displayedImageVehicle', displayedImageVehicle)
  const handleNext = () => {
    if (currentIndex + imageVehiclePerPage < listImageVehicle.length) {
      // resetImageVehicleStates()
      setCurrentIndex(currentIndex + imageVehiclePerPage)
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevious = () => {
    if (currentIndex - imageVehiclePerPage >= 0) {
      // resetimageVehicleStates()
      setCurrentIndex(currentIndex - imageVehiclePerPage)
      setCurrentPage(currentPage - 1)
    }
  }
  useEffect(() => {
    const fetchRentalInfo = async () => {
      console.log('---vô-0---')
      try {
        console.log('---vô----')
        const rentalInfo = await getInforRentalVehicle(data?.rentalInfo?.carRentalServiceId)
        setInforRentalVehicle(rentalInfo)
      } catch (error) {
        console.error('Error fetching rental info:', error)
      }
    }
    fetchRentalInfo()
  }, [data.rentalInfo.carRentalServiceId])
  useEffect(() => {
    if (data.rentalInfo) {
      const [time, date] = data.rentalInfo.endRentalTime.split(' ')
      const [day, month, year] = date.split('-')
      const isoDate = `${year}-${month}-${day}T${time}:00`
      setIsCommentable(new Date() - new Date(isoDate) <= 24 * 60 * 60 * 1000 * 5)
      console.error('Thời gian:--', isoDate)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.rentalInfo.endRentalTime])
  useEffect(() => {
    setListImageVehicle(inforRentalVehicle?.imagesVehicleRegister)
  }, [inforRentalVehicle])
  useEffect(() => {
    async function getDetail() {
      const actions = {
        utility: async () => {
          const utilitiesList =
            inforRentalVehicle?.ulties
              .split(',')
              .filter(Boolean)
              .map((value, index) => <span key={index}>{value.trim()}</span>) || ''
          setDetaiInfor((prev) => ({ ...prev, [type]: utilitiesList }))
        },
        policy: async () => {
          const policiesList =
            inforRentalVehicle?.policy
              .split('@#$%&')
              .filter(Boolean)
              .map((value, index) => <span key={index}>{value.trim()}</span>) || ''

          setDetaiInfor((prev) => ({ ...prev, [type]: policiesList }))
        },

        image: async () => {
          // const imagesList = await getBusImage(data.busInfo?.busType?.id || data.busInfo?.busId)
          // setDetaiInfor((prev) => ({ ...prev, [type]: imagesList }))
        },
        feedback: async () => {
          const dataRating = await getRatingsRentalByIDService(data?.rentalInfo?.carRentalServiceId)
          setDetaiInfor((prev) => ({ ...prev, [type]: dataRating || {} }))
          console.log('dataRating:', dataRating)
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
  }, [isDetail, type, data?.rentalInfo?.carRentalServiceId])

  const handleShowDetail = () => {
    setIsDetail((prev) => !prev)
  }

  const handleClickTab = (type) => {
    setType(type)
  }

  // const handleChooseTicket = () => {
  //   if (isLogin) {
  //     dispatch(
  //       setTicketModalVisible({
  //         name: generalModalNames.BUY_TICKET,
  //         type: '',
  //         id: busTripScheduleId,
  //         isOpen: true,
  //       }),
  //     )
  //   } else {
  //     dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
  //   }
  // }

  const handleShowDetailOrder = () => {
    setModalDetailShow(true)
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
        inforRentalVehicle?.partnerId,
        'CAR_RENTAL_PARTNER',
      )
      dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
      dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
    }
  }

  const reGetAllRating = async () => {
    const dataRating = await getRatingsRentalByIDService(data?.rentalInfo?.carRentalServiceId)
    setDetaiInfor((prev) => ({ ...prev, [type]: dataRating || {} }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const handleComment = async (id, ratingValue, comment, action) => {
    switch (action) {
      case 'create':
        await createRating(data.orderId, ratingValue, comment)
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
  console.log('---inforRentalVehicle:', inforRentalVehicle)
  return (
    <div className={cx('wrapper', { minHeight: isDetail })}>
      <div className={cx('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'gx-4', 'gy-4')}>
        <div className="col">
          <div className={cx('image-wrapper')}>
            <img src={inforRentalVehicle?.imagesVehicleRegister?.[0]} alt="car" className={cx('image')}></img>
            <button className={cx('btn-msg')} onClick={handleSendMessage}>
              <MessageIcon />
            </button>
          </div>
        </div>
        <div className="col d-flex flex-column gap-2 gap-lg-4">
          <div className="d-flex gap-4 align-items-center">
            <span className={cx('name')}>{inforRentalVehicle?.partnerName}</span>
            {/* {status && <span className={cx('amount')}>2 x 150.000đ</span>} */}
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <span className={cx('type')}>
              {inforRentalVehicle?.vehicle_type} {inforRentalVehicle?.manufacturer}
              {inforRentalVehicle?.type === 0 ? ' tự lái' : ' có người lái'}
            </span>
            {/* <div className={cx('rating')}>
              <StarIcon className={cx('icon')} width="2.6rem" />
              <span>{`${detailInfor}`}</span>
            </div> */}
          </div>
          <div className="d-flex gap-3 align-items-center">
            <FontAwesomeIcon className={cx('icon-start-time')} icon={faClock}></FontAwesomeIcon>
            <div className={cx('location-time', 'd-flex', 'flex-column', 'justify-content-center')}>
              <div className="d-flex gap-4">
                <p style={{ fontWeight: 400 }}>
                  <span style={{ fontWeight: 600 }}>• Thuê từ</span>
                  <p className="mt-3 mb-2 ps-3">{convertDateTimeFormat(data?.rentalInfo?.startRentalTime)}</p>
                </p>
                {/* {status && (
                  <p className={cx('date')}>
                    <FontAwesomeIcon icon={faCalendar} />
                    05/10/2024
                  </p>
                )} */}
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <FontAwesomeIcon className={cx('icon-end-time')} icon={faClock}></FontAwesomeIcon>
            <div className={cx('location-time', 'd-flex', 'flex-column', 'justify-content-center')}>
              <div className="d-flex gap-4">
                <p style={{ fontWeight: 400 }}>
                  <span style={{ fontWeight: 600 }}>• Thuê đến</span>
                  <p className="mt-3 mb-2 ps-3">{convertDateTimeFormat(data?.rentalInfo?.endRentalTime)}</p>
                </p>
                {/* {status && (
                  <p className={cx('date')}>
                    <FontAwesomeIcon icon={faCalendar} />
                    05/10/2024
                  </p>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className=" col col-md-12 d-flex flex-column justify-content-between align-items-start align-items-lg-end justify-content-md-end justify-content-lg-between">
          <div className="d-flex justify-content-md-end w-100 flex-lg-column gap-5 gap-lg-4 align-items-center align-items-lg-end">
            <span className={cx('price', { amount: status })}>{data?.pricingInfo.price.toLocaleString('vi-VN')} đ</span>
          </div>
          <span className={cx('status', 'w-100')}>Số lượng thuê: {data?.rentalInfo?.numberOfVehicles}</span>

          <button
            className={cx('d-flex', 'align-items-center', 'gap-2', 'fs-4', 'detail-btn')}
            onClick={handleShowDetailOrder}
          >
            <span className={cx('detail-btn')}>Chi tiết hoá đơn</span>
            <FontAwesomeIcon icon={faReadme} className={cx('icon', 'detail-btn')}></FontAwesomeIcon>
          </button>
          <div className="d-flex w-100 align-items-center justify-content-between justify-content-md-end justify-content-lg-none mt-4 mt-lg-0 gap-sm-2 gap-md-5 gap-lg-5">
            <button
              className={cx('actions', 'd-flex', 'gap-2', 'align-items-center')}
              onClick={handleShowDetail}
              ref={detailRef}
            >
              <span>Chi tiết xe</span>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ rotate: isDetail ? '-180deg' : '0deg', transition: 'rotate .2s ease' }}
              />
            </button>
            {status === 'current' ? (
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
          {type === '' && !isDetailOrder && (
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
                Chính sách xe
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
          {type === 'utility' && detailInfor['utility'] && (
            <div
              className={cx('utility-wrapper', 'mt-5')}
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
                Tiện ích xe
              </p>
              <div className={cx('policies')} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {detailInfor['utility'].map((utility, index) => (
                  <span
                    key={index}
                    className={cx('utility')}
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
                    {utility}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* {type === 'utility' && detailInfor['utility'] && <UtilitiesList dataList={detailInfor['utility']} />} */}
          {type === 'image' && (
            // <div className="mt-5">
            //   <span
            //     className="d-block text-center fst-italic"
            //     style={{ fontWeight: 500 }}
            //   >{`Biển kiểm số: ${data.busInfo.licensePlate}`}</span>
            //   <ImageList dataList={detailInfor['image']} />
            // </div>
            <Row className="justify-content-center align-items-center pt-3 pb-3">
              <Col xs="1" className="d-flex justify-content-start">
                <Button
                  className={cx('nav-button-page')}
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="none"
                >
                  <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                </Button>
              </Col>
              <Col xs="10">
                <div className="d-flex justify-content-center">
                  {/* {(displayedImageVehicle?.[0] || []).map((item, index) => (
                    <Image key={index} src={item.imgLink} rounded className={cx('image-vehicle')} />
                  ))} */}
                  <div className="d-flex justify-content-center">
                    {displayedImageVehicle ? (
                      displayedImageVehicle.map((item, index) => (
                        <Image key={index} src={item} rounded className={cx('image-vehicle')} />
                      ))
                    ) : (
                      <p>No images available</p> // Hiển thị thông báo khi không có hình ảnh
                    )}
                  </div>

                  {/* Thêm các Col giả nếu danh sách không đủ utilitiesPerPage */}
                  {Array.from({ length: imageVehiclePerPage - displayedImageVehicle.length }, (_, index) => (
                    <div
                      className="utility-placeholder"
                      key={`placeholder-${index}`}
                      style={{ flex: '1 0 auto', visibility: 'hidden' }}
                    ></div>
                  ))}
                </div>
              </Col>
              <Col xs="1" className="d-flex justify-content-end">
                <Button
                  className={cx('nav-button-page')}
                  onClick={handleNext}
                  disabled={currentIndex + imageVehiclePerPage >= listImageVehicle.length}
                  variant="none"
                >
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                </Button>
              </Col>
            </Row>
          )}
        </div>
      )}
      <ModalDetailOrderRental
        show={modalDetailShow}
        transactionCode={data?.transactionCode}
        inforRentalVehicle={inforRentalVehicle}
        onHide={() => setModalDetailShow(false)}
      />
    </div>
  )
}

export default OrderRentalItem
