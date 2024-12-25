import classNames from 'classnames/bind'
import styles from './Voucher.module.scss'
import { Button, Row } from 'react-bootstrap'
import Voucher from '~/components/Voucher'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaginationDots from '~/components/PaginationDots'

const cx = classNames.bind(styles)
function VoucherSlider({ listVoucher }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const voucherPerPage = 1
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(listVoucher.length / voucherPerPage)

  const displayedVoucher = listVoucher.slice(currentIndex, currentIndex + voucherPerPage)
  console.log('listVoucher:--', listVoucher)
  const handleNext = () => {
    if (currentIndex + voucherPerPage < listVoucher.length) {
      setCurrentIndex(currentIndex + voucherPerPage)
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevious = () => {
    if (currentIndex - voucherPerPage >= 0) {
      setCurrentIndex(currentIndex - voucherPerPage)
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageChange = (newPage) => {
    const newIndex = newPage * voucherPerPage
    setCurrentIndex(newIndex)
    setCurrentPage(newPage)
  }

  return (
    <div>
      <div className="d-flex">
        <Button className={cx('nav-button-page')} onClick={handlePrevious} disabled={currentIndex === 0} variant="none">
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </Button>
        <Row className="justify-content-center">
          {displayedVoucher.map((voucher, index) => (
            <Voucher className={cx('voucher-small')} key={index} data={voucher}></Voucher>
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
        className={cx('pagination-dots-small')}
      ></PaginationDots>
    </div>
  )
}
export default VoucherSlider
