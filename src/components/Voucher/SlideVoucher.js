import classNames from 'classnames/bind'
import styles from './Voucher.module.scss'
import { Button, Row } from 'react-bootstrap'
import Voucher from '~/components/Voucher'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaginationDots from '~/components/PaginationDots'

const cx = classNames.bind(styles)
function SlideVoucher({ listVoucher, maxPerpage = 3, type, handleApplyVoucher }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [voucherPerPage, setVoucherPerPage] = useState(maxPerpage)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(listVoucher.length / voucherPerPage)

  const displayedVoucher = listVoucher.slice(currentIndex, currentIndex + voucherPerPage)
  useEffect(() => {
    const updateUtilitiesPerPage = () => {
      let newPerPage = 1
      if (window.innerWidth >= 1300) newPerPage = 3
      else if (window.innerWidth >= 968) newPerPage = 2

      if (voucherPerPage !== newPerPage) {
        setVoucherPerPage(newPerPage)
        setCurrentIndex(0)
        setCurrentPage(0)
      }
    }
    updateUtilitiesPerPage()
    window.addEventListener('resize', updateUtilitiesPerPage)
    return () => window.removeEventListener('resize', updateUtilitiesPerPage)
  }, [voucherPerPage])

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
    <div>
      <div className="d-flex justify-content-center">
        <Button className={cx('nav-button-page')} onClick={handlePrevious} disabled={currentIndex === 0} variant="none">
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </Button>
        <Row className="justify-content-center">
          {displayedVoucher.map((voucher, index) => (
            <Voucher
              className={cx('voucher', 'ms-4 me-4')}
              key={index}
              data={voucher}
              type={type}
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
    </div>
  )
}
export default SlideVoucher
