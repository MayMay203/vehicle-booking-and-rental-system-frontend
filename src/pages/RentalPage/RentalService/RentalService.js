import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'
import classNames from 'classnames/bind'
import { Breadcrumb, Row, Col } from 'react-bootstrap'
import styles from './RentalService.module.scss'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSort, faCar, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import { config } from '~/config'
import { useLocation } from 'react-router-dom'
import RentalVehicleCard from '~/components/RentalVehicleCard'
import { getExistFilterVehicleRental } from '~/apiServices/user/getExistFilterVehicleRental'
import { getAllVehicleTypes } from '~/apiServices/user/getAllVehicleTypes'
import { filterRentalService } from '~/apiServices/user/filterRentalService'
import { getLocations } from '~/apiServices/getLocations'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
const cx = classNames.bind(styles)
function RentalService() {
  const location = useLocation()
  const typeService = location.state?.typeService
  const manned = 'manned'
  const self_driving = 'self_driving'

  // const [startTime, setStartTime] = useState(new Date())
  const calculateNearestTime = () => {
    const now = dayjs()
    const minute = now.minute()
    const roundedMinute = Math.ceil(minute / 15) * 15 // Làm tròn lên đến bội của 15
    return now.minute(roundedMinute).second(0) // Đặt phút và giây
  }

  const [startTime, setStartTime] = useState(calculateNearestTime()) // Gán giá trị mặc định
  const [endTime, setEndTime] = useState(calculateNearestTime())
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs())
  // const [activeTypeFilter, setActiveTypeFilter] = useState('all')
  const [activeTypeFilter, setActiveTypeFilter] = useState(['all'])

  const [isVisibleTypeVehicle, setIsVisibleTypeVehicle] = useState(false)
  const [isVisibleArea, setIsVisibleArea] = useState(false)
  const [isVisibleBranch, setIsVisibleBranch] = useState(false)
  const [isVisibleSort, setIsVisibleSort] = useState(false)
  const [selectedTypeVehicle, setSelectedTypeVehicle] = useState({ id: null, title: '' })
  const [selectedArea, setSelectedArea] = useState({ id: null, title: '' })
  const [selectedBranch, setSelectedBranch] = useState({ id: null, title: '' })
  const [filterOptionsType, setFilterOptionsType] = useState([])
  const [filterOptionsBranch, setFilterOptionsBranch] = useState([])
  const [filterOptionsArea, setFilterOptionsArea] = useState([])
  const [listVehicleRentals, setListVehicleRentals] = useState([])
  console.log('initial start startTime', startTime?.format('HH:mm'))
  console.log('initial start date:', startDate?.format('DD-MM-YYYY'))
  console.log('initial end endTime', endTime?.format('HH:mm'))
  console.log('initial end date:', endDate?.format('DD-MM-YYYY'))
  const [startDateTime, setStartDateTime] = useState({
    startDate: startDate?.format('DD-MM-YYYY'),
    startTime: startTime?.format('HH:mm'),
    startDT: startTime?.format('HH:mm') + ' ' + startDate?.format('DD-MM-YYYY'),
    // startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
    // ' ' +
    // (`0${startDate.getDate()}`.slice(-2) + // Ngày có 2 chữ số
    //   '-' +
    //   `0${startDate.getMonth() + 1}`.slice(-2) + // Tháng có 2 chữ số
    //   '-' +
    //   startDate.getFullYear()),
  })
  const [endDateTime, setEndDateTime] = useState({
    endDate: endDate?.format('DD-MM-YYYY'),
    endTime: endTime?.format('HH:mm'),
    endDT: endTime?.format('HH:mm') + ' ' + endDate?.format('DD-MM-YYYY'),
    // endTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
    // ' ' +
    // (`0${endDate.getDate()}`.slice(-2) + // Ngày có 2 chữ số
    //   '-' +
    //   `0${endDate.getMonth() + 1}`.slice(-2) + // Tháng có 2 chữ số
    //   '-' +
    //   endDate.getFullYear()),
  })
  async function fetchAllVehicleRental() {
    // const data = await getVehicleRental(typeService === 'manned' ? '1' : '0', 'available', '-1')
    try {
      const data = await filterRentalService(
        selectedArea.title,
        selectedBranch.title,
        selectedTypeVehicle.title,
        typeService === 'manned' ? '1' : '0',
        startDateTime.startDT,
        endDateTime.endDT,
      )
      if (data) {
        setListVehicleRentals(data)
      }
    } catch (error) {
      console.log('error--', error)
    } finally {
      console.log('listVehicleRentals--', listVehicleRentals)
    }
  }
  useEffect(() => {
    try {
      fetchAllVehicleRental()
    } catch (error) {
      console.log('error--', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea, selectedBranch, selectedTypeVehicle])
  const handleTypeFilterClick = (btnType) => {
    // setActiveTypeFilter(btnType)
    // if (btnType === 'all') {
    //   // Nếu "Tất cả" được nhấn, chỉ bật "all" và tắt tất cả các nút khác
    //   setActiveTypeFilter(['all'])
    // } else {
    // Tắt "all" khi các nút khác được nhấn
    setActiveTypeFilter(
      (prev) =>
        // {
        // const newFilters = prev.includes('all')
        //   ? [btnType] // Tắt "all" và chỉ bật nút vừa nhấn
        //   : //  : prev.includes(btnType)
        //  ? prev.filter((type) => type !== btnType) // Nếu đã bật, tắt nút
        [...prev, btnType], // Nếu chưa bật, thêm vào
      // return newFilters
      // }
    )
    // }
    // setSelectedBranch(0, 'Hãng xe')
    // setSelectedArea(0, 'Khu vực xe')
    // setSelectedTypeVehicle(0, 'Loại xe')
  }
  const handleSelectTypeVehicle = (id, title) => {
    setSelectedTypeVehicle({ id, title })
  }
  const handleSelectArea = (id, title) => {
    setSelectedArea({ id, title })
  }
  const handleSelectBranch = (id, title) => {
    setSelectedBranch({ id, title })
  }
  const handleSearchVehicle = () => {
    if (!startDate || !startTime || !endDate || !endTime) {
      toast.error('Vui lòng không để trống ngày giờ tìm kiếm', { autoClose: 1500, position: 'top-center' })
      return
    } else {
      setEndDateTime((prev) => ({
        endDate: endDate.format('DD-MM-YYYY'),
        endTime: endTime?.format('HH:mm'),
        endDT: endTime?.format('HH:mm') + ' ' + endDate?.format('DD-MM-YYYY'),
      }))
      setStartDateTime((prev) => ({
        startDate: startDate?.format('DD-MM-YYYY'),
        startTime: startTime?.format('HH:mm'),
        startDT: startTime?.format('HH:mm') + ' ' + startDate?.format('DD-MM-YYYY'),
      }))
      const start = dayjs(`${startDate?.format('YYYY-MM-DD')} ${startTime?.format('HH:mm')}`)
      const end = dayjs(`${endDate?.format('YYYY-MM-DD')} ${endTime?.format('HH:mm')}`)

      if (start.isAfter(end)) {
        toast.error('Ngày giờ bắt đầu phải sớm hơn ngày giờ kết thúc.', { autoClose: 1500, position: 'top-center' })
        return // Dừng nếu điều kiện không thỏa mãn
      }
      try {
        fetchAllVehicleRental()
        console.log('fetchAllVehicleRental--')
      } catch (error) {
        console.log('error--', error)
      }
    }
  }

  const [provincesList, setProvincesList] = useState([])
  useEffect(() => {
    async function fetchApi() {
      const provices = await getLocations(1)
      if (provices) {
        const cleanedProvinces = provices
          .map((province) => {
            return {
              ...province,
              name: province.name.replace(/^(Thành phố|Tỉnh)\s+/i, ''),
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name)) // Sắp xếp theo bảng chữ cái
        setProvincesList(cleanedProvinces)
      }
    }
    fetchApi()
  }, [])
  useEffect(() => {
    const fetchFilterOptions = async () => {
      // if (activeTypeFilter === 'brand') {
      const response1 = await getExistFilterVehicleRental('manufacturer')
      setFilterOptionsBranch(response1)
      // } else if (activeTypeFilter === 'area') {
      // const response2 = await getExistFilterVehicleRental('location')
      // setFilterOptionsArea(response2)
      setFilterOptionsArea(provincesList.map((item) => item.name))
      // } else if (activeTypeFilter === 'type') {
      const dataResponse = await getAllVehicleTypes()
      const listVehicleTypes = dataResponse.result
      const response3 = listVehicleTypes.map((item, index) => item.name)
      setFilterOptionsType(response3)
      // }

      // console.log('response ---', response)
    }

    fetchFilterOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provincesList])

  const handleStartTimeChange = (time) => {
    setStartTime(time)
    setStartDateTime((prev) => ({
      ...prev,
      startTime: time?.format('HH:mm'),
      startDT: time?.format('HH:mm') + ' ' + startDate?.format('DD-MM-YYYY'),
    }))
  }
  const handleEndTimeChange = (time) => {
    setEndTime(time)
    setEndDateTime((prev) => ({
      ...prev,
      endTime: time?.format('HH:mm'),
      endDT: time?.format('HH:mm') + ' ' + endDate?.format('DD-MM-YYYY'),
    }))
  }
  const handleStartDateChange = (date) => {
    setStartDate(date)
    setStartDateTime((prev) => ({
      ...prev,
      startDate: date?.format('DD-MM-YYYY'),
      startDT: startTime?.format('HH:mm') + ' ' + date?.format('DD-MM-YYYY'),
    }))
  }
  const handleEndDateChange = (date) => {
    setEndDate(date)
    setEndDateTime((prev) => ({
      ...prev,
      endDate: date?.format('DD-MM-YYYY'),
      endDT: endTime?.format('HH:mm') + ' ' + date?.format('DD-MM-YYYY'),
    }))
  }
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
            {/* <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter.includes('all') })}
              onClick={() => handleTypeFilterClick('all')}
            >
              Tất cả
            </Button> */}
            <Tippy
              visible={isVisibleTypeVehicle}
              interactive
              delay={[50, 400]}
              placement="bottom-end"
              onClickOutside={() => setIsVisibleTypeVehicle(false)}
              render={(attrs) => (
                <div className={cx('filter')} tabIndex="-1" {...attrs}>
                  <PopperWrapper className={cx('wrap-popper')}>
                    <PopperItem
                      key={0}
                      id={1}
                      title={'Tất cả'}
                      checked={selectedTypeVehicle.title === ''}
                      onClick={() => {
                        handleSelectTypeVehicle(1, '')
                        setTimeout(() => setIsVisibleTypeVehicle(false), 250)
                      }}
                    />
                    {Array.isArray(filterOptionsType) &&
                      filterOptionsType.map((item, index) => (
                        <PopperItem
                          key={index}
                          id={index + 2}
                          title={item}
                          checked={selectedTypeVehicle.title === item}
                          onClick={() => {
                            handleSelectTypeVehicle(index + 2, item)
                            setTimeout(() => setIsVisibleTypeVehicle(false), 250)
                          }}
                        />
                      ))}
                  </PopperWrapper>
                </div>
              )}
            >
              <button>
                <Button
                  rounded
                  className={cx('type-filter', {
                    active: activeTypeFilter.includes('type') && selectedTypeVehicle.title !== '',
                  })}
                  onClick={() => {
                    handleTypeFilterClick('type')
                    setIsVisibleTypeVehicle((prev) => !prev)
                  }}
                >
                  <FontAwesomeIcon icon={faCar} className={cx('icon-type-filter')} />
                  {activeTypeFilter.includes('type') && selectedTypeVehicle.title !== ''
                    ? selectedTypeVehicle.title
                    : 'Loại xe'}
                </Button>
              </button>
            </Tippy>

            <Tippy
              visible={isVisibleArea}
              interactive
              delay={[50, 400]}
              placement="bottom-end"
              onClickOutside={() => setIsVisibleArea(false)}
              render={(attrs) => (
                <div className={cx('filter')} tabIndex="-1" {...attrs}>
                  <PopperWrapper className={cx('wrap-popper')}>
                    <PopperItem
                      key={0}
                      id={1}
                      title={'Tất cả'}
                      checked={selectedArea.title === ''}
                      onClick={() => {
                        handleSelectArea(1, '')
                        setTimeout(() => setIsVisibleArea(false), 250)
                      }}
                    />
                    {Array.isArray(filterOptionsArea) &&
                      filterOptionsArea.map((item, index) => (
                        <PopperItem
                          key={index}
                          id={index + 2}
                          title={item}
                          checked={selectedArea.title === item}
                          onClick={() => {
                            handleSelectArea(index + 2, item)
                            setTimeout(() => setIsVisibleArea(false), 250)
                          }}
                        />
                      ))}
                  </PopperWrapper>
                </div>
              )}
            >
              <button>
                <Button
                  rounded
                  className={cx('type-filter', {
                    active: activeTypeFilter.includes('area') && selectedArea.title !== '',
                  })}
                  onClick={() => {
                    handleTypeFilterClick('area')
                    setIsVisibleArea((prev) => !prev)
                  }}
                >
                  <FontAwesomeIcon icon={faLocationDot} className={cx('icon-type-filter')} />
                  {activeTypeFilter.includes('area') && selectedArea.title !== '' ? selectedArea.title : 'Khu vực xe'}
                </Button>
              </button>
            </Tippy>
            <Tippy
              visible={isVisibleBranch}
              interactive
              delay={[50, 400]}
              placement="bottom-end"
              onClickOutside={() => setIsVisibleBranch(false)}
              render={(attrs) => (
                <div className={cx('filter')} tabIndex="-1" {...attrs}>
                  <PopperWrapper className={cx('wrap-popper')}>
                    <PopperItem
                      key={0}
                      id={1}
                      title={'Tất cả'}
                      checked={selectedBranch.title === ''}
                      onClick={() => {
                        handleSelectBranch(1, '')
                        setTimeout(() => setIsVisibleBranch(false), 250)
                      }}
                    />
                    {filterOptionsBranch.map((item, index) => (
                      <PopperItem
                        key={index + 1}
                        id={index + 2}
                        title={item}
                        // checked={selectedBranch.title === item}
                        onClick={() => {
                          handleSelectBranch(index + 2, item)
                          setTimeout(() => setIsVisibleBranch(false), 250)
                        }}
                      />
                    ))}
                  </PopperWrapper>
                </div>
              )}
            >
              <button>
                <Button
                  rounded
                  className={cx('type-filter', {
                    active: activeTypeFilter.includes('brand') && selectedBranch.title !== '',
                  })}
                  onClick={() => {
                    handleTypeFilterClick('brand')
                    setIsVisibleBranch((prev) => !prev)
                  }}
                >
                  <FontAwesomeIcon icon={faCodeBranch} className={cx('icon-type-filter')} />
                  {activeTypeFilter.includes('brand') && selectedBranch.title !== '' ? selectedBranch.title : 'Hãng xe'}
                </Button>
              </button>
            </Tippy>
          </div>
        </Col>
        <Col xs="2" className="d-flex justify-content-end p-2">
          <Tippy
            visible={isVisibleSort}
            interactive
            delay={[50, 400]}
            placement="bottom-end"
            onClickOutside={() => setIsVisibleSort(false)}
            render={(attrs) => (
              <div className={cx('filter')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <PopperItem
                    id="1"
                    title="Mặc định"
                    // onClick={() => {
                    //   setTimeout(() => setIsVisibleSort(false), 250)
                    // }}
                  />
                  <PopperItem
                    id="2"
                    title="Giá tăng dần"
                    // onClick={() => {
                    //   setTimeout(() => setIsVisibleSort(false), 250)
                    // }}
                  />
                  <PopperItem
                    id="3"
                    title="Giá giảm dần"
                    // onClick={() => {
                    //   setTimeout(() => setIsVisibleSort(false), 250)
                    // }}
                  />
                </PopperWrapper>
              </div>
            )}
          >
            <button>
              <Button
                rounded
                className={cx('btn-sort')}
                onClick={() => {
                  setIsVisibleSort((prev) => !prev)
                }}
              >
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
          <span className={cx('text', 'me-3')}>Từ:</span>
          <div className={cx('d-flex justify-content-end align-items-center', 'show-datetime')}>
            {/* <span className={cx('justify-content-center', 'content-clock')}>
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
            /> */}
            <DatePicker
              value={startTime}
              onChange={handleStartTimeChange}
              picker="time" // Enables time selection
              format="HH:mm" // Time format
              minuteStep={15} // 15-minute intervals
              showNow={false} // Hide "Now" button if not needed
              placeholder="Select time"
            />
            {/* <span className={cx('justify-content-center', 'content-calendar')}>
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
            /> */}
            <DatePicker
              onChange={handleStartDateChange}
              // selected={startDate}
              value={startDate}
              format="DD-MM-YYYY"
              className="content-calendar ms-3"
            />
          </div>
        </Col>
        <Col xs="12" md="5" lg="4" xl="3" className={cx('d-flex justify-content-end pl-2 ', 'datetime')}>
          <span className={cx('text', 'me-3')}>Đến:</span>
          <div className={cx('d-flex justify-content-end align-items-center', 'show-datetime')}>
            {/* <span className={cx('justify-content-center', 'content-clock')}>
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
            /> */}
            <DatePicker
              value={endTime}
              onChange={handleEndTimeChange}
              picker="time" // Enables time selection
              format="HH:mm" // Time format
              minuteStep={15} // 15-minute intervals
              showNow={false} // Hide "Now" button if not needed
              placeholder="Select time"
            />

            {/* <span className={cx('justify-content-center', 'content-calendar')}>
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
            /> */}
            <DatePicker
              onChange={handleEndDateChange}
              value={endDate}
              format="DD-MM-YYYY"
              className="content-calendar ms-3"
            />
          </div>
        </Col>
        <Col xs="12" md="2" lg="2" xl="4" className={cx('d-flex justify-content-end p-0', 'btn-search-wrapper')}>
          <Button variant="none" className={cx('', 'btn-search')} onClick={() => handleSearchVehicle()}>
            Tìm xe
          </Button>
        </Col>
      </Row>
      {/* {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : ( */}
      <RentalVehicleCard
        typeService={typeService}
        listVehicleRentals={listVehicleRentals}
        role="user"
        endDate={endDate}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
      />
      {/* )} */}
    </div>
  )
}
export default RentalService
