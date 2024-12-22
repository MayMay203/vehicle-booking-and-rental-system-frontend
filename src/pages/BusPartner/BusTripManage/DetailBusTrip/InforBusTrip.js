import classNames from 'classnames/bind'
import styles from './DetailBusTrip.module.scss'
import { Accordion, Col, Form, Row } from 'react-bootstrap'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
// import HolidayCalendar from '~/components/HolidayCalendar'
import { detailBusTrip } from '~/apiServices/busPartner/detailBusTrip'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { convertTimeFormat } from '~/utils/convertTimeFormat'
const cx = classNames.bind(styles)

function InforBusTrip({ idBusTrip }) {
  const [data, setData] = useState({})
  const dispatch = useDispatch()
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
      if (idBusTrip) {
        fetchInforBusTrip(idBusTrip)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idBusTrip])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <div className="container p-0">
      <div className="mt-4 mb-4">
        <Accordion>
          <Accordion.Item eventKey={1}>
            <Accordion.Header>
              <span className={cx('txt', 'txt-color')}>Chi tiết chuyến xe</span>
              {/* <p className={cx('title')}>Thông tin chuyến xe</p> */}
            </Accordion.Header>
            <Accordion.Body>
              {' '}
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
                    scroll={{ x: 'auto', y: 500 }}
                    // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
                    rowClassName="table-row-center" // Thêm class để căn giữa dọc
                    showSorterTooltip={{
                      target: 'sorter-icon',
                    }}
                    className={cx('txt-location')}
                  />
                </Form.Group>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}
export default InforBusTrip
