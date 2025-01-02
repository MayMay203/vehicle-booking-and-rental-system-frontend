import classNames from 'classnames/bind'
import styles from './Voucher.module.scss'
import { Button, Row } from 'react-bootstrap'
import Voucher from '~/components/Voucher'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaginationDots from '~/components/PaginationDots'

const cx = classNames.bind(styles)
function SlideVoucherOrder({ typeVoucher = '', listVoucher, handleApplyVoucher }) {
  const [currentIndex, setCurrentIndex] = useState(0)
const voucherPerPage = 1
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(listVoucher.length / voucherPerPage)

  const displayedVoucher = listVoucher.slice(currentIndex, currentIndex + voucherPerPage)
  const handleNext = () => {
    const nextIndex = currentIndex + voucherPerPage
    if (nextIndex < listVoucher.length) {
      setCurrentIndex(nextIndex)
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentIndex - voucherPerPage
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex)
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handlePageChange = (newPage) => {
    const newIndex = newPage * voucherPerPage
    setCurrentIndex(newIndex)
    setCurrentPage(newPage)
  }

  return (
    // <div>
    <>
      <div className="d-flex justify-content-center">
        <Button className={cx('nav-button-page')} onClick={handlePrevious} disabled={currentIndex === 0} variant="none">
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </Button>
        <Row className="justify-content-center">
          {displayedVoucher.map((voucher, index) => (
            <Voucher
              className={cx('voucher-long', 'ms-4 me-4')}
              key={index}
              data={voucher}
              typeVoucher={typeVoucher}
              type="order"
              handleApplyVoucher={handleApplyVoucher}
            ></Voucher>
          ))}
          {Array.from({ length: voucherPerPage - displayedVoucher.length }, (_, index) => (
            <div
              className="utility-placeholder"
              key={`placeholder-${index}`}
              style={{ flex: '1 0 auto', visibility: 'hidden' }}
            ></div>
          ))}
        </Row>
        <Button
          className={cx('nav-button-page')}
          onClick={handleNext}
          disabled={currentIndex + voucherPerPage >= listVoucher.length}
          variant="none"
        >
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </Button>
      </div>
      <PaginationDots
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        className={cx('pagination-dots')}
      ></PaginationDots>
      {/* // </div> */}
    </>
  )
}
export default SlideVoucherOrder
