import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'
import classNames from 'classnames/bind'
import { Breadcrumb, Row, Col } from 'react-bootstrap'
import styles from './RentalService.module.scss'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSort, faCar, faCodeBranch, faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { config } from '~/config'
import { useLocation } from 'react-router-dom'
import RentalVehicleCard from '~/components/RentalVehicleCard'
import { getVehicleRental } from '~/apiServices/user/getVehicleRental'

const cx = classNames.bind(styles)
function RentalService() {
  const location = useLocation()
  const typeService = location.state?.typeService
  const manned = 'manned'
  const self_driving = 'self_driving'

  const [activeTypeFilter, setActiveTypeFilter] = useState('all')
  const handleTypeFilterClick = (btnType) => {
    setActiveTypeFilter(btnType)
  }
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [listVehicleRentals, setListVehicleRentals] = useState([])
  useEffect(() => {
    async function fetchAllVehicleRental() {
      const data = await getVehicleRental(typeService === 'manned' ? '1' : '0', 'available', '-1')
      if (data) {
        setListVehicleRentals(data)
      }
    }
    fetchAllVehicleRental()
  }, [typeService])

  return (
    <div className={cx('wrapper', 'container')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.renting}>Thuê xe</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.rentalService} active>
          {typeService === self_driving && 'Thuê xe tự lái'}
          {typeService === manned && 'Thuê xe có người lái'}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col xs="10" className="p-2">
          <div className={cx('type-filter-container')}>
            <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter === 'all' })}
              onClick={() => handleTypeFilterClick('all')}
            >
              Tất cả
            </Button>
            <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter === 'type' })}
              onClick={() => handleTypeFilterClick('type')}
            >
              <FontAwesomeIcon icon={faCar} className={cx('icon-type-filter')} />
              Loại xe
            </Button>

            <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter === 'area' })}
              onClick={() => handleTypeFilterClick('area')}
            >
              <FontAwesomeIcon icon={faLocationDot} className={cx('icon-type-filter')} />
              Khu vực xe
            </Button>
            <Button
              rounded
              className={cx('type-filter', 'dropdown', { active: activeTypeFilter === 'brand' })}
              onClick={() => handleTypeFilterClick('brand')}
            >
              <FontAwesomeIcon icon={faCodeBranch} className={cx('icon-type-filter')} />
              Hãng xe
            </Button>
          </div>
        </Col>
        <Col xs="2" className="d-flex justify-content-end p-2">
          <Tippy
            interactive
            delay={[50, 400]}
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx('filter')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <PopperItem id="1" title="Mặc định" />
                  <PopperItem id="2" title="Giá tăng dần" />
                  <PopperItem id="3" title="Giá giảm dần" />
                </PopperWrapper>
              </div>
            )}
          >
            <button>
              <Button rounded className={cx('btn-sort')}>
                <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
                <span className={cx('d-none d-lg-inline')}>Sắp xếp</span>
              </Button>
            </button>
          </Tippy>
        </Col>
      </Row>
      <Row className={cx('datetime-rental')}>
        <Col
          xs="12"
          md="6"
          lg="2"
          xl="2"
          className={cx('txt', 'd-lg-flex justify-content-center align-items-center', 'd-none d-lg-inline')}
        >
          <span>Thời gian thuê</span>
        </Col>
        <Col xs="12" md="5" lg="4" xl="3" className={cx('d-flex justify-content-end pl-2 ', 'datetime')}>
          <span className={cx('text')}>Từ:</span>
          <div className={cx('d-flex justify-content-end align-items-center', 'show-datetime')}>
            <span className={cx('justify-content-center', 'content-clock')}>
              {startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <DatePicker
              selected={startTime}
              onChange={(time) => setStartTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              customInput={<FontAwesomeIcon icon={faClock} className={cx('justify-content-start', 'btn-clock')} />}
            />

            <span className={cx('justify-content-center', 'content-calendar')}>
              {startDate.toLocaleDateString('vi-VN')}
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className={cx('content-calendar')}
              customInput={
                <FontAwesomeIcon icon={faCalendarDays} className={cx('justify-content-end', 'btn-calendar')} />
              }
              calendarClassName={cx('datetime-picker')}
            />
          </div>
        </Col>
        <Col xs="12" md="5" lg="4" xl="3" className={cx('d-flex justify-content-end pl-2 ', 'datetime')}>
          <span className={cx('text')}>Đến:</span>
          <div className={cx('d-flex justify-content-end align-items-center', 'show-datetime')}>
            <span className={cx('justify-content-center', 'content-clock')}>
              {endTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <DatePicker
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              customInput={<FontAwesomeIcon icon={faClock} className={cx('justify-content-start', 'btn-clock')} />}
            />

            <span className={cx('justify-content-center', 'content-calendar')}>
              {endDate.toLocaleDateString('vi-VN')}
            </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className={cx('content-calendar')}
              customInput={
                <FontAwesomeIcon icon={faCalendarDays} className={cx('justify-content-end', 'btn-calendar')} />
              }
            />
          </div>
        </Col>
        <Col xs="12" md="2" lg="2" xl="4" className={cx('d-flex justify-content-end p-0', 'btn-search-wrapper')}>
          <Button variant="none" className={cx('', 'btn-search')}>
            Tìm xe
          </Button>
        </Col>
      </Row>
      <RentalVehicleCard typeService={typeService} listVehicleRentals={listVehicleRentals} role={'user'}></RentalVehicleCard>
    </div>
  )
}
export default RentalService
