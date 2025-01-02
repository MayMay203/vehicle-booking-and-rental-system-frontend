import classNames from 'classnames/bind'
import styles from './DetailBusTrip.module.scss'
import { Col, Form, Row } from 'react-bootstrap'
import { Table } from 'antd'
import Button from '~/components/Button'
import SlideDayOfMonth from '~/components/SlideDayOfMonth'
import TableVehiclesOfBusTrip from '~/components/TableVehiclesOfBusTrip'
import ModalManageBusSchedule from '../../BusSchedule/ModalManageBusSchedule'
import { useEffect, useState } from 'react'
// import HolidayCalendar from '~/components/HolidayCalendar'
import { detailBusTrip } from '~/apiServices/busPartner/detailBusTrip'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { convertTimeFormat } from '~/utils/convertTimeFormat'
import { fetchScheduleListByBusTrip } from '~/redux/slices/busPartnerSlice'
import dayjs from 'dayjs'
const cx = classNames.bind(styles)

function DetailBusTrip() {
  const location = useLocation()
  const idBusTrip = location.state?.id
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  const [dateSearch, setDateSearch] = useState('')
  const dataTable = useSelector((state) => state.busPartner.scheduleListByBusTrip)
  // console.log('dataTable bên cha:', dataTable)
  console.log('data?.dropOffLocationInfos?.length---', data?.dropOffLocationInfos?.length)
  const maxDropOffLength =
    data?.dropOffLocationInfos?.length > 0
      ? Math.max(...data.dropOffLocationInfos.map((item) => item.dropOffLocations?.length || 0))
      : 0

  const transformedData = [
    {
      key: 'duration',
      title: 'Thời gian di chuyển',
      ...(data?.dropOffLocationInfos?.length > 0
        ? data.dropOffLocationInfos.reduce((acc, item) => {
            acc[item.province] = convertTimeFormat(item.journeyDuration)
            return acc
          }, {})
        : {}),
    },
    {
      key: 'price',
      title: 'Giá vé',
      ...(data?.dropOffLocationInfos?.length > 0
        ? data?.dropOffLocationInfos.reduce((acc, item) => {
            acc[item.province] = item.priceTicket
            return acc
          }, {})
        : {}),
    },

    ...(data?.dropOffLocationInfos?.length > 0
      ? data.dropOffLocationInfos.reduce((acc, item, index) => {
          const dropOffArray = Array.from({ length: maxDropOffLength }, (_, idx) => ({
            key: `dropOff-${index}-${idx}`,
            title: idx === 0 ? 'Địa điểm cụ thể' : '',
            ...data.dropOffLocationInfos.reduce((accInner, current) => {
              accInner[current.province] = current?.dropOffLocations?.[idx] || ''
              return accInner
            }, {}),
          }))
          return dropOffArray
          // return acc.concat(dropOffArray) // Kết hợp giá trị mới vào accumulator
        }, [])
      : ['']),
 
  ]

  const columns = [
    {
      title: 'Các tỉnh đi qua',
      dataIndex: 'title',
      key: 'title',
      align: 'left',
      width: 200,
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    ...(data?.dropOffLocationInfos?.length > 0
      ? data?.dropOffLocationInfos.map((item) => ({
          title: item.province,
          dataIndex: item.province,
          key: item.province,
          align: 'left',
          width: 400,
        }))
      : []),
  ]
  const fetchInforBusTrip = async (id) => {
    const response = await detailBusTrip(id)
    setData(response)
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      fetchInforBusTrip(idBusTrip)
      dispatch(
        fetchScheduleListByBusTrip({
          date: dayjs(dateSearch, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          idBusTrip: idBusTrip,
        }),
      )
      console.log('dataTable bên cha:', dataTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idBusTrip])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(
        fetchScheduleListByBusTrip({
          date: dayjs(dateSearch, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          idBusTrip: idBusTrip,
        }),
      )
      console.log('dataTable bên cha----:', dataTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSearch])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [modalAddScheduleShow, setModalAddScheduleShow] = useState(false)
  const handleAddSchedule = () => {
    setModalAddScheduleShow(true)
  }
  // const [modalUpdateScheduleShow, setModalUpdateScheduleShow] = useState(false)
  // const handleUpdateSchedule = () => {
  //   setModalUpdateScheduleShow(true)
  // }
  console.log('----ngay thang: cha---', dayjs(dateSearch, 'DD/MM/YYYY').format('YYYY-MM-DD'))
  return (
    <div className="container">
      <div className="mt-4 mb-4">
        <p className={cx('title')}>Thông tin chuyến xe</p>
        <div className={cx('wrap-infor')}>
          <Row>
            <Col>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
                <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
                <Form.Control
                  type="text"
                  aria-label="departureLocation"
                  name="departureLocation"
                  value={data?.busTripInfo?.departureLocation}
                  readOnly
                  className={cx('txt', 'selectbox', 'add-item')}
                >
                  {/* {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))} */}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput2">
                <Form.Label className="mb-3">Địa điểm đến</Form.Label>
                <Form.Control
                  aria-label="arrivalLocation"
                  name="arrivalLocation"
                  value={data?.busTripInfo?.arrivalLocation}
                  readOnly
                  className={cx('txt', 'selectbox', 'add-item')}
                >
                  {/* {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))} */}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
                <Form.Label className="mb-3">Thời gian di chuyển</Form.Label>
                <Form.Control
                  aria-label="journeyDuration"
                  name="journeyDuration"
                  value={convertTimeFormat(data?.busTripInfo?.journeyDuration || 'h:m')}
                  // value={data?.busTripInfo?.journeyDuration }
                  readOnly
                  className={cx('txt', 'selectbox', 'add-item')}
                >
                  {/* {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))} */}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput6">
            <Form.Label className="mb-3">Địa điểm đón khách</Form.Label>
            {data?.pickupLocations?.length > 0 ? (
              data.pickupLocations.map((address, index) => (
                <p key={index} className={cx('txt-address')}>
                  - {address}
                </p>
              ))
            ) : (
              <p>y</p>
            )}
          </Form.Group>
          <Form.Group className={cx('mb-5')} controlId="formAdd.ControlInput6">
            <Form.Label className={cx('txt', 'mb-3')}>Địa điểm trả khách</Form.Label>
            <Table
              columns={columns}
              // dataSource={data}
              dataSource={transformedData}
              onChange={onChange}
              bordered
              pagination={false}
              scroll={{ x: 'max-content', y: 500 }}
              // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
              rowClassName="table-row-center" // Thêm class để căn giữa dọc
              showSorterTooltip={{
                target: 'sorter-icon',
              }}
              className={cx('txt-location')}
            />
          </Form.Group>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <p className={cx('title')}>Lịch khởi hành</p>
        <div className={cx('wrap-infor')}>
          <Button primary onClick={handleAddSchedule}>
            Thêm lịch khởi hành
          </Button>
          <SlideDayOfMonth setDateSearch={setDateSearch}></SlideDayOfMonth>
          <div className="mt-3 mb-3"></div>
          <TableVehiclesOfBusTrip
            date={dateSearch}
            idBusTrip={idBusTrip}
            // handleUpdateSchedule={handleUpdateSchedule}
            dataTable={dataTable}
          ></TableVehiclesOfBusTrip>
        </div>
        {/* <HolidayCalendar /> */}
      </div>
      <ModalManageBusSchedule
        enableEdit={true}
        idBusTrip={idBusTrip}
        data={data}
        functionModal={'add'}
        show={modalAddScheduleShow}
        setShow={setModalAddScheduleShow}
        onHide={() => setModalAddScheduleShow(false)}
      ></ModalManageBusSchedule>
    </div>
  )
}
export default DetailBusTrip

