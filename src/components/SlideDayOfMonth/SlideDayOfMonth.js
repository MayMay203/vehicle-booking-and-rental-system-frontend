import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import classNames from 'classnames/bind'
import styles from './SlideDayOfMonth.module.scss'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function SlideDayOfMonth({ setDateSearch }) {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [currentWeek, setCurrentWeek] = useState(0)
  const [currentDate, setCurrentDate] = useState(0)
  useEffect(() => {
    const today = new Date()
    if (selectedMonth.isSame(today, 'month')) {
      setCurrentDate(dayjs(today))
      console.log('today:', dayjs(today))
      const weekIndex = weeks.findIndex((week) => week.some((day) => day && day.isSame(today, 'day')))
      if (weekIndex !== -1) {
        setCurrentWeek(weekIndex)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth])
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
    if (!date) {
      console.warn('No date provided')
      return
    }

    const newMonth = dayjs(date).startOf('month') // Lấy ngày 1 của tháng mới
    setSelectedMonth(newMonth) // Cập nhật tháng được chọn
    setCurrentWeek(0) // Đặt tuần hiện tại là tuần đầu tiên
    setCurrentDate(newMonth) // Đặt ngày hiện tại là ngày 1
    console.log('Month changed to:', newMonth) // Log để kiểm tra
    console.log('Current date set to:', newMonth.format('DD/MM/YYYY')) // Kiểm tra ngày 1
  }

  const handleWeekChange = (direction) => {
    if (direction === 'prev' && currentWeek > 0) {
      setCurrentWeek(currentWeek - 1)
    } else if (direction === 'next' && currentWeek < weeks.length - 1) {
      setCurrentWeek(currentWeek + 1)
    }
  }
  const handleChooseDate = (day) => {
    setCurrentDate(day)
    console.log('day:', day)
  }
  useEffect(() => {
    if (currentDate !== 0 && selectedMonth !== 0) {
      setDateSearch(currentDate?.format('DD') + '/' + selectedMonth?.format('MM/YYYY'))
      console.log('----ngay thang:---', currentDate?.format('DD') + '/' + selectedMonth?.format('MM/YYYY'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, selectedMonth])
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
                  <div
                    key={index}
                    className={cx('date', {
                      'no-date': !day,
                      'selected-date': day && currentDate && day.isSame(currentDate, 'day'),
                    })}
                    onClick={() => handleChooseDate(day)}
                  >
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
