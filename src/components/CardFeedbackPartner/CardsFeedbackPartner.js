import styles from './CardFeedbackPartner.module.scss'
import classNames from 'classnames/bind'
import React from 'react'
import { useState, useEffect } from 'react'
import CardFeedbackPartner from './CardFeedbackPartner'
import PaginationDots from '../PaginationDots'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Button, Row, Col } from 'react-bootstrap'
const cx = classNames.bind(styles)
function CardsFeedbackPartner({ listFeedback}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedbackPerPage, setFeedbackPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(0)
  useEffect(() => {
    const updateFeedbackPerPage = () => {
      if (window.innerWidth < 992) {
        setFeedbackPerPage(1)
      } else if (window.innerWidth < 1400) {
        setFeedbackPerPage(2)
      } else {
        setFeedbackPerPage(3)
      }
    }
    updateFeedbackPerPage()
    window.addEventListener('resize', updateFeedbackPerPage)
    return () => {
      window.removeEventListener('resize', updateFeedbackPerPage)
    }
  }, [])
  const totalPages = Math.ceil(listFeedback.length / feedbackPerPage)

  const displayedFeedback = listFeedback.slice(currentIndex, currentIndex + feedbackPerPage)

  const handleNext = () => {
    if (currentIndex + feedbackPerPage < listFeedback.length) {
      setCurrentIndex(currentIndex + feedbackPerPage)
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevious = () => {
    if (currentIndex - feedbackPerPage >= 0) {
      setCurrentIndex(currentIndex - feedbackPerPage)
      setCurrentPage(currentPage - 1)
    }
  }
  const handlePageChange = (newPage) => {
    const newIndex = newPage * feedbackPerPage
    setCurrentIndex(newIndex)
    setCurrentPage(newPage)
  }
  return (
    <div>
      <div className="row align-items-center justify-content-center">
        <Col xs="1">
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
          <Row className="justify-content-center">
            {displayedFeedback.map((list, index) => (
              <CardFeedbackPartner
                className={cx('feedback')}
                key={index}
                id={list.id}
                name={list.name}
                feedback={list.feedback}
              ></CardFeedbackPartner>
            ))}
          </Row>
        </Col>
        <Col xs="1">
          <Button
            className={cx('nav-button-page')}
            onClick={handleNext}
            disabled={currentIndex + feedbackPerPage >= listFeedback.length}
            variant="none"
          >
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </Button>
        </Col>
      </div>
      <PaginationDots
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></PaginationDots>
    </div>
  )
}
export default CardsFeedbackPartner
