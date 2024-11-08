import classNames from 'classnames/bind'
import styles from './SlideUtility.module.scss'
import { Button, Col, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Utility from './Utility'

const cx = classNames.bind(styles)
function SlideUtility({ listUtilities }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [utilitiesPerPage, setUtilitiesPerPage] = useState(8);

  useEffect(() => {
    const updateUtilitiesPerPage = () => {
      if (window.innerWidth >= 992) {
        setUtilitiesPerPage(7) // Large screens (lg)
      } else if (window.innerWidth >= 768) {
        setUtilitiesPerPage(5) // Medium screens (md)
      } else if (window.innerWidth >= 500) {
        setUtilitiesPerPage(3) // Small screens (sm)
      } else {
        setUtilitiesPerPage(2) // Extra small screens (xs)
      }
    }
    updateUtilitiesPerPage()
    window.addEventListener('resize', updateUtilitiesPerPage)
    return () => window.removeEventListener('resize', updateUtilitiesPerPage)
  }, [])
  const [activeUtilities, setActiveUtilities] = useState(Array(listUtilities.length).fill(false))
  const [currentPage, setCurrentPage] = useState(0)

  // const resetUtilitiesStates = () => {
  //   setActiveUtilities(Array(listUtilities.length).fill(false))
  // }

  const displayedUtilities = listUtilities.slice(currentIndex, currentIndex + utilitiesPerPage)

  const handleNext = () => {
    if (currentIndex + utilitiesPerPage < listUtilities.length) {
      // resetUtilitiesStates()
      setCurrentIndex(currentIndex + utilitiesPerPage)
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevious = () => {
    if (currentIndex - utilitiesPerPage >= 0) {
      // resetUtilitiesStates()
      setCurrentIndex(currentIndex - utilitiesPerPage)
      setCurrentPage(currentPage - 1)
    }
  }

  const handleChooseUtility = (index) => {
    const updatedUtilities = [...activeUtilities]
    updatedUtilities[index] = !updatedUtilities[index]
    setActiveUtilities(updatedUtilities)
  }
  return (
    <Row className="justify-content-center align-items-center pt-3 pb-3">
      <Col xs="1" className="d-flex justify-content-start">
        <Button className={cx('nav-button-page')} onClick={handlePrevious} disabled={currentIndex === 0} variant="none">
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </Button>
      </Col>
      <Col xs="10">
        <div className="d-flex justify-content-start">
          {displayedUtilities.map((item, index) => (
            <Utility
              className=""
              key={index}
              name={item.name}
              icon={item.icon}
              active={activeUtilities[currentIndex + index]} // Trạng thái active được truyền vào
              handleChooseUtility={() => handleChooseUtility(currentIndex + index)}
            ></Utility>
          ))}
        </div>
      </Col>
      <Col xs="1" className="d-flex justify-content-end">
        <Button
          className={cx('nav-button-page')}
          onClick={handleNext}
          disabled={currentIndex + utilitiesPerPage >= listUtilities.length}
          variant="none"
        >
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </Button>
      </Col>
    </Row>
  )
}
export default SlideUtility
