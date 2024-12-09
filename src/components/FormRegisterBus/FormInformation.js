import classNames from 'classnames/bind'
import styles from './FormRegisterBus.module.scss'
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getLocations } from '~/apiServices/getLocations'
const cx = classNames.bind(styles)
function FormInformation({ setActiveNextFormInfor, formInfor, handleFormInforChange }) {
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
  const [formData, setFormData] = useState(formInfor)
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '')
    setActiveNextFormInfor(allFieldsFilled)
    handleFormInforChange(formData)
  }, [formData, setActiveNextFormInfor, handleFormInforChange])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <Form className={cx('form-infor')}>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput0">
        <Form.Label>
          Tên nhà xe<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên nhà xe"
          name="nameBusiness"
          aria-label="name-business"
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.nameBusiness}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput1">
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
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput2">
        <Form.Label>
          Số điện thoại<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="0842059055"
          name="phonenumber"
          aria-label="phonenumber"
          className={cx('txt')}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '') // Loại bỏ ký tự không phải là số
            if (e.target.value.length > 10) {
              e.target.value = e.target.value.slice(0, 10) // Giới hạn số ký tự nhập vào 10 số
            }
          }}
          onChange={handleInputChange}
          value={formData.phonenumber}
        />
      </Form.Group>
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput3">
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
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput4">
        <Form.Label>
          Khu vực<span className="text-danger">*</span>
        </Form.Label>
        <Form.Select
          name="location"
          aria-label="location"
          className={cx('txt', 'selectbox')}
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
      <Form.Group className={cx('txt', 'mb-3')} controlId="formInfor.ControlInput5">
        <Form.Label>
          Url fanpage<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="link"
          placeholder="https://tankimchi.vn/"
          name="urlFanpage"
          aria-label="urlFanpage"
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.urlFanpage}
        />
      </Form.Group>
    </Form>
  )
}
export default FormInformation
