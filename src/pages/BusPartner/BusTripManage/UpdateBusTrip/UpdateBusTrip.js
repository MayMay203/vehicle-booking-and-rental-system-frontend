import classNames from 'classnames/bind'
import styles from './UpdateBusTrip.module.scss'
import Button from '~/components/Button'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import AddManyItems from '~/components/AddManyItems'
import { useEffect, useState } from 'react'
import { getLocations } from '~/apiServices/getLocations'
// import AddManyDropOffLocation from '~/components/AddManyDropOffLocation'
const cx = classNames.bind(styles)
function UpdateBusTrip(props) {
  const handleInputChange = (e) => {
    // const {name, value} = e.target
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }))
    // console.log(formData)
  }
  const initialDepartures = [
    { value: '54 Nguyễn Lương Bằng, Đà Nẵng', id: 1 },
    { value: 'Nguyễn Văn Trỗi, Bình Thạnh, Quảng Bình', id: 2 },
    { value: '300 Lê Thánh Tông, Nghệ An', id: 3 },
    { value: '234 Minh Mạng, Phố Hàng Mã, Hà Nội', id: 4 },
  ]
  // const initialDestination = [
  //   { value: '54 Nguyễn Lương Bằng, Đà Nẵng', id: 0 },
  //   { value: 'Nguyễn Văn Trỗi, Bình Thạnh, Quảng Bình', id: 1 },
  //   { value: '300 Lê Thánh Tông, Nghệ An', id: 2 },
  //   { value: '234 Minh Mạng, Phố Hàng Mã, Hà Nội', id: 3 },
  // ]
  const [provincesList, setProvincesList] = useState([])
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
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={cx('title-modal', 'w-100', 'text-center')}>
          Cập nhật chuyến xe
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
                readOnly
                disabled
              >
                {provincesList.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
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
                readOnly
                disabled
              >
                {provincesList.map((province, index) => (
                  <option key={index} value={province.value}>
                    {province.label}
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
        <AddManyItems initialItems={initialDepartures} content={'Địa điểm đón khách'}></AddManyItems>
        <div className={cx('line')}></div>
        {/* <AddManyDropOffLocation
          initialItems={initialDestination}
          provincesList={provincesList}
          content={'Địa điểm trả khách'}
        ></AddManyDropOffLocation> */}
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
              Cập nhật
            </Button>
          </div>
          <Col></Col>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default UpdateBusTrip
