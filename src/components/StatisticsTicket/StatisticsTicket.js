import classNames from 'classnames/bind'
import styles from './StatisticsTicket.module.scss'
import { Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { DatePicker, Table } from 'antd'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getAllRoutes } from '~/apiServices/busPartner/getAllRoutes'
import dayjs from 'dayjs'
import { fetchStatsBusTrip } from '~/redux/slices/busPartnerSlice'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
const cx = classNames.bind(styles)
function StatisticsTicket() {
  const [routes, setRoutes] = useState([])
  const statisticsByList = [
    { value: 'year', label: 'Theo năm' },
    { value: 'month', label: 'Theo tháng' },
    { value: 'date', label: 'Theo ngày' },
  ]
  const [selectedRoute, setSelectedRoute] = useState('')
  const [statisticsBy, setStatisticsBy] = useState('year')
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedYear, setSelectedYear] = useState(dayjs())
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs())
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs())
  const dispatch = useDispatch()
  const listData = useSelector((state) => state.busPartner.statsBusTrip)
  const [data, setData] = useState([])
  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value)
  }
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
      dispatch(
        fetchStatsBusTrip({
          route: selectedRoute,
          year: selectedYear.format('YYYY'),
          month: selectedMonth.format('MM'),
          startDate: selectedStartDate.format('YYYY-MM-DD'),
          endDate: selectedEndDate.format('YYYY-MM-DD'),
          statsBy: statisticsBy,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      const getRoutes = async () => {
        const response = await getAllRoutes()
        if (response) {
          const formattedRoutes = [
            { value: '', label: 'Chọn tuyến đường' },
            ...response
              .sort((a, b) => a.localeCompare(b))
              .map((route) => ({
                value: route,
                label: route,
              })),
          ]
          setRoutes(formattedRoutes)
        }
      }
      getRoutes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleStats = () => {
    if (dispatch(checkLoginSession())) {
      dispatch(
        fetchStatsBusTrip({
          route: selectedRoute,
          year: selectedYear.format('YYYY'),
          month: selectedMonth.format('MM'),
          startDate: selectedStartDate.format('YYYY-MM-DD'),
          endDate: selectedEndDate.format('YYYY-MM-DD'),
          statsBy: statisticsBy,
        }),
      )
    }
  }

  useEffect(() => {
    setData(listData.map((item, index) => ( {
       key: index,
       route: item.route,
       soldTicket: item.soldTickets,
       cancelTicket: item.cancelledTickets,
     })))
  }, [listData])
 
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tuyến đường',
      dataIndex: 'route',
      align: 'center',
      width: 400,
      showSorterTooltip: {
        target: 'full-header',
      },
      sorter: (a, b) => a.route.localeCompare(b.route),
    },
    {
      title: 'Vé đã bán',
      dataIndex: 'soldTicket',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 200,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Vé đã hủy',
      dataIndex: 'cancelTicket',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 400,
      // sorter: (a, b) => a.age - b.age,
    },
  ]

  return (
    <div className="mt-3 mb-5">
      <Row className={cx('row-cols-5 align-items-start', 'wrap-filter')}>
        <Form.Group className={cx('txt', '')} controlId="formStatistics.ControlInput1">
          <Form.Label className="mb-3">
            Tuyến đường<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            aria-label="route"
            name="route"
            className={cx('txt', 'selectbox', 'infor-item')}
            onChange={handleRouteChange}
          >
            {routes.map((route, index) => (
              <option key={index} value={route.value}>
                {route.label}
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
        {/* <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput44"></Form.Group> */}
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
        <ConfigProvider locale={viVN}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: 'auto', y: 500 }}
            pagination={{ position: ['bottomCenter'], pageSize: 10 }}
            rowClassName="table-row-center"
            showSorterTooltip={{
              target: 'sorter-icon',
            }}
          />
        </ConfigProvider>
      </Row>
    </div>
  )
}
export default StatisticsTicket
