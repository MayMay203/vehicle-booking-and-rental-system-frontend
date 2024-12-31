import classNames from 'classnames/bind'
import styles from './ModalManageBusTicket.module.scss'
import Modal from 'react-bootstrap/Modal'
import { Col, InputGroup, Row, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faCouch, faTicket } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
// import Button from '~/components/Button'
// import AddManyTickets from '~/components/AddManyTickets'
import TableSchedulesOfBus from '~/components/TableSchedulesOfBus'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllBusesByBusType, fetchAllBusTrips, fetchAllBusTypes } from '~/redux/slices/busPartnerSlice'
import { fetchBusTypeByID } from '~/apiServices/busPartner/fetchBusTypeByID'
import { getLocations } from '~/apiServices/getLocations'
import { convertTimeFormat } from '~/utils/convertTimeFormat'
import TicketBus from '~/components/TicketBus'
import { detailBusTrip } from '~/apiServices/busPartner/detailBusTrip'
const cx = classNames.bind(styles)
function ModalManageBusTicket({ enableEdit = true, functionModal, ...props }) {
  const dispatch = useDispatch()
  const listBusTypes = useSelector((state) => state.busPartner.busTypeList)
  const listBusTrips = useSelector((state) => state.busPartner.busTrips)
  const [filteredDestinations, setFilteredDestinations] = useState([])
  const listBusByBusType = useSelector((state) => state.busPartner.busListByBusType)
  const [provincesList, setProvincesList] = useState([])

  const [formData, setFormData] = useState({
    idBusTrip: '',
    departure: '',
    idBusType: '',
    nameType: '',
    licensePlateNumber: '',
    destination: '',
    extendTime: '',
    numberSeat: '',
    typeSeat: '',
    price: '',
  })

  // const [activeUpdate, setActiveUpdate] = useState(false)

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   if (name === 'departure') {
  //     const matches = listBusTrips.filter((trip) => trip.departureLocation === value)
  //     console.log('matches', matches)
  //     setFilteredDestinations(matches)
  //   }
  //   // Khi cả departure và destination đều có giá trị, tìm thời gian hành trình
  //     if (formData.departure && formData.destination) {
  //       const matchingTrip = listBusTrips.find(
  //         (trip) =>
  //           trip.departureLocation === updatedFormData.departure &&
  //           trip.arrivalLocation === updatedFormData.destination,
  //       )
  //       if (matchingTrip) {
  //          setFormData((prevState) => ({
  //     ...prevState,
  //    extendTime: matchingTrip.journeyDuration,
  //   }))}
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }))
  // }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllBusTypes())
      dispatch(fetchAllBusesByBusType(formData.nameType))
      dispatch(fetchAllBusTrips({ dep: '', des: '' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  // useEffect(() => {
  //   if (dispatch(checkLoginSession())) {
  //     dispatch(fetchAllBusTypes())
  //     dispatch(fetchAllBusesByBusType(formData.nameType))
  //     dispatch(fetchAllBusTrips())
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  console.log('listBusTrips---', listBusTrips)
  const fetchInforBusTrip = async (id) => {
    try {
      const response = await detailBusTrip(id)
      console.log('Bus trip response:', response) // Kiểm tra toàn bộ dữ liệu trả về

      const price = response?.dropOffLocationInfos?.find((item) => item.province === formData.destination)?.priceTicket

      setFormData((prevState) => ({
        ...prevState,
        price: price || '', // Cập nhật giá vé nếu tìm thấy
      }))
    } catch (error) {
      console.error('Error fetching bus trip details:', error)
    }
  }

  useEffect(() => {
    if (formData?.idBusTrip) {
      if (dispatch(checkLoginSession())) {
        fetchInforBusTrip(formData?.idBusTrip)
      }
    } else {
      console.log('No Bus Trip ID available')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.idBusTrip])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === 'departure') {
      const matches = listBusTrips.filter((trip) => trip.departureLocation === value)
      const uniqueDestinations = [...new Set(matches.map((trip) => trip.arrivalLocation))]
      console.log('Matches:', matches) // Log các chuyến khởi hành
      console.log('Unique Destinations:', uniqueDestinations) // Log danh sách điểm đến
      setFilteredDestinations(uniqueDestinations)
    }

    // Nếu đủ cả departure và destination, tìm duration
    const updatedFormData = {
      ...formData,
      [name]: value,
    }

    if (updatedFormData.departure && updatedFormData.destination) {
      const matchingTrip = listBusTrips.find(
        (trip) =>
          trip.departureLocation === updatedFormData.departure && trip.arrivalLocation === updatedFormData.destination,
      )

      if (matchingTrip) {
        setFormData((prevState) => ({
          ...prevState,
          extendTime: matchingTrip.journeyDuration,
          idBusTrip: matchingTrip.id,
        }))
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData((prevState) => {
  //     const updatedFormData = {
  //       ...prevState,
  //       [name]: value,
  //     }
  //     // Khi cả departure và destination đều có giá trị, tìm thời gian hành trình
  //     if (updatedFormData.departure && updatedFormData.destination) {
  //       const matchingTrip = listBusTrips.find(
  //         (trip) =>
  //           trip.departureLocation === updatedFormData.departure &&
  //           trip.arrivalLocation === updatedFormData.destination,
  //       )

  //       // Gán extendTime nếu tìm thấy hành trình phù hợp
  //       if (matchingTrip) {
  //         updatedFormData.extendTime = matchingTrip.journeyDuration
  //       } else {
  //         updatedFormData.extendTime = '' // Không tìm thấy
  //       }
  //     }

  //     return updatedFormData
  //   })
  // }

  // console.log('data bên con:', data)
  console.log('formData:', formData)

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
  const getInforBusType = async () => {
    if (dispatch(checkLoginSession())) {
      if (formData.idBusType) {
        try {
          const data = await fetchBusTypeByID(formData.idBusType)
          setFormData({
            ...formData,
            idBusType: data.id,
            nameType: data.name,
            numberSeat: data.numberOfSeat.toString(),
            typeSeat: data.chairType,
          })
        } catch (error) {
          console.log('Lỗi khi lấy thông tin xe:', error)
        }
      }
    }
  }
  useEffect(() => {
    getInforBusType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.idBusType])
  useEffect(() => {
    dispatch(fetchAllBusesByBusType(formData.nameType))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.nameType])

  // const handleCancel = () => {
  //   setFormData({
  //     departure: 'Đà Nẵng',
  //     typeVehicle: 'Limousine34GiuongNam',
  //     licensePlateNumber: '30G-49344',
  //     destination: 'Hà Nội',
  //     extendTime: '2 tiếng',
  //     numberSeat: '34',
  //     typeSeat: 'Giường nằm',
  //   })
  // }
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('txt-title')}>
          {functionModal === 'add' ? 'THÊM LỊCH KHỞI HÀNH' : 'CẬP NHẬT LỊCH KHỞI HÀNH'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('container', 'wrap-container')}>
          <Row className={cx('form-infor-bus-trip', 'justify-content-center')}>
            <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput1">
                <Form.Label className="mb-3">Địa điểm xuất phát</Form.Label>
                <Form.Select
                  value={formData.departure}
                  name="departure"
                  aria-label="departure"
                  className={cx('txt', 'selectbox', 'infor-item')}
                  // readOnly
                  // disabled
                  onChange={handleInputChange}
                >
                  <option key={-1} value={''}>
                    Chọn tỉnh/thành phố
                  </option>
                  {provincesList.map((province, index) => (
                    <option key={index} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput13">
                <Form.Label className="mb-3">Thời gian hành trình</Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Control
                    type="text"
                    value={convertTimeFormat(formData.extendTime)}
                    name="extendTime"
                    aria-label="extend-time"
                    className={cx('txt')}
                    readOnly
                    disabled
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput5">
                <Form.Label className="mb-3">Biển số xe</Form.Label>
                <InputGroup className={cx('txt', 'infor-item')}>
                  <Form.Select
                    value={formData.licensePlateNumber}
                    name="licensePlateNumber"
                    aria-label="licensePlateNumber"
                    className={cx('txt')}
                    readOnly
                    disabled={!enableEdit}
                    onChange={(e) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        licensePlateNumber: e.target.value,
                      }))
                    }}
                  >
                    <option key={-1} value={''}>
                      Chọn biển số xe
                    </option>
                    {listBusByBusType && Object.keys(listBusByBusType).length > 0 ? (
                      Object.entries(listBusByBusType).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))
                    ) : (
                      <option disabled>Không có xe phù hợp-Thêm xe</option>
                    )}
                  </Form.Select>

                  <InputGroup.Text className={cx('txt')}>
                    <FontAwesomeIcon icon={faTicket} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
              {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput11">
                <Form.Label className="mb-3">Địa điểm đến</Form.Label>
                <Form.Select
                  value={formData.destination}
                  name="destination"
                  aria-label="destination"
                  className={cx('txt', 'selectbox', 'infor-item')}
                  // readOnly
                  // disabled
                  onChange={handleInputChange}
                >
                  <option key={-1} value="">
                    Chọn tỉnh/thành phố
                  </option>
                  {filteredDestinations.map((trip, index) => (
                    <option key={index} value={trip.arrivalLocation}>
                      {trip.arrivalLocation} - {trip.journeyDuration}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group> */}
              <Form.Group className={cx('txt', 'mb-5')} controlId="destination">
                <Form.Label className="mb-3">Địa điểm đến</Form.Label>
                <Form.Select
                  value={formData.destination}
                  name="destination"
                  aria-label="destination"
                  className={cx('txt', 'selectbox', 'infor-item')}
                  // readOnly
                  // disabled
                  onChange={handleInputChange}
                  disabled={!filteredDestinations.length}
                >
                  {/* <Form.Select
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  disabled={!filteredDestinations.length} // Disable nếu chưa có danh sách
                > */}
                  <option value="">Chọn địa điểm đến</option>
                  {filteredDestinations.map((destination, index) => (
                    <option key={index} value={destination}>
                      {destination}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput4">
                <Form.Label className="mb-3">Loại phương tiện</Form.Label>
                <Form.Select
                  name="idBusType"
                  aria-label="idBusType"
                  value={formData.idBusType}
                  className={cx('txt', 'selectbox', 'infor-item')}
                  // readOnly
                  // disabled
                  onChange={handleInputChange}
                >
                  <option key="-1" value="">
                    Chọn loại xe
                  </option>
                  {listBusTypes.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row className="d-flex">
                <Col>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput14">
                    <Form.Label className="mb-3">Số ghế</Form.Label>
                    <InputGroup className={cx('txt', 'infor-item')}>
                      <Form.Control
                        type="text"
                        value={formData.numberSeat}
                        name="numberSeat"
                        aria-label="numberSeat"
                        onChange={handleInputChange}
                        className={cx('txt')}
                        disabled
                      />
                      <InputGroup.Text className={cx('txt')}>
                        <FontAwesomeIcon icon={faCouch} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formInfor.ControlInput15">
                    <Form.Label className="mb-3">Loại ghế</Form.Label>
                    <Form.Select
                      name="typeSeat"
                      aria-label="typeSeat"
                      className={cx('txt', 'selectbox', 'infor-item')}
                      value={formData.typeSeat}
                      disabled
                    >
                      <option value={formData.typeSeat}>{formData.typeSeat}</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <AddManyTickets initialItems={[1]}></AddManyTickets> */}
          <div className="align-items-center row">
            <div className="d-flex align-items-center">
              <p className={cx('mb-2', 'me-3', 'txt')}>
                Thêm lịch khởi hành
                <span className="text-danger">*</span>
              </p>
            </div>
            <div className={cx('d-flex')}>
              <TicketBus initialItems={[]} content={''} data={formData}></TicketBus>
            </div>
          </div>
          <p className={cx('txt', 'mb-2', 'mt-4')}>
            Lịch khởi hành của xe:{' '}
            <span className={cx('txt-plate-number')}>
              {Object.entries(listBusByBusType).find(
                ([key, value]) => key === String(formData.licensePlateNumber),
                // )?.[1] || 'Không tìm thấy biển số'}
              )?.[1] || ''}
            </span>
          </p>
          <TableSchedulesOfBus idBus={formData?.licensePlateNumber}></TableSchedulesOfBus>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Row className="justify-content-center mt-4">
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <Button outline className="ms-5 me-5" onClick={handleCancel}>
              Hủy
            </Button>
            <Button primary className="ms-5 me-5" disabled={!activeUpdate}>
              {functionModal === 'add' ? 'Thêm' : 'Cập nhật'}
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Modal.Footer> */}
    </Modal>
  )
}
export default ModalManageBusTicket
