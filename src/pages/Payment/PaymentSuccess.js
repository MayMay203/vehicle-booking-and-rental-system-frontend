import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './Payment.module.scss'
import { faArrowRight, faLocationCrosshairs, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { images } from '~/assets/images'
import { Result } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDetailTransaction } from '~/apiServices/order/getDetailTransaction'
import { getVehicleRentalByID } from '~/apiServices/user/getVehicleRentalByID'
const cx = classNames.bind(styles)
function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const transactionCode = searchParams.get('transactionCode')
  const orderType = searchParams.get('orderType')
  const [detailData, setDetailData] = useState({})
  const [detailVehicle, setDetailVehicle] = useState({})

  console.log(detailData)

  useEffect(() => {
    async function fetchDetailTransaction() {
      const data = await getDetailTransaction(transactionCode, orderType)
      if (data) {
        setDetailData(data)
      }
    }
    if (transactionCode) {
      fetchDetailTransaction()
    }
  }, [transactionCode, orderType])
  useEffect(() => {
    async function getInforVehicleRental() {
      const data = await getVehicleRentalByID(detailData?.rentalInfo?.carRentalServiceId)
      if (data) {
        setDetailVehicle(data)
      }
    }

    getInforVehicleRental()
  }, [detailData?.rentalInfo?.carRentalServiceId])

  return (
    <>
      {orderType === 'BUS_TRIP_ORDER' && (
        <Result
          status="success"
          title="Đặt vé thành công!"
          extra={[
            <div
              className="mb-5 d-flex flex-column align-items-center justify-content-center"
              style={{ fontSize: '1.4rem' }}
            >
              <div
                className={cx('mt-4', 'd-flex', 'flex-column', 'row-gap-4', 'responsive')}
                style={{
                  width: '500px',
                  border: '1px solid var(--primary-color)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <div className="d-flex flex-column row-gap-4" style={{ padding: '20px' }}>
                  <div
                    className="d-flex row-gap-3 justify-content-between align-items-center"
                    style={{
                      height: '90px',
                      background: 'var(--primary-color)',
                      color: 'white',
                      fontSize: '1.4rem',
                      margin: '-20px -20px 0 -20px',
                    }}
                  >
                    <div>
                      <img
                        src={images.logoBill4}
                        style={{ width: '120px', height: '70px', objectFit: 'cover', marginLeft: '16px' }}
                        alt="logo"
                      ></img>
                    </div>
                    <div className="d-flex flex-column align-items-end row-gap-3 px-4">
                      <div className="d-flex align-items-center">
                        {/* <img
                          src={images.logoImage}
                          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                          alt="logo"
                        ></img> */}
                        <span style={{ color: 'white', fontWeight: '500', fontSize: '1.8rem', marginLeft: '5px' }}>
                          HOÁ ĐƠN ĐẶT VÉ XE
                        </span>
                      </div>
                      <div style={{ height: '1px', width: '200px', background: 'white' }}></div>
                      <p>
                        Đặt lúc: <span style={{ fontSize: '1.4rem' }}>{detailData.orderInfo?.orderDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Thông tin người đi</span>
                    <div className="pt-2 pb-0">
                      <div className="mt-3 d-flex justify-content-between">
                        <div className="d-flex">
                          <span>Họ và tên:</span>
                        </div>
                        <span className="ms-2">{detailData.customerInfo?.name}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Số điện thoại:</span>
                        <span className="ms-2">{detailData.customerInfo?.phoneNumber}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Email nhận thông tin đặt vé:</span>
                        <span className="ms-2">{detailData.customerInfo?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Chi tiết vé</span>
                    {/* <div className="px-4 pt-2 pb-0"> */}
                    <div className="pt-2 pb-0">
                      <div className="mt-3 d-flex justify-content-between">
                        <div className="d-flex">
                          <span className="ms-1">Số lượng:</span>
                        </div>
                        <span className="ms-2">{`${detailData.orderInfo?.numberOfTicket} vé`}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Thời gian bắt đầu:</span>
                        <span className="ms-2">{detailData.tripInfo?.departureDateTime}</span>
                      </div>
                      <div className="mt-3 d-flex flex-column">
                        <span style={{ textAlign: 'left' }}>Tuyến đường:</span>
                        <div className="d-flex column-gap-5 align-items-center justify-content-center mt-5">
                          <div className="d-flex flex-column align-items-center row-gap-4">
                            <span>
                              <FontAwesomeIcon
                                style={{ color: 'red', fontSize: '2.2rem' }}
                                icon={faLocationCrosshairs}
                              />
                            </span>
                            <div className="d-flex flex-column">
                              <span style={{ color: 'red' }}>{detailData.tripInfo?.departureDateTime}</span>
                              <span className="mt-3" style={{ color: 'red', fontWeight: 600, fontSize: '1.6rem' }}>
                                {detailData.tripInfo?.departureLocation}
                              </span>
                            </div>
                          </div>
                          <span>
                            <FontAwesomeIcon icon={faArrowRight} />
                          </span>
                          <div className="d-flex flex-column  align-items-center row-gap-4">
                            <span>
                              <FontAwesomeIcon style={{ color: '#008E28', fontSize: '2.2rem' }} icon={faLocationDot} />
                            </span>
                            <div className="d-flex flex-column">
                              <span style={{ color: '#008E28' }}>{detailData.tripInfo?.arrivalDateTime}</span>
                              <span className="mt-3" style={{ color: '#008E28', fontWeight: 600, fontSize: '1.6rem' }}>
                                {detailData.tripInfo?.arrivalLocation}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Thông tin xe</span>
                    <div className="pt-2 pb-0">
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Nhà xe:</span>
                        <span className="ms-2">{detailData.businessPartnerInfo?.name}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Biển số xe:</span>
                        <span className="ms-2" style={{ fontWeight: 600 }}>
                          {detailData.busInfo?.licensePlate}
                        </span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Loại xe đặt:</span>
                        <span className="ms-2">{detailData.busInfo?.busType.name}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Số lượng ghế:</span>
                        <span className="ms-2" style={{ fontWeight: 600 }}>
                          {detailData.busInfo?.busType.numberOfSeat}
                        </span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Loại ghế:</span>
                        <span className="ms-2">{detailData.busInfo?.busType.chairType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Chi tiết hoá đơn</span>
                    <div className="pt-4">
                      {/* <div className="p-4"> */}
                      <div className="d-flex justify-content-between mb-4">
                        <span>Tiền vé xe:</span>
                        <span style={{ color: '#008E28', fontWeight: 600 }}>
                          {detailData.orderInfo?.pricePerTicket.replace('.', ',')}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Số lượng vé:</span>
                        <span style={{ fontWeight: 600 }}>{detailData.orderInfo?.numberOfTicket}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Giảm giá:</span>
                        <span style={{ color: 'red' }}>{`-${Math.round(
                          detailData.orderInfo?.discountPercentage || 0,
                        )}%`}</span>
                      </div>

                      <div
                        style={{
                          width: '100%',
                          height: '1.5px',
                          backgroundColor: 'var(--primary-color)',
                          borderRadius: '1px',
                          marginBottom: '16px',
                        }}
                      ></div>

                      <div className={cx('d-flex', 'justify-content-between', 'mb-4')}>
                        <span>Tổng tiền đã thanh toán:</span>
                        <span className="fw-bold" style={{ color: 'var(--primary-color)' }}>
                          {detailData.orderInfo?.priceTotal.replace('.', ',')}
                        </span>
                      </div>

                      <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                        <span>Phương thức thanh toán: </span>
                        <span>Qua tài khoản</span>
                      </div>

                      <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                        <span>Thời gian thanh toán: </span>
                        <span style={{ color: '#008E28', fontWeight: 600 }}>{detailData.orderInfo?.orderDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    fontSize: '1.4rem',
                  }}
                  className="p-4 d-flex justify-content-center"
                >
                  <span className="d-block" style={{ width: '80%', lineHeight: '1.3', textAlign: 'center' }}>
                    Cảm ơn bạn đã tin tưởng lựa chọn chúng tôi.<br></br> Safety Travel chúc bạn sẽ có một trải nghiệm
                    tuyệt vời!
                  </span>
                </div>
              </div>
            </div>,
          ]}
        />
      )}
      {orderType === 'VEHICLE_RENTAL_ORDER' && (
        <Result
          status="success"
          title="Thuê xe thành công!"
          extra={[
            <div
              className="mb-5 d-flex flex-column align-items-center justify-content-center"
              style={{ fontSize: '1.4rem' }}
            >
              <div
                className={cx('mt-4', 'd-flex', 'flex-column', 'row-gap-4', 'responsive')}
                style={{
                  width: '500px',
                  border: '1px solid var(--primary-color)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <div className="d-flex flex-column row-gap-4" style={{ padding: '20px' }}>
                  <div
                    className="d-flex row-gap-3 justify-content-between align-items-center"
                    style={{
                      height: '90px',
                      background: 'var(--primary-color)',
                      color: 'white',
                      fontSize: '1.4rem',
                      margin: '-20px -20px 0 -20px',
                    }}
                  >
                    <div>
                      <img
                        src={images.logoBill4}
                        style={{ width: '120px', height: '70px', objectFit: 'cover', marginLeft: '16px' }}
                        alt="logo"
                      ></img>
                    </div>
                    <div className="d-flex flex-column align-items-end row-gap-3 px-4">
                      <div className="d-flex align-items-center">
                        {/* <img
                          src={images.logoImage}
                          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                          alt="logo"
                        ></img> */}
                        <span style={{ color: 'white', fontWeight: '500', fontSize: '1.8rem', marginLeft: '5px' }}>
                          HOÁ ĐƠN THUÊ XE
                        </span>
                      </div>
                      <div style={{ height: '1px', width: '200px', background: 'white' }}></div>
                      <p>
                        Thuê từ: <span style={{ fontSize: '1.4rem' }}>{detailData.rentalInfo?.startRentalTime}</span>
                      </p>
                      <p>Thuê đến: {detailData.rentalInfo?.endRentalTime}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Thông tin người thuê</span>
                    <div className="pt-2 pb-0">
                      <div className="mt-3 d-flex justify-content-between">
                        <div className="d-flex">
                          <span>Họ và tên:</span>
                        </div>
                        <span className="ms-2">{detailData.customerInfo?.name}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Số điện thoại:</span>
                        <span className="ms-2">{detailData.customerInfo?.phoneNumber}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Địa chỉ email:</span>
                        <span className="ms-2">{detailData.customerInfo?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Thông tin xe</span>
                    <div className="pt-2 pb-0">
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Đại lý xe:</span>
                        <span className="ms-2">{detailVehicle?.partnerName}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Người đại diện</span>
                        <span className="ms-2">{detailVehicle?.partnerName}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Số điện thoại người đại diện:</span>
                        <span className="ms-2">{detailVehicle?.partnerPhoneNumber}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Loại dịch vụ:</span>
                        <span className="ms-2">
                          {detailVehicle?.type === 0 ? 'Thuê xe tự lái' : detailVehicle?.type === 1 ? 'Thuê xe có người lái' : ''}
                        </span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Loại xe thuê:</span>
                        <span className="ms-2">{detailVehicle?.vehicle_type}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Hãng xe:</span>
                        <span className="ms-2">{detailVehicle?.manufacturer}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Đời xe:</span>
                        <span className="ms-2">{detailVehicle?.vehicleLife}</span>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <span>Vị trí nhận xe:</span>
                        <span className="ms-2">{detailVehicle?.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={cx('title')}>Chi tiết</span>
                    <div className="pt-4">
                      <div className="d-flex justify-content-between mb-4">
                        <span>Tiền thuê 1 chiếc xe:</span>
                        <span style={{ color: '#008E28', fontWeight: 600 }}>
                          {detailVehicle?.price?.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Số lượng thuê:</span>
                        <span style={{ fontWeight: 600 }}>{detailData.rentalInfo?.numberOfVehicles}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Giảm giá:</span>
                        <span style={{ color: 'red' }}>{`-${Math.round(
                          detailVehicle?.discount_percentage || 0,
                        )}%`}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Giảm giá voucher:</span>
                        {/* <span style={{ color: 'red' }}>{`-${Math.round(
                          detailData.pricingInfo?.voucherPercentage + '%' ||
                            detailData.pricingInfo?.voucherValue.toLocaleString('vi-VN') + 'đ' ||
                            0,
                        )}`}</span> */}
                        <span style={{ color: 'red' }}>{ detailData.pricingInfo?.voucherPercentage + '%' ||
                            detailData.pricingInfo?.voucherValue.toLocaleString('vi-VN') + 'đ' ||
                            0}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Tiền cọc xe:</span>
                        <span style={{ color: '#008E28', fontWeight: 600 }}>
                          {detailData.pricingInfo?.carDeposit.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <span>Tiền giữ chỗ:</span>
                        <span style={{ color: '#008E28', fontWeight: 600 }}>
                          {detailData.pricingInfo?.reservationFee.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '1.5px',
                          backgroundColor: 'var(--primary-color)',
                          borderRadius: '1px',
                          marginBottom: '16px',
                        }}
                      ></div>

                      <div className={cx('d-flex', 'justify-content-between', 'mb-4')}>
                        <span>Tổng tiền đã thanh toán:</span>
                        <span className="fw-bold" style={{ color: 'var(--primary-color)' }}>
                          {detailData.pricingInfo?.priceTotal.toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                        <span>Phương thức thanh toán: </span>
                        <span>Qua tài khoản ngân hàng</span>
                      </div>

                      <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
                        <span>Thời gian thanh toán: </span>
                        <span style={{ color: '#008E28', fontWeight: 600 }}>{detailData?.createAt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    fontSize: '1.4rem',
                  }}
                  className="p-4 d-flex justify-content-center"
                >
                  <span className="d-block" style={{ width: '80%', lineHeight: '1.3', textAlign: 'center' }}>
                    Cảm ơn bạn đã tin tưởng lựa chọn chúng tôi.<br></br> Safety Travel chúc bạn sẽ có một trải nghiệm
                    tuyệt vời!
                  </span>
                </div>
              </div>
            </div>,
          ]}
        />
      )}
    </>
  )
}

export default PaymentSuccess
