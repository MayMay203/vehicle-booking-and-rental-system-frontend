import classNames from 'classnames/bind'
import styles from './Voucher.module.scss'
import { images } from '~/assets/images'
import { Col, Row, ProgressBar } from 'react-bootstrap'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { modalNames, setAuthModalVisible } from '~/redux/slices/authModalSlice'
import { toast } from 'react-toastify'
import { claimVoucher } from '~/apiServices/vouchers/claimVoucher'
import { fetchAllVouchersForUser } from '~/redux/slices/voucherSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { generalModalNames, setAddVoucherVisible, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'

const cx = classNames.bind(styles)
const now = 60

function Voucher({ className, data, type, handleApplyVoucher }) {
  const { currentUser, isLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [visibleMenu, setVisibleMenu] = useState(false)

  const hanldeClaimVoucher = async () => {
    if (!type) {
      if (!isLogin) {
        dispatch(setAuthModalVisible({ modalName: modalNames.LOGIN, isVisible: true }))
      } else {
        try {
          await claimVoucher(data.id)
          toast.success('Lấy thành công voucher. Hãy đặt đơn ngay để được nhận ưu đãi', {
            autoClose: 2000,
            position: 'top-center',
          })
          dispatch(fetchAllVouchersForUser())
        } catch (error) {
          toast.error('Bạn đã nhận mã voucher này trước đó.', { autoClose: 2000, position: 'top-center' })
        }
      }
    } else {
      handleApplyVoucher(data.id, data.voucherPercentage, data.maxDiscountValue)
    }
  }

  const handleEdit = () => {
    dispatch(setAddVoucherVisible({ isOpen: true, voucherId: data.id }))
    setVisibleMenu(false)
  }

  const handleDelete = () => {
    if (dispatch(checkLoginSession())) {
      dispatch(
        setConfirmModalVisible({
          modalType: 'confirm',
          isOpen: true,
          title: 'Xác nhận xoá mã khuyến mãi',
          description: 'Bạn chắc chắn muốn xoá mã khuyến mãi này?',
          name: generalModalNames.DEL_VOUCHER,
          id: data.id
        }),
      )
      setVisibleMenu(false)
    }
  }

  console.log(data.id)
  return (
    <div className={cx('wrapper', 'voucher', [className])} style={{ backgroundImage: `url(${images.voucher})` }}>
      <Col xs="3" className={cx('d-flex justify-content-center align-items-center', 'border-right')}>
        <p className={cx('voucher-value')}>{`-${Math.round(data.voucherPercentage)}%`}</p>
      </Col>
      <Col xs="9" className="justify-content-center align-items-center p-3">
        <Row className="justify-content-center align-items-center">
          <Col>
            <div
              className="d-flex justify-content-between"
              style={{ marginLeft: '-4px', marginRight: '-4px', marginBottom: '6px' }}
            >
              <p className={cx('voucher-name', 'flex-1')}>{data.name}</p>
              <Tippy
                offset={[-40, 0]}
                visible={visibleMenu}
                onClickOutside={() => setVisibleMenu(false)}
                interactive
                placement="bottom"
                render={(attrs) => (
                  <div {...attrs}>
                    <PopperWrapper className={cx('custom')}>
                      <button className={cx('voucher-menu')} onClick={handleEdit}>
                        Chỉnh sửa
                      </button>
                      <button className={cx('voucher-menu')} onClick={handleDelete}>
                        Xoá
                      </button>
                    </PopperWrapper>
                  </div>
                )}
              >
                <button
                  style={{ fontSize: '2rem', color: 'var(--primary-color)' }}
                  onClick={() => setVisibleMenu((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </Tippy>
            </div>
          </Col>
          {!currentUser.roles?.includes('ADMIN') && (
            <Col xs="auto">
              {!type ? (
                <Button
                  rounded
                  className={cx('claim_voucher')}
                  onClick={hanldeClaimVoucher}
                  disabled={data.claimStatus === 'CLAIMED'}
                >
                  {data.claimStatus === 'CLAIMED' ? 'Đã lấy mã' : 'Lấy mã'}
                </Button>
              ) : (
                <Button
                  rounded
                  className={cx('claim_voucher')}
                  onClick={hanldeClaimVoucher}
                  disabled={
                    new Date(data.startDate.split('-').reverse().join('-')).setHours(0, 0, 0, 0) >
                    new Date().setHours(0, 0, 0, 0)
                  }
                >
                  Áp dụng
                </Button>
              )}
            </Col>
          )}
        </Row>
        <Row className="justify-content-center ">
          <ProgressBar now={now} label={`${now}%`} visuallyHidden className={cx('custom-progress')} variant="none" />
        </Row>
        {/* <Row>
          <p className={cx('description')}>{data.description}</p>
        </Row> */}
        <Row className={cx('voucher-number', type === 'order' ? 'padding-top-1_5' : 'padding-top-1')}>
          <p>{`Còn lại ${data.remainingQuantity} mã`}</p>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content', type === 'order' ? 'padding-top-1_5' : 'padding-top-1')}>
            <p>Giảm tối đa:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="">{data.maxDiscountValue}</p>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content', type === 'order' ? 'padding-top-1_5' : 'padding-top-1')}>
            <p>Đơn tối thiểu:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="">{data.minOrderValue}</p>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content', type === 'order' ? 'padding-top-1_5' : 'padding-top-1')}>
            <p>Có hiệu lực từ:</p>
          </Col>
          <Col className={cx('time')}>
            <p className="">{`0h00 ${data.startDate}`}</p>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col xs="auto" className={cx('time-content', type === 'order' ? 'padding-top-1_5' : 'padding-top-1')}>
            <p>Hạn sử dụng:</p>
          </Col>
          <Col className={cx('time', type === 'order' ? 'padding-top-1_2' : 'padding-top-1')}>
            <p className="ms-2">{`23h59 ${data.endDate}`}</p>
          </Col>
        </Row>
      </Col>
    </div>
  )
}

export default Voucher
