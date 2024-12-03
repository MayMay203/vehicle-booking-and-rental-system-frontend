import classNames from 'classnames/bind'
import styles from './SlideUtility.module.scss'
import { Button, Col, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Utility from './Utility'

const cx = classNames.bind(styles)
function SlideUtility({ listUtilities, setUpdateUtilitiesOfBus, utilitiesOfBus, isModal = false, enableEdit = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [utilitiesPerPage, setUtilitiesPerPage] = useState(7)
  console.log('utilitiesOfBus slider:', utilitiesOfBus)
  // const [selectedUtilities, setSelectedUtilities] = useState(utilitiesOfBus)
  useEffect(() => {
    const updateUtilitiesPerPage = () => {
      if (isModal) {
        if (window.innerWidth >= 992) {
          setUtilitiesPerPage(5) // Large screens (lg)
        } else if (window.innerWidth >= 768) {
          setUtilitiesPerPage(4) // Medium screens (md)
        } else if (window.innerWidth >= 500) {
          setUtilitiesPerPage(3) // Small screens (sm)
        } else {
          setUtilitiesPerPage(2) // Extra small screens (xs)
        }
      } else {
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
    }
    updateUtilitiesPerPage()
    window.addEventListener('resize', updateUtilitiesPerPage)
    return () => window.removeEventListener('resize', updateUtilitiesPerPage)
  }, [isModal])
  // const [activeUtilities, setActiveUtilities] = useState(Array(listUtilities.length).fill(false))
  const [activeUtilities, setActiveUtilities] = useState(
    listUtilities?.map((utility) => utilitiesOfBus?.includes(utility.id)),
  )
  const [currentPage, setCurrentPage] = useState(0)
  useEffect(() => {
    setActiveUtilities(listUtilities?.map((utility) => utilitiesOfBus?.includes(utility.id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utilitiesOfBus])

  console.log('activeUtilities:---', activeUtilities)
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

  const handleChooseUtility = (id) => {
    const index = listUtilities.findIndex((utility) => utility.id === id) // Find the index based on the id
    const updatedUtilities = [...activeUtilities]
    updatedUtilities[index] = !updatedUtilities[index] // Toggle the state at the correct index
    setActiveUtilities(updatedUtilities)

    const activeUtilityIds = listUtilities
      .filter((utility, index) => updatedUtilities[index]) // Filter based on active state
      .map((utility) => utility.id) // Map to get the IDs of active utilities

    if (setUpdateUtilitiesOfBus) {
      setUpdateUtilitiesOfBus(activeUtilityIds)
    }
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
              id={item.id}
              name={item.name}
              image={item.image}
              active={activeUtilities[displayedUtilities.findIndex((utility) => utility.id === item.id)]}
              handleChooseUtility={enableEdit ? () => handleChooseUtility(item.id) : undefined}
            ></Utility>
          ))}
          {/* Thêm các Col giả nếu danh sách không đủ utilitiesPerPage */}
          {Array.from({ length: utilitiesPerPage - displayedUtilities.length }, (_, index) => (
            <div
              className="utility-placeholder"
              key={`placeholder-${index}`}
              style={{ flex: '1 0 auto', visibility: 'hidden' }}
            ></div>
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
