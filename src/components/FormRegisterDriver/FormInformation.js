import classNames from 'classnames/bind'
import styles from './FormRegisterDriver.module.scss'
import { Alert, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getAllVehicleTypes } from '~/apiServices/user/getAllVehicleTypes'
import { getLocations } from '~/apiServices/getLocations'
const cx = classNames.bind(styles)
function FormInformation({ setActiveNextFormInfor, formInfor, handleChangeFormInfor }) {
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
  const [typeVehicle, setTypeVehicle] = useState([])
  const fetchVehicleTypes = async () => {
    try {
      const response = await getAllVehicleTypes()
      const getVehicleTypes = response?.result
      const vehicleTypes = [
        ...getVehicleTypes.map((vehicleType) => ({
          value: vehicleType.name,
          label: vehicleType.name,
        })),
      ]
      setTypeVehicle(vehicleTypes)
    } catch (error) {
      console.error('Failed to fetch vehicle types:', error)
    }
  }

  useEffect(() => {
    fetchVehicleTypes()
  }, [])

  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/
  const [formData, setFormData] = useState(formInfor)
  const [isCorrectDate, setIsCorrectDate] = useState(regex.test(formData.birthday))
  const [warningMessage, setWarningMessage] = useState('')
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    setActiveNextFormInfor(allFieldsFilled)
    handleChangeFormInfor(formData)
  }, [formData, setActiveNextFormInfor, handleChangeFormInfor])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'birthday') {
      setIsCorrectDate(regex.test(value))
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    if (name === 'phonenumber' && value.length !== 10) {
      setWarningMessage('Số điện thoại phải có đủ 10 chữ số')
    } else {
      setWarningMessage('')
    }
  }
  return (
    <Form className={cx('form-infor')}>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput0">
        <Form.Label>
          Họ và tên<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nguyễn Văn A"
          name="name"
          aria-label="name"
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.name}
        />
      </Form.Group>
      <div className="row">
        <Form.Group className={cx('txt', 'mb-1', 'col-6')} controlId="formInfor.ControlInput1">
          <Form.Label>
            Giới tính<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="gender"
            aria-label="gender"
            className={cx('txt', 'selectbox')}
            onChange={handleInputChange}
            value={formData.gender}
          >
            <option>Chọn giới tính</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
            <option value="ORTHER">Khác</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'mb-1', 'col-6')} controlId="formInfor.ControlInput2">
          <Form.Label>
            Ngày sinh<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="dd-mm-yyyy"
            name="birthday"
            aria-label="birthday"
            className={cx('txt', 'm-0')}
            onChange={handleInputChange}
            value={formData.birthday}
          />
          {!isCorrectDate && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
        </Form.Group>
      </div>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput3">
        <Form.Label>
          Số điện thoại<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="xxxxxxxx55"
          name="phonenumber"
          aria-label="phonenumber"
          className={cx('txt', 'mb-0')}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10) // Giới hạn số ký tự nhập vào 10 số
            }
          }}
          onChange={handleInputChange}
          value={formData.phonenumber}
        />
        {warningMessage && (
          <Alert variant="danger" className={cx('warn')}>
            {warningMessage}
          </Alert>
        )}
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput4">
        <Form.Label>
          Địa chỉ email<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="gmail"
          placeholder="pbl06@gmail.com"
          name="gmail"
          aria-label="gmail"
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.gmail}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput5">
        <Form.Label>
          Khu vực<span className="text-danger">*</span>
        </Form.Label>
        <Form.Select
          name="location"
          aria-label="location"
          className={cx('txt', 'selectbox')}
          size={5}
          onChange={handleInputChange}
          value={formData.location}
        >
          <option value={''} className={cx('txt-light-color')}>
            Chọn tỉnh/thành phố
          </option>
          {provincesList.map((province, index) => (
            <option key={index} value={province.name}>
              {province.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="row">
        <Form.Group className={cx('txt', 'mb-3', 'col-6')} controlId="formInfor.ControlInput6">
          <Form.Label>
            Loại xe<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="vehicleType"
            aria-label="type-vehicle"
            className={cx('txt', 'selectbox')}
            onChange={handleInputChange}
            value={formData.vehicleType}
          >
            <option value={''} className={cx('txt-light-color')}>
              Chọn loại xe
            </option>
            {typeVehicle.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'mb-3', 'col-6')} controlId="formInfor.ControlInput7">
          <Form.Label>
            Biển số xe<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="92H-63 3647"
            name="licensePlate"
            aria-label="license-plate"
            className={cx('txt')}
            onChange={handleInputChange}
            value={formData.licensePlate}
          />
        </Form.Group>
      </div>
    </Form>
  )
}
export default FormInformation
