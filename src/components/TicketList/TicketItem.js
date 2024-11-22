import { images } from '~/assets/images'
import styles from './Ticket.module.scss'
import classNames from 'classnames/bind'
import { MessageIcon, StarIcon } from '../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import Voucher from '../Voucher'
import { useMemo, useState } from 'react'
import UtilitiesList from '../UtilitiesList'
import ImageList from '../ImageList'
import FeedbackSlider from '../FeedbackSlider'
import Tabs from '../Tabs'
import { faReadme } from '@fortawesome/free-brands-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import Comment from '../Comment'
import { useDispatch, useSelector } from 'react-redux'
import { generalModalNames, setConfirmModalVisible, setTicketModalVisible } from '~/redux/slices/generalModalSlice'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'

const cx = classNames.bind(styles)
function TicketItem({ status, data }) {
  const dispatch = useDispatch()
  const [type, setType] = useState(status ? 'feedback' : 'discount')
  const [isDetail, setIsDetail] = useState(false)
  const { isLogin } = useSelector((state) => state.user)

  const settings = useMemo(
    () => ({
      slidesToShow: 5,
      infinite: false,
      swipe: false,
      draggable: false,
      responsive: [
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
          id: data.idBusTripSchedule,
          isOpen: true,
        }),
      )
    } else {
      dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
    }
  }

  const handleShowDetailOrder = () => {
    dispatch(setTicketModalVisible({ name: generalModalNames.BUY_TICKET, type: 'detailOrder', isOpen: true }))
  }

  const handleCancelTicket = () => {
    dispatch(
      setConfirmModalVisible({
        modalType: 'inputConfirm',
        isOpen: true,
        title: 'Xác nhận huỷ vé',
        description: 'Bạn chắc chắn muốn huỷ vé xe này?',
        name: generalModalNames.CANCEL_TICKET,
      }),
    )
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'gx-4', 'gy-4')}>
        <div className="col">
          <div className={cx('image-wrapper')}>
            <img src={images.trip} alt="car" className={cx('image')}></img>
            <button className={cx('btn-msg')}>
              <MessageIcon />
            </button>
          </div>
        </div>
        <div className="col d-flex flex-column gap-2 gap-lg-4">
          <div className="d-flex gap-4 align-items-center">
            <span className={cx('name')}>{data.businessName}</span>
            {status && <span className={cx('amount')}>2 x 150.000đ</span>}
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <span className={cx('type')}>{data.busTypeName}</span>
            <div className={cx('rating')}>
              <StarIcon className={cx('icon')} width="2.6rem" />
              <span>4.5(5)</span>
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <img className={cx('location-img')} alt="location" src={images.location} />
            <div className={cx('location-time', 'd-flex', 'flex-column', 'gap-4', 'justify-content-center')}>
              <div className="d-flex gap-4">
                <span>{`${data.departureTime} ${data.departureLocation}`}</span>
                {status && (
                  <p className={cx('date')}>
                    <FontAwesomeIcon icon={faCalendar} />
                    05/10/2024
                  </p>
                )}
              </div>

              <span className={cx('duration')}>1h30m</span>
              <span>{`${data.arrivalTime} ${data.arrivalLocation}`}</span>
            </div>
          </div>
        </div>
        <div className=" col col-md-12 d-flex flex-column justify-content-between align-items-start align-items-lg-end justify-content-md-end justify-content-lg-between">
          <div className="d-flex justify-content-md-end w-100 flex-lg-column gap-5 mb-4 mb-lg-0 gap-lg-4 align-items-center align-items-lg-end">
            <span className={cx('price')}>{`${Math.round(data.priceTicket).toLocaleString()} VNĐ`}</span>
            <span className={cx('sale-off')}>{`-${Math.round(data.discountPercentage)}%`}</span>
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
              <span>Thông tin chi tiết</span>
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
              <Button rounded onClick={handleChooseTicket}>
                Đặt lại
              </Button>
            )}
          </div>
        </div>
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
          {type === 'policy' && (
            <div className={cx('policy-wrapper', 'mt-5')}>
              <p className={cx('title')}>Chính sách nhà xe</p>
              <div className={cx('policies')}>
                <span className={cx('policy')}>Không hút thuốc, uống rượu trên xe.</span>
                <span className={cx('policy')}>Không vứt rác trên xe.</span>
                <span className={cx('policy')}>Tổng trọng lượng hành lý không vượt quá 7kg.</span>
              </div>
            </div>
          )}
          {type === 'utility' && <UtilitiesList />}
          {type === 'image' && <ImageList />}
        </div>
      )}
    </div>
  )
}

export default TicketItem
