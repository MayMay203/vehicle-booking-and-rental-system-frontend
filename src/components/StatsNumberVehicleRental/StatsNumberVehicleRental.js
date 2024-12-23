import classNames from 'classnames/bind'
import styles from './StatsNumberVehicleRental.module.scss'
import { Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { DatePicker, Table } from 'antd'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllVehicleTypes } from '~/redux/slices/rentalPartnerSlice'
import dayjs from 'dayjs'
import { getLocations } from '~/apiServices/getLocations'
const cx = classNames.bind(styles)
function StatsNumberVehicleRental() {
  const typeVehicles = useSelector((state) => state.rentalPartner.vehicleTypeList)
  const statisticsByList = [
    { value: 'year', label: 'Theo năm' },
    { value: 'month', label: 'Theo tháng' },
    { value: 'date', label: 'Theo ngày' },
  ]
  // const [selectedRoute, setSelectedRoute] = useState('')
  const [statisticsBy, setStatisticsBy] = useState('year')
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedYear, setSelectedYear] = useState(dayjs())
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs())
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs())
  const dispatch = useDispatch()
  // const listData = useSelector((state) => state.busPartner.statsBusTrip)
  // const [data, setData] = useState([])

  const data = [
    {
      key: '1',
      location: 'Hà Nội',
      typeVehicle: 'Xe máy',
      rentaled: '12',
      canceled: '1',
    },
  ]
  const [provincesList, setProvincesList] = useState([])
  // const handleRouteChange = (event) => {
  //   setSelectedRoute(event.target.value)
  // }
  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    console.log('Month changed to:', month)
  }
  const handleYearChange = (year) => {
    setSelectedYear(year)
    console.log('Year changed to:', year)
  }
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date)
    console.log('start date changed to:', date)
  }
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date)
    console.log('End date changed to:', date)
  }
  const handleChangeStatisticsBy = (event) => {
    setStatisticsBy(event.target.value)
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllVehicleTypes())
    }
  }, [dispatch])
  const handleStats = () => {
    if (dispatch(checkLoginSession())) {
      // dispatch(
      //   fetchStatsBusTrip({
      //     route: selectedRoute,
      //     year: selectedYear.format('YYYY'),
      //     month: selectedMonth.format('MM'),
      //     startDate: selectedStartDate.format('YYYY-MM-DD'),
      //     endDate: selectedEndDate.format('YYYY-MM-DD'),
      //     statsBy: statisticsBy,
      //   }),
      // )
    }
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      // const getRoutes = async () => {
      //   const response = await getAllRoutes()
      //   if (response) {
      //     const formattedRoutes = [
      //       { value: '', label: 'Chọn tuyến đường' },
      //       ...response
      //         .sort((a, b) => a.localeCompare(b))
      //         .map((route) => ({
      //           value: route,
      //           label: route,
      //         })),
      //     ]
      //     setRoutes(formattedRoutes)
      //   }
      // }
      // getRoutes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    async function fetchApi() {
      const provices = await getLocations(1)
      if (provices) {
        const cleanedProvinces = provices
          .map((province) => {
            const cleanedName = province.name.replace(/^(Thành phố|Tỉnh)\s+/i, '') // Loại bỏ tiền tố "Thành phố" hoặc "Tỉnh"
            return {
              ...province,
              name: cleanedName === 'Hồ Chí Minh' ? `TP ${cleanedName}` : cleanedName, // Thêm "TP" nếu là Hồ Chí Minh
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name)) // Sắp xếp theo bảng chữ cái
        setProvincesList(cleanedProvinces)
      }
    }
    fetchApi()
  }, [])
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Khu vực',
      dataIndex: 'location',
      align: 'center',
      width: 400,
      showSorterTooltip: {
        target: 'full-header',
      },
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Loại xe',
      dataIndex: 'typeVehicle',
      align: 'center',
      width: 400,
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Số xe cho thuê',
      dataIndex: 'rentaled',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 200,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số xe bị hủy',
      dataIndex: 'canceled',
      align: 'center',
      width: 200,
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ]

  return (
    <div className="mt-3 mb-5">
      <Row className={cx('row-cols-6 align-items-start', 'wrap-filter')}>
        <Form.Group className={cx('txt', '')} controlId="formStatistics.ControlInput1">
          <Form.Label className="mb-3">
            Khu vực<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            aria-label="location"
            name="location"
            className={cx('txt', 'selectbox', 'infor-item')}
            // onChange={handleInputChange}
          >
            <option key={-1}>Tất cả</option>
            {provincesList.map((province, index) => (
              <option key={index} value={province.name}>
                {province.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', '')} controlId="formStatistics.ControlInput1">
          <Form.Label className="mb-3">
            Loại xe<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            aria-label="typeVehicle"
            name="typeVehicle"
            className={cx('txt', 'selectbox', 'infor-item')}
            // onChange={handleInputChange}
          >
            <option key={-1} value={''}>
              Tất cả
            </option>
            {typeVehicles.map((type, index) => (
              <option key={index} value={type.name}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', '')} controlId="formStatistics.ControlInput2">
          <Form.Label className="mb-3">
            Thống kê theo<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            aria-label="statisticsBy"
            name="statisticsBy"
            className={cx('txt', 'selectbox', 'infor-item')}
            onChange={handleChangeStatisticsBy}
          >
            {statisticsByList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {statisticsBy === 'year' && (
          <>
            <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput3">
              <Form.Label className="mb-3">
                Năm<span className={cx('text', 'text-danger')}>*</span>
              </Form.Label>
              <DatePicker
                picker="year"
                onChange={handleYearChange}
                defaultValue={selectedYear}
                format="YYYY"
                className={cx('content-calendar')}
              />
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput44"></Form.Group>
          </>
        )}
        {statisticsBy === 'month' && (
          <>
            <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput4">
              <Form.Label className="mb-3">
                Tháng<span className={cx('text-danger')}>*</span>
              </Form.Label>
              <DatePicker
                picker="month"
                onChange={handleMonthChange}
                defaultValue={selectedMonth}
                format="MM/YYYY"
                className={cx('content-calendar')}
              />
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput44"></Form.Group>
          </>
        )}
        {statisticsBy === 'date' && (
          <>
            <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput5">
              <Form.Label className="mb-3">
                Ngày bắt đầu<span className="text-danger">*</span>
              </Form.Label>

              <DatePicker
                picker="startDate"
                onChange={handleStartDateChange}
                defaultValue={selectedStartDate}
                format="DD-MM-YYYY"
                className={cx('content-calendar')}
              />
            </Form.Group>
            <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput6">
              <Form.Label className="mb-3">
                Ngày kết thúc<span className="text-danger">*</span>
              </Form.Label>

              <DatePicker
                picker="endDate"
                onChange={handleEndDateChange}
                defaultValue={selectedEndDate}
                format="DD-MM-YYYY"
                className={cx('content-calendar')}
              />
            </Form.Group>
          </>
        )}
        <div className={cx('d-flex justify-content-center align-items-end', 'btn-statistics')}>
          <Button primary className={cx('mb-4 mt-2')} onClick={handleStats}>
            Thống kê
          </Button>
        </div>
      </Row>

      <Row>
        <Table
          columns={columns}
          dataSource={data}
          // onChange={onChange}
          bordered
          pagination={false}
          scroll={{ y: 500 }}
          // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
          rowClassName="table-row-center" // Thêm class để căn giữa dọc
          showSorterTooltip={{
            target: 'sorter-icon',
          }}
        />
      </Row>
    </div>
  )
}
export default StatsNumberVehicleRental
