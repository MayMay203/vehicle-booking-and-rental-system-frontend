import classNames from 'classnames/bind'
import styles from './AddBusTrip.module.scss'
import Button from '~/components/Button'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import AddManyItems from '~/components/AddManyItems'
import AddManyDropOffLocation from '~/components/AddManyDropOffLocation'
import { getLocations } from '~/apiServices/getLocations'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)
function AddBusTrip(props) {
  const handleInputChange = (e) => {
    // const {name, value} = e.target
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }))
    // console.log(formData)
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
  
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('title-modal', 'w-100', 'text-center')}>
          Thêm chuyến xe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-4">
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
              <Form.Label className="mb-3">
                Địa điểm xuất phát<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="departure"
                name="departure"
                // value={formData.departure}
                onChange={handleInputChange}
                className={cx('txt', 'selectbox', 'add-item')}
              >
                {provincesList.map((province, index) => (
                  <option key={index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput2">
              <Form.Label className="mb-3">
                Địa điểm đến<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="destination"
                name="destination"
                // value={formData.departure}
                onChange={handleInputChange}
                className={cx('txt', 'selectbox', 'add-item')}
              >
                {provincesList.map((province, index) => (
                  <option key={index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
              <Form.Label className="mb-3">
                Thời gian di chuyển<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                aria-label="duration"
                name="duration"
                // value={formData.departure}
                onChange={handleInputChange}
                className={cx('txt', 'selectbox', 'add-item')}
                readOnly
                disabled
              >
                {/* {provinces.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
                  </option>
                ))} */}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
          <Form.Label className="mb-3">
            Địa điểm đón khách<span className="text-danger">*</span>
          </Form.Label>
          <AddManyItems initialItems={initialDepartures}></AddManyItems>
        </Form.Group> */}
        <AddManyItems
          initialItems={[1]}
          content={'Địa điểm đón khách'}
        ></AddManyItems>
        <div className={cx('line')}></div>
        {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
          <Form.Label className="mb-3">
            Địa điểm trả khách<span className="text-danger">*</span>
          </Form.Label> */}
        <AddManyDropOffLocation
          provincesList={provincesList}
          initialItems={[1]}
        ></AddManyDropOffLocation>
        {/* </Form.Group> */}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <Col></Col>
          <div className="col d-flex justify-content-center">
            <Button outline className={cx('btn')}>
              Hủy
            </Button>
          </div>
          <div className="col d-flex justify-content-center">
            <Button primary outline className={cx('btn')}>
              Thêm
            </Button>
          </div>
          <Col></Col>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default AddBusTrip
// import { Col, InputGroup, Row, Form } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faCalendar,
//   faClock,
//   faClockRotateLeft,
//   faCouch,
//   faTicket,
// } from '@fortawesome/free-solid-svg-icons'
// import Button from "~/components/Button"
// import { useEffect, useState } from "react"
// const cx = classNames.bind(styles)
// function AddBusTrip(){
//     const provinces = [
//       { value: '', label: 'Chọn tỉnh/thành phố' },
//       { value: 'An Giang', label: 'An Giang' },
//       { value: 'Bà Rịa - Vũng Tàu', label: 'Bà Rịa - Vũng Tàu' },
//       { value: 'Bắc Giang', label: 'Bắc Giang' },
//       { value: 'Bắc Kạn', label: 'Bắc Kạn' },
//       { value: 'Bạc Liêu', label: 'Bạc Liêu' },
//       { value: 'Bắc Ninh', label: 'Bắc Ninh' },
//       { value: 'Bến Tre', label: 'Bến Tre' },
//       { value: 'Bình Định', label: 'Bình Định' },
//       { value: 'Bình Dương', label: 'Bình Dương' },
//       { value: 'Bình Phước', label: 'Bình Phước' },
//       { value: 'Bình Thuận', label: 'Bình Thuận' },
//       { value: 'Cà Mau', label: 'Cà Mau' },
//       { value: 'Cần Thơ', label: 'Cần Thơ' },
//       { value: 'Cao Bằng', label: 'Cao Bằng' },
//       { value: 'Đà Nẵng', label: 'Đà Nẵng' },
//       { value: 'Đắk Lắk', label: 'Đắk Lắk' },
//       { value: 'Đắk Nông', label: 'Đắk Nông' },
//       { value: 'Điện Biên', label: 'Điện Biên' },
//       { value: 'Đồng Nai', label: 'Đồng Nai' },
//       { value: 'Đồng Tháp', label: 'Đồng Tháp' },
//       { value: 'Gia Lai', label: 'Gia Lai' },
//       { value: 'Hà Giang', label: 'Hà Giang' },
//       { value: 'Hà Nam', label: 'Hà Nam' },
//       { value: 'Hà Nội', label: 'Hà Nội' },
//       { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
//       { value: 'Hải Dương', label: 'Hải Dương' },
//       { value: 'Hải Phòng', label: 'Hải Phòng' },
//       { value: 'Hậu Giang', label: 'Hậu Giang' },
//       { value: 'Hòa Bình', label: 'Hòa Bình' },
//       { value: 'Hưng Yên', label: 'Hưng Yên' },
//       { value: 'Khánh Hòa', label: 'Khánh Hòa' },
//       { value: 'Kiên Giang', label: 'Kiên Giang' },
//       { value: 'Kon Tum', label: 'Kon Tum' },
//       { value: 'Lai Châu', label: 'Lai Châu' },
//       { value: 'Lâm Đồng', label: 'Lâm Đồng' },
//       { value: 'Lạng Sơn', label: 'Lạng Sơn' },
//       { value: 'Lào Cai', label: 'Lào Cai' },
//       { value: 'Long An', label: 'Long An' },
//       { value: 'Nam Định', label: 'Nam Định' },
//       { value: 'Nghệ An', label: 'Nghệ An' },
//       { value: 'Ninh Bình', label: 'Ninh Bình' },
//       { value: 'Ninh Thuận', label: 'Ninh Thuận' },
//       { value: 'Phú Thọ', label: 'Phú Thọ' },
//       { value: 'Phú Yên', label: 'Phú Yên' },
//       { value: 'Quảng Bình', label: 'Quảng Bình' },
//       { value: 'Quảng Nam', label: 'Quảng Nam' },
//       { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
//       { value: 'Quảng Ninh', label: 'Quảng Ninh' },
//       { value: 'Quảng Trị', label: 'Quảng Trị' },
//       { value: 'Sóc Trăng', label: 'Sóc Trăng' },
//       { value: 'Sơn La', label: 'Sơn La' },
//       { value: 'Tây Ninh', label: 'Tây Ninh' },
//       { value: 'Thái Bình', label: 'Thái Bình' },
//       { value: 'Thái Nguyên', label: 'Thái Nguyên' },
//       { value: 'Thanh Hóa', label: 'Thanh Hóa' },
//       { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
//       { value: 'Tiền Giang', label: 'Tiền Giang' },
//       { value: 'TP Hồ Chí Minh', label: 'TP Hồ Chí Minh' },
//       { value: 'Trà Vinh', label: 'Trà Vinh' },
//       { value: 'Tuyên Quang', label: 'Tuyên Quang' },
//       { value: 'Vĩnh Long', label: 'Vĩnh Long' },
//       { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
//       { value: 'Yên Bái', label: 'Yên Bái' },
//     ]
//     const typeVehicles = [
//       { value: '', label: 'Chọn loại phương tiện' },
//       { value: 'Limousine34GiuongNam', label: 'Limousine34GiuongNam' },
//     ]
//     const statuses = [
//       { value: '', label: 'Chọn trạng thái' },
//       { value: 'Đang hoạt động', label: 'Đang hoạt động' },
//       { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
//       { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
//     ]
//     const licensePlateNumbers = [
//       { value: '', label: 'Chọn biển số xe' },
//       { value: '30G-49344', label: '30G-49344' },
//     ]
//     const [activeAdd, setActiveAdd] = useState(false)
//     const [formData, setFormData] = useState({
//       departure: '',
//       date: '',
//       licensePlateNumber: '',
//       // typeVehicle: '',
//       price: '',
//       reduce: '',
//       destination: '',
//       time: '',
//       extendTime: '',
//       status: '',
//       // numberSeat: '',
//     })
//     useEffect(() => {
//       const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
//       setActiveAdd(allFieldsFilled)
//       console.log('Có vô', formData)
//       console.log(allFieldsFilled)
//     }, [formData])
//     const handleInputChange = (e) => {
//       const {name, value} = e.target
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }))
//       console.log(formData)
//     }
//     const handleCancel = () => {
//       setFormData({
//         departure: '',
//         date: '',
//         licensePlateNumber: '',
//         // typeVehicle: '',
//         price: '',
//         reduce: '',
//         destination: '',
//         time: '',
//         extendTime: '',
//         status: '',
//         // numberSeat: '',
//       })
//     }
//     const handleAdd = () => {

//     }
//     return (
//       <div className={cx('container mt-5 mb-5', 'wrap-container')}>
//         <Row className={cx('form-add-bus-trip', 'justify-content-center')}>
//           <p className={cx('title-form')}>Thêm chuyến xe</p>
//           <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
//               <Form.Label className="mb-3">
//                 Địa điểm xuất phát<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 aria-label="departure"
//                 name="departure"
//                 value={formData.departure}
//                 onChange={handleInputChange}
//                 className={cx('txt', 'selectbox', 'add-item')}
//               >
//                 {provinces.map((province, index) => (
//                   <option key={index} value={province.value}>
//                     {province.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput2">
//               <Form.Label className="mb-3">
//                 Ngày hoạt động<span className="text-danger">*</span>
//               </Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   placeholder="dd/mm/yyyy"
//                   name="date"
//                   aria-label="date"
//                   value={formData.date}
//                   className={cx('txt')}
//                   onChange={handleInputChange}
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faCalendar} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
//                   <Form.Label className="mb-3">
//                     Giá vé <span className="text-danger">*</span>
//                   </Form.Label>
//                   <InputGroup className={cx('txt', 'infor-item')}>
//                     <Form.Control
//                       type="text"
//                       placeholder="0 vnđ"
//                       name="price"
//                       aria-label="price"
//                       value={formData.price}
//                       className={cx('txt')}
//                       onChange={handleInputChange}
//                     />
//                     <InputGroup.Text className={cx('txt')}>
//                       <FontAwesomeIcon icon={faTicket} />
//                     </InputGroup.Text>
//                   </InputGroup>
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput33">
//                   <Form.Label className="mb-3">Giảm giá</Form.Label>
//                   <InputGroup className={cx('txt', 'infor-item')}>
//                     <Form.Control
//                       type="text"
//                       placeholder="0%"
//                       name="reduce"
//                       aria-label="reduce"
//                       value={formData.reduce}
//                       className={cx('txt')}
//                       onChange={handleInputChange}
//                     />
//                     <InputGroup.Text className={cx('txt')}>
//                       <FontAwesomeIcon icon={faTicket} />
//                     </InputGroup.Text>
//                   </InputGroup>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput5">
//               <Form.Label className="mb-3">
//                 Biển số xe <span className="text-danger">*</span>
//               </Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Select
//                   aria-label="licensePlateNumber"
//                   name="licensePlateNumber"
//                   className={cx('txt', 'selectbox', 'infor-item')}
//                   onChange={handleInputChange}
//                   value={formData.licensePlateNumber}
//                 >
//                   {licensePlateNumbers.map((licensePlateNumber, index) => (
//                     <option key={index} value={licensePlateNumber.value}>
//                       {licensePlateNumber.label}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faTicket} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput4">
//               <Form.Label className="mb-3">
//                 Loại phương tiện<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 aria-label="typeVehicle"
//                 name="typeVehicle"
//                 className={cx('txt', 'selectbox', 'infor-item')}
//                 disabled
//                 onChange={handleInputChange}
//                 // value={formData.typeVehicle}
//               >
//                 {typeVehicles.map((typeVehicle, index) => (
//                   <option key={index} value={typeVehicle.value}>
//                     {typeVehicle.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col className={cx('col-sm-12 col-md-6', 'col-form')}>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput11">
//               <Form.Label className="mb-3">
//                 Địa điểm đến<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 aria-label="destination"
//                 name="destination"
//                 value={formData.destination}
//                 onChange={handleInputChange}
//                 className={cx('txt', 'selectbox', 'infor-item')}
//               >
//                 {provinces.map((province, index) => (
//                   <option key={index} value={province.value}>
//                     {province.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput12">
//               <Form.Label className="mb-3">
//                 Giờ khởi hành<span className="text-danger">*</span>
//               </Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   placeholder="hh:mm"
//                   name="time"
//                   aria-label="time"
//                   value={formData.time}
//                   className={cx('txt')}
//                   onChange={handleInputChange}
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faClock} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput13">
//               <Form.Label className="mb-3">
//                 Thời gian hành trình<span className="text-danger">*</span>
//               </Form.Label>
//               <InputGroup className={cx('txt', 'infor-item')}>
//                 <Form.Control
//                   type="text"
//                   placeholder="0 tiếng"
//                   name="extendTime"
//                   aria-label="extendTime"
//                   value={formData.extendTime}
//                   className={cx('txt')}
//                   onChange={handleInputChange}
//                 />
//                 <InputGroup.Text className={cx('txt')}>
//                   <FontAwesomeIcon icon={faClockRotateLeft} />
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>
//             <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput16">
//               <Form.Label className="mb-3">
//                 Trạng thái hoạt động<span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 aria-label="status"
//                 name="status"
//                 value={formData.status}
//                 className={cx('txt', 'selectbox', 'infor-item')}
//                 onChange={handleInputChange}
//               >
//                 {statuses.map((status, index) => (
//                   <option key={index} value={status.value}>
//                     {status.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput14">
//                   <Form.Label className="mb-3">
//                     Số ghế <span className="text-danger">*</span>
//                   </Form.Label>
//                   <InputGroup className={cx('txt', 'infor-item')}>
//                     <Form.Control
//                       type="text"
//                       placeholder="0"
//                       name="numberSeat"
//                       // value={formData.numberSeat}
//                       aria-label="numberSeat"
//                       className={cx('txt')}
//                       disabled
//                       onChange={handleInputChange}
//                     />
//                     <InputGroup.Text className={cx('txt')}>
//                       <FontAwesomeIcon icon={faCouch} />
//                     </InputGroup.Text>
//                   </InputGroup>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//         <Row className="justify-content-center mt-4">
//           <Col></Col>
//           <Col className="d-flex justify-content-center">
//             <Button outline className={cx('ms-5 me-5', 'btn')} onClick={handleCancel}>
//               Hủy
//             </Button>
//             <Button primary className={cx('ms-5 me-5', 'btn')} disabled={!activeAdd} onClick={handleAdd}>
//               Thêm
//             </Button>
//           </Col>
//           <Col></Col>
//         </Row>
//       </div>
//     )
// }
// export default AddBusTrip
