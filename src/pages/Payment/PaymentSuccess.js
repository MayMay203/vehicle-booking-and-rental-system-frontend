// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import classNames from 'classnames/bind'
// import styles from './Payment.module.scss'
// import { faArrowRight, faCalendar, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
// const cx = classNames.bind(styles)
function PaymentSuccess() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh', color: 'var(--primary-color)', fontSize: '2.4rem' }}
    >
      Đặt vé thành công
    </div>
    // <div className="d-flex flex-column row-gap-4">
    //   <div className="d-flex flex-column row-gap-3">
    //     <p className={cx('title')}>Người đi</p>
    //     <div className="row row-cols-1 row-gap-3">
    //       <div className="col">
    //         <div className={cx('input-wrapper')}>
    //           <span>
    //             <FontAwesomeIcon className={cx('icon')} icon={faUser} />
    //           </span>
    //           <div className={cx('info')}>
    //             <label className={cx('label', 'mb-3', 'w-100')}>
    //               Họ và tên <span style={{ color: 'red' }}>*</span>
    //             </label>
    //             <span>Lê Thị Hồng Nhung</span>
    //             <input
    //               // value={fullName}
    //               className={cx('input-text', 'w-100')}
    //               type="text"
    //               required
    //               placeholder="Nhập họ và tên"
    //               // onChange={(e) => setFullName(e.target.value)}
    //               autoComplete="off"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col">
    //         <div className={cx('input-wrapper')}>
    //           <span>
    //             <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
    //           </span>
    //           <div className={cx('info')}>
    //             <label htmlFor="phone" className={cx('label', 'mb-3', 'w-100')}>
    //               Số điện thoại <span style={{ color: 'red' }}>*</span>
    //             </label>
    //             <span>0986564453</span>
    //             <input
    //               id="phone"
    //               className={cx('input-text', 'w-100')}
    //               type="text"
    //               pattern="[0-9]{10}"
    //               required
    //               placeholder="Nhập số điện thoại"
    //               // value={phone}
    //               // onChange={(e) => setPhone(e.target.value)}
    //               autoComplete="off"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="d-flex flex-column row-gap-4">
    //     <p className={cx('title')}>Thời gian mua vé</p>
    //     <div className="d-flex column-gap-3 align-items-center ps-3">
    //       <span>
    //         <FontAwesomeIcon className={cx('icon')} icon={faCalendar} />
    //       </span>
    //       <span>12:00 ngày 12-09-2024</span>
    //     </div>
    //   </div>

    //   <div className="mt-2">
    //     <span className={cx('title')}>Số lượng vé:</span>
    //     <input
    //       className="px-2 ms-3"
    //       style={{ width: '60px' }}
    //       type="number"
    //       //   value={quantity === undefined || quantity === null ? '' : quantity}
    //       min={1}
    //       //   max={ticketDetail.availableSeats}
    //     ></input>
    //   </div>

    //   <div className="d-flex flex-column row-gap-3 mt-2">
    //     <p className={cx('title', 'mb-2')}>
    //       {/* Hành trình: <span className="fw-light">{`Từ ${ticketDetail.startOperationDay || 'Đang cập nhật'}`}</span>{' '} */}
    //     </p>
    //     <div className="d-flex column-gap-5 align-items-center justify-content-center ps-3">
    //       <div className="d-flex flex-column align-items-center row-gap-4">
    //         <span>{/* <FontAwesomeIcon className={cx('icon')} icon={faLocationCrosshairs} /> */}</span>
    //         {/* <span>{`${ticketDetail.departureTime || 'Đang cập nhật'} - ${
    //           ticketDetail.busTripInfo?.departureLocation || 'Đang cập nhật'
    //         }`}</span> */}
    //       </div>
    //       <span>
    //         <FontAwesomeIcon className={cx('icon')} icon={faArrowRight} />
    //       </span>
    //       <div className="d-flex flex-column  align-items-center row-gap-3">
    //         <span>
    //           <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
    //         </span>
    //         {/* <span>{`${ticketDetail.arrivalTime} - ${ticketDetail.busTripInfo?.arrivalLocation}`}</span> */}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-3">
    //     <span className={cx('title')}>Thông tin xe</span>
    //     <div className="px-4 pt-2 pb-0">
    //       <div className="mt-3 d-flex justify-content-between">
    //         <span>Loại xe đặt:</span>
    //         {/* <span className="ms-2">{ticketDetail.busInfo?.busType?.name}</span> */}
    //       </div>
    //       <div className="mt-3 d-flex justify-content-between">
    //         <span>Số lượng ghế:</span>
    //         {/* <span className="ms-2">{ticketDetail.busInfo?.busType?.numberOfSeat}</span> */}
    //       </div>
    //       <div className="mt-3 d-flex justify-content-between">
    //         <span>Loại ghế:</span>
    //         {/* <span className="ms-2">{ticketDetail.busInfo?.busType?.chairType}</span> */}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-3">
    //     <span className={cx('title')}>Chi tiết thanh toán</span>
    //     <div className="p-4">
    //       <div className="d-flex justify-content-between mb-4">
    //         <span>Tiền vé xe:</span>
    //         {/* <span>{ticketDetail.priceTicket}</span> */}
    //       </div>
    //       <div className="d-flex justify-content-between mb-4">
    //         <span>Số lượng:</span>
    //         {/* <span>{quantity}</span> */}
    //       </div>
    //       <div className="d-flex justify-content-between mb-4">
    //         <span>Giảm giá:</span>
    //         {/* <span className={cx('sale-off')}>{`-${Math.round(ticketDetail.discountPercentage || 0)}%`}</span> */}
    //       </div>

    //       <div className={cx('line', 'mb-4')}></div>

    //       <div className={cx('d-flex', 'justify-content-between')}>
    //         <span className="fw-medium">Chi tiết hoá đơn</span>
    //         <span className="fw-bold">Tổng hoá đơn</span>
    //       </div>

    //       <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
    //         <span>Phương thức thanh toán: </span>
    //         <span>Ngân hàng BIDV</span>
    //       </div>

    //       <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
    //         <span>Thời gian thanh toán: </span>
    //         <span>13-09-2024 12:03</span>
    //       </div>

    //       <div className={cx('d-flex', 'justify-content-between', 'mt-4')}>
    //         <span>Thời gian hoàn thành: </span>
    //         <span>15-09-2024 10:30</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default PaymentSuccess
