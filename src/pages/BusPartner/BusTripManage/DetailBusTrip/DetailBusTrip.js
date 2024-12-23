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
import ModalUpdateBusSchedule from '../../BusSchedule/ModalUpdateBusSchedule'
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

    // ...initialDestination.reduce((item, index) =>
    //   Array.from({ length: maxDropOffLength }, (_, idx) => ({
    //     key: `dropOff-${index}-${idx}`,
    //     title: idx === 0 ? 'Địa điểm cụ thể' : '',
    //     ...initialDestination.reduce((acc, current) => {
    //       acc[current.province] = current.dropOffLocation[idx] ? current.dropOffLocation[idx].value : ''
    //       return acc
    //     }, {}),
    //   })),
    // ),
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
    // ...(data?.dropOffLocationInfos?.length > 0
    //   ? data.dropOffLocationInfos.reduce((acc, item, index) => {
    //       return acc.concat(
    //         Array.from({ length: maxDropOffLength }, (_, idx) => ({
    //           key: `dropOff-${index}-${idx}`,
    //           title: idx === 0 ? 'Địa điểm cụ thể' : '',
    //           ...data.dropOffLocationInfos.reduce((accInner, current) => {
    //             accInner[current?.province] = current?.dropOffLocations?.[idx] || '' // Kiểm tra giá trị tồn tại
    //             return accInner
    //           }, {}),
    //         })),
    //       )
    //     }, []) // <-- Thêm giá trị khởi tạo []
    //   : ['']),
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
  const [modalUpdateScheduleShow, setModalUpdateScheduleShow] = useState(false)
  const handleUpdateSchedule = () => {
    setModalUpdateScheduleShow(true)
  }
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
            handleUpdateSchedule={handleUpdateSchedule}
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
      <ModalUpdateBusSchedule
        enableEdit={true}
        idBusTrip={idBusTrip}
        data={data}
        functionModal={'update'}
        show={modalUpdateScheduleShow}
        onHide={() => setModalUpdateScheduleShow(false)}
      ></ModalUpdateBusSchedule>
    </div>
  )
}
export default DetailBusTrip
// import classNames from "classnames/bind"
// import styles from './DetailBusTrip.module.scss'
// import { Tab } from "bootstrap/dist/js/bootstrap.min"
// import { Col, Image, InputGroup, Row, Table, Tabs, Form } from "react-bootstrap"
// import RatingContentList from "~/components/RatingContent"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faCalendar,
//   faClock,
//   faClockRotateLeft,
//   faCouch,
//   faTicket,
//   faBottleWater,
//   faFan,
//   faHammer,
//   faMattressPillow,
// } from '@fortawesome/free-solid-svg-icons'
// import { useEffect, useState } from "react"
// import Button from "~/components/Button"
// const cx = classNames.bind(styles)
// function DetailBusTrip(){
//   const listUtilities = [
//     { id: 1, img: faBottleWater, name: 'Nước uống', description: 'Nhà xe có phục vụ nước uống cho hành khách.' },
//     { id: 2, img: faMattressPillow, name: 'Gối nằm', description: 'Trên xe có trang bị gối nằm.' },
//     { id: 3, img: faFan, name: 'Điều hòa', description: 'Trên xe có trang bị điều hòa.' },
//     {
//       id: 4,
//       img: faHammer,
//       name: 'Búa phá kính',
//       description: 'Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp..',
//     },
//   ]
//   const statuses = [
//     { value: 'Đang hoạt động', label: 'Đang hoạt động' },
//     { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
//     { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
//   ]
//   const [formData, setFormData] = useState({
//     departure: 'Đà Nẵng',
//     date: '22/10/2024',
//     price: '340.000',
//     reduce: '20%',
//     typeVehicle: 'Limousine34GiuongNam',
//     licensePlateNumber: '30G-49344',
//     destination: 'Hà Nội',
//     time: '13:00',
//     extendTime: '2 tiếng',
//     numberSeat: '34',
//     emptySeat: '11',
//     status: 'Dừng hoạt động',
//   })
//   const [activeUpdate, setActiveUpdate] = useState(false)
//   const handleInputChange = (e) =>{
//     const {name, value} = e.target
//     setFormData((prevState) => ({
//       ...prevState,
//       [name] : value,
//     }))
//     console.log(formData)
//   }
//   useEffect(() => {
//     const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
//     console.log('Có vô', formData)
//     console.log(allFieldsFilled)
//     setActiveUpdate(allFieldsFilled)
//   }, [formData])
//   const handleCancel = () =>{
//     setFormData({
//       departure: 'Đà Nẵng',
//       date: '22/10/2024',
//       price: '340.000',
//       reduce: '20%',
//       typeVehicle: 'Limousine34GiuongNam',
//       licensePlateNumber: '30G-49344',
//       destination: 'Hà Nội',
//       time: '13:00',
//       extendTime: '2 tiếng',
//       numberSeat: '34',
//       emptySeat: '11',
//       status: 'Dừng hoạt động',
//     })
//   }
//     return (
//       <div className={cx('container mt-5 mb-5', 'wrap-container')}>
//         <Row className={cx('form-infor-bus-trip', 'justify-content-center')}>
//           <p className={cx('title-form')}>Thông tin chuyến xe</p>
//           <div className={cx('line')}></div>
//           <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput1">
//               <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
//               <Form.Select
//                 value={formData.departure}
//                 name="departure"
//                 aria-label="departure"
//                 className={cx('txt', 'selectbox', 'infor-item')}
//                 readOnly
//                 disabled
//               >
//                 <option value="Đà Nẵng">Đà Nẵng</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput2">
//               <Form.Label className="mb-3">Ngày hoạt động</Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   value={formData.date}
//                   name="date"
//                   aria-label="date"
//                   className={cx('txt')}
//                   readOnly
//                   disabled
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faCalendar} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <div className="d-flex">
//               <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput3">
//                 <Form.Label className="mb-3">
//                   Giá vé<span className="text-danger">*</span>
//                 </Form.Label>
//                 <InputGroup className={cx('txt', 'infor-item')}>
//                   <Form.Control
//                     type="text"
//                     value={formData.price}
//                     name="price"
//                     aria-label="price"
//                     className={cx('txt')}
//                     onChange={handleInputChange}
//                   />
//                   <InputGroup.Text className={cx('txt')}>
//                     <FontAwesomeIcon icon={faTicket} />
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>
//               <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput33">
//                 <Form.Label className="mb-3">
//                   Giảm giá<span className="text-danger">*</span>
//                 </Form.Label>
//                 <InputGroup className={cx('txt', 'infor-item')}>
//                   <Form.Control
//                     type="text"
//                     value={formData.reduce}
//                     name="reduce"
//                     aria-label="reduce"
//                     className={cx('txt')}
//                     onChange={handleInputChange}
//                   />
//                   <InputGroup.Text className={cx('txt')}>
//                     <FontAwesomeIcon icon={faTicket} />
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>
//             </div>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput4">
//               <Form.Label className="mb-3">Loại phương tiện</Form.Label>
//               <Form.Select
//                 name="typeVehicle"
//                 aria-label="typeVehicle"
//                 className={cx('txt', 'selectbox', 'infor-item')}
//                 readOnly
//                 disabled
//               >
//                 <option value={formData.typeVehicle}>{formData.typeVehicle}</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput5">
//               <Form.Label className="mb-3">Biển số xe</Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   value={formData.licensePlateNumber}
//                   name="licensePlateNumber"
//                   aria-label="licensePlateNumber"
//                   className={cx('txt')}
//                   readOnly
//                   disabled
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faTicket} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//           </Col>
//           <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
//               <Form.Label className="mb-3">Địa điểm đến</Form.Label>
//               <Form.Select
//                 value={formData.destination}
//                 aria-label="destination"
//                 className={cx('txt', 'selectbox', 'infor-item')}
//                 readOnly
//                 disabled
//               >
//                 <option value="Hà Nội">Hà Nội</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput12">
//               <Form.Label className="mb-3">Giờ khởi hành</Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   value={formData.time}
//                   name="time"
//                   aria-label="time"
//                   className={cx('txt')}
//                   readOnly
//                   disabled
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faClock} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
//               <Form.Label className="mb-3">Thời gian hành trình</Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   value="2 tiếng"
//                   name="extendTime"
//                   aria-label="extend-time"
//                   className={cx('txt')}
//                   readOnly
//                   disabled
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faClockRotateLeft} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <div className="d-flex">
//               <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput14">
//                 <Form.Label className="mb-3">Số ghế</Form.Label>
//                 <InputGroup className={cx('txt', 'infor-item')}>
//                   <Form.Control
//                     type="text"
//                     value={formData.numberSeat}
//                     name="numberSeat"
//                     aria-label="numberSeat"
//                     className={cx('txt')}
//                     readOnly
//                     disabled
//                   />
//                   <InputGroup.Text className={cx('txt')}>
//                     <FontAwesomeIcon icon={faCouch} />
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput15">
//                 <Form.Label className="mb-3">Còn trống</Form.Label>
//                 <InputGroup className={cx('txt', 'infor-item')}>
//                   <Form.Control
//                     type="text"
//                     value={formData.emptySeat}
//                     name="emptySeat"
//                     aria-label="emptySeat"
//                     className={cx('txt')}
//                     readOnly
//                     disabled
//                   />
//                   <InputGroup.Text className={cx('txt')}>
//                     <FontAwesomeIcon icon={faCouch} />
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>
//             </div>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput16">
//               <Form.Label className="mb-3">
//                 Trạng thái hoạt động<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 name="status"
//                 aria-label="status"
//                 className={cx('txt', 'selectbox', 'infor-item')}
//                 value={formData.status}
//                 onChange={handleInputChange}
//               >
//                 {statuses.map((status, index) => (
//                   <option key={index} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>
//         <div className="mb-3 justify-content-center">
//           <Tabs defaultActiveKey="image" id="tab-detail-vehicle" className={cx('justify-content-center')}>
//             <Tab eventKey="image" title="Hình ảnh">
//               <Row className={cx('content-tab', 'justify-content-start')}>
//                 <span className={cx('title')}>Hình ảnh</span>
//                 <Col>
//                   <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
//                 </Col>
//                 <Col>
//                   <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
//                 </Col>
//                 <Col>
//                   <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
//                 </Col>
//                 <Col>
//                   <Image src="/static/media/trip.895c65fc30c4e90c6108.png" rounded className={cx('image-vehicle')} />
//                 </Col>
//               </Row>
//             </Tab>
//             <Tab eventKey="policy" title="Chính sách">
//               <Row className={cx('content-tab')}>
//                 <span className={cx('title')}>Chính sách</span>
//                 <p className={cx('content')}>
//                   - Sử dụng xe đúng mục đích.
//                   <br /> - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
//                   <br /> - Không sử dụng xe thuê để cầm cố, thế chấp.
//                   <br /> - Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
//                   <br /> - Không chở hàng quốc cấm dễ cháy nổ.
//                   <br /> - Không chở hoa quả, thực phẩm nặng mùi trong xe.
//                   <br /> - Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi
//                   phụ thu phí vệ sinh xe.
//                   <br /> - Xe được giới hạn di chuyển ở mức 400km cho 24h, và lần lượt là 250km, 300km, 350 km cho gói
//                   4h, 8h, 12h.
//                   <br /> Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
//                 </p>
//               </Row>
//             </Tab>
//             <Tab eventKey="utility" title="Tiện ích">
//               <Row className={cx('content-tab')}>
//                 <span className={cx('title')}>Tiện ích</span>
//                 <Table striped bordered hover className={cx('table-container')}>
//                   <thead>
//                     <tr>
//                       <th>STT</th>
//                       <th>Tên tiện ích</th>
//                       <th>Mô tả</th>
//                       <th>Hình ảnh</th>
//                     </tr>
//                   </thead>
//                   <tbody className={cx('body-table')}>
//                     {listUtilities.map((utility, index) => (
//                       <tr key={utility.id}>
//                         <td className="align-middle text-center">
//                           <span className={cx('txt', 'text-center')}>{index + 1}</span>
//                         </td>
//                         <td className="align-middle">
//                           <div className={cx('icon-txt')}>
//                             <span className={cx('txt')}>{utility.name}</span>
//                           </div>
//                         </td>
//                         <td className="align-middle">
//                           <div className={cx('icon-txt')}>
//                             <span className={cx('txt')}>{utility.description}</span>
//                           </div>
//                         </td>
//                         <td className="align-items-center text-center">
//                           <FontAwesomeIcon icon={utility.img} className={cx('icon-utility')}></FontAwesomeIcon>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Row>
//             </Tab>
//             <Tab eventKey="rating" title="Đánh giá">
//               <Row className={cx('content-tab')}>
//                 <span className={cx('title')}>Đánh giá</span>
//                 <RatingContentList></RatingContentList>
//               </Row>
//             </Tab>
//           </Tabs>
//         </div>
//         <div className="d-flex justify-content-center ">
//           <div className={cx('line', 'text-center')}></div>
//         </div>
//         <Row className="justify-content-center mt-4">
//           <Col></Col>
//           <Col className="d-flex justify-content-center">
//             <Button outline className="ms-5 me-5" onClick={handleCancel}>
//               Hủy
//             </Button>
//             <Button primary className="ms-5 me-5" disabled={!activeUpdate}>
//               Cập nhật
//             </Button>
//           </Col>
//           <Col></Col>
//         </Row>
//       </div>
//     )
// }
// export default DetailBusTrip
