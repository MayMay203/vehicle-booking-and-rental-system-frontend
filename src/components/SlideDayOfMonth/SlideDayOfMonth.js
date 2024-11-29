import React, { useState } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import classNames from 'classnames/bind'
import styles from './SlideDayOfMonth.module.scss'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function SlideDayOfMonth() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [currentWeek, setCurrentWeek] = useState(0)

  const getWeeksInMonth = (month) => {
    const firstDayOfMonth = month.startOf('month')
    const lastDayOfMonth = month.endOf('month')
    let currentDay = firstDayOfMonth
    const weeks = []

    while (currentDay <= lastDayOfMonth) {
      const week = []
      for (let i = 0; i < 7; i++) {
        if (currentDay.month() === month.month()) {
          week.push(currentDay)
        } else {
          week.push(null)
        }
        currentDay = currentDay.add(1, 'day')
      }
      weeks.push(week)
    }
    return weeks
  }

  const weeks = getWeeksInMonth(selectedMonth)

  const handleMonthChange = (date) => {
    setSelectedMonth(dayjs(date))
    setCurrentWeek(0)
  }

  const handleWeekChange = (direction) => {
    if (direction === 'prev' && currentWeek > 0) {
      setCurrentWeek(currentWeek - 1)
    } else if (direction === 'next' && currentWeek < weeks.length - 1) {
      setCurrentWeek(currentWeek + 1)
    }
  }

  return (
    <div className={cx('wrap-silde')}>
      <Row className="align-items-center">
        <Col md={3} className={cx('background-red')}>
          <span className={cx('text')}>Tháng:</span>
          <DatePicker
            picker="month"
            onChange={handleMonthChange}
            defaultValue={selectedMonth}
            format="MM/YYYY"
            className={cx('content-calendar')}
          />
        </Col>
        {/* <div style={{ margin: '20px 0' }}>
        Tháng {selectedMonth.format('MM/YYYY')}
      </div> */}
        <Col md={7}>
          <Row className="justify-content-center align-items-center pt-3 pb-3">
            <Col xs="1" className="d-flex justify-content-start">
              <Button
                className={cx('nav-button-page')}
                onClick={() => handleWeekChange('prev')}
                disabled={currentWeek === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
            </Col>
            <Col xs="10">
              <div className={cx('wrap-dates')}>
                {weeks[currentWeek].map((day, index) => (
                  <div key={index} className={cx({ date: day, 'no-date': !day })}>
                    {day ? day.format('DD') : ''}
                  </div>
                ))}
              </div>
            </Col>
            <Col xs="1" className="d-flex justify-content-end">
              <Button
                className={cx('nav-button-page')}
                onClick={() => handleWeekChange('next')}
                disabled={currentWeek === weeks.length - 1}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default SlideDayOfMonth
