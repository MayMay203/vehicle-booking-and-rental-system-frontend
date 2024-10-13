import classNames from 'classnames/bind'
import styles from './AccordionQA.module.scss'
import { Button, Col, Row } from 'react-bootstrap'
import AccordionQA from '~/components/AccordionQA'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PaginationDots from '~/components/PaginationDots'

const cx = classNames.bind(styles)
function AccordionQAList({ questionsAndAnswers }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const questionsPerPage = 5
    const [activeAccordions, setActiveAccordions] = useState(Array(questionsAndAnswers.length).fill(false))
    const [currentPage, setCurrentPage] = useState(0)
    const totalPages = Math.ceil(questionsAndAnswers.length / questionsPerPage)

    const resetAccordionStates = () => {
      setActiveAccordions(Array(questionsAndAnswers.length).fill(false))
    }

    const displayedQuestions = questionsAndAnswers.slice(currentIndex, currentIndex + questionsPerPage)

    const handleNext = () => {
      if (currentIndex + questionsPerPage < questionsAndAnswers.length) {
        resetAccordionStates()
        setCurrentIndex(currentIndex + questionsPerPage)
        setCurrentPage(currentPage + 1)
      }
    }
    const handlePrevious = () => {
      if (currentIndex - questionsPerPage >= 0) {
        resetAccordionStates()
        setCurrentIndex(currentIndex - questionsPerPage)
        setCurrentPage(currentPage - 1)
      }
    }

    const handlePageChange = (newPage) => {
      resetAccordionStates()
      const newIndex = newPage * questionsPerPage
      setCurrentIndex(newIndex)
      setCurrentPage(newPage)
    }

    const toggleAccordion = (index) => {
      const updatedAccordions = [...activeAccordions]
      updatedAccordions[index] = !updatedAccordions[index]
      setActiveAccordions(updatedAccordions)
    }
  return (
    <Row className="justify-content-center align-items-center pt-5 pb-5">
      <p className={cx('title', 'p-5')}>CÂU HỎI THƯỜNG GẶP</p>
      <Col xs="1" className="d-flex justify-content-start">
        <Button className={cx('nav-button-page')} onClick={handlePrevious} disabled={currentIndex === 0} variant="none">
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </Button>
      </Col>
      <Col xs="10">
        <Row className="justify-content-center">
          {displayedQuestions.map((qa, index) => (
            <AccordionQA
              className=""
              key={index}
              question={qa.question}
              answer={qa.answer}
              active={activeAccordions[currentIndex + index]} // Trạng thái active được truyền vào
              toggleAccordion={() => toggleAccordion(currentIndex + index)}
            ></AccordionQA>
          ))}
        </Row>
      </Col>
      <Col xs="1" className="d-flex justify-content-end">
        <Button
          className={cx('nav-button-page')}
          onClick={handleNext}
          disabled={currentIndex + questionsPerPage >= questionsAndAnswers.length}
          variant="none"
        >
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </Button>
      </Col>
      <PaginationDots
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></PaginationDots>
    </Row>
  )
}
export default AccordionQAList
