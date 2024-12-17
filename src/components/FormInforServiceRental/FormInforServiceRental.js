import classNames from 'classnames/bind'
import styles from './FormInforServiceRental.module.scss'
import { Col, Form, InputGroup } from 'react-bootstrap'
import {
  faBoxArchive,
  faClock,
  faCodeBranch,
  faDongSign,
  faPercent,
  faSquareMinus,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllVehicleTypes } from '~/redux/slices/rentalPartnerSlice'
const cx = classNames.bind(styles)
function FormInforServiceRental({ mode, formData, handleInputChange }) {
  const view = mode === 'view'
  const dispatch = useDispatch()
  const typeVehicles = useSelector((state) => state.rentalPartner.vehicleTypeList)
  const [listPolicies, setListPolicies] = useState(formData.policy)
  const [policies, setPolicies] = useState(
    listPolicies
      .split('@#$%&')
      // .filter(Boolean)
      .map((value, index) => ({ value: value.trim(), id: index })) || '',
  )
  const [policyCounter, setPolicyCounter] = useState(0)
  const typeServices = [
    { value: '', label: 'Chọn loại dịch vụ' },
    { value: '0', label: 'Thuê xe tự lái' },
    { value: '1', label: 'Thuê xe có người lái' },
    { value: '2', label: 'Cả 2 dịch vụ' },
  ]
  const statuses = [
    { value: 'available', label: 'Đang hoạt động' },
    { value: 'Tạm dừng hoạt động', label: 'Tạm dừng hoạt động' },
    { value: 'Dừng hoạt động', label: 'Dừng hoạt động' },
  ]
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllVehicleTypes())
    }
  }, [dispatch])

  useEffect(() => {
    const updatedListPolicies = policies.map((policy) => policy.value).join(' @#$%& ')
    setListPolicies(updatedListPolicies)
    handleInputChange({ target: { name: 'policy', value: updatedListPolicies } })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policies])

  const handleAddPolicy = () => {
    setPolicies((prevState) => {
      const updatedPolicies = [...prevState, { value: '', id: policyCounter + 1 }]
      setPolicyCounter((prev) => prev + 1) // Tăng counter
      return updatedPolicies
    })
  }

  const handleRemovePolicy = (id) => {
    setPolicies((prevState) => {
      return prevState.filter((policy) => policy.id !== id)
    })
  }

  const handlePolicyChange = (e, id) => {
    const { value } = e.target
    setPolicies((prevState) => {
      return prevState.map((policy) => (policy.id === id ? { ...policy, value } : policy))
    })
  }
  return (
    <>
      <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput1">
          <Form.Label className="mb-3">
            Hãng xe<span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="text"
              value={formData.car_company}
              name="car_company"
              aria-label="car_company"
              className={cx('txt')}
              onChange={handleInputChange}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput2">
          <Form.Label className="mb-3">
            Đời xe <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="text"
              value={formData.car_year}
              name="car_year"
              aria-label="car_year"
              className={cx('txt')}
              readOnly={view}
              disabled={view}
              onChange={handleInputChange}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faClock} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput3">
          <Form.Label className="mb-3">
            Loại dịch vụ<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            value={formData.type_service}
            aria-label="type_service"
            name="type_service"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
            onChange={handleInputChange}
          >
            {typeServices.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput4">
          <Form.Label className="mb-3">
            Giá tính theo <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="price_according"
            aria-label="price_according"
            className={cx('txt', 'selectbox', 'infor-item')}
            value={formData.price_according}
            readOnly={view}
            disabled={view}
            onChange={handleInputChange}
          >
            <option key={1} value="1">
              1 ngày
            </option>
            <option key={2} value="2">
              2 ngày
            </option>
            <option key={3} value="3">
              3 ngày
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput7">
          <Form.Label className="mb-3">
            Phí đặt cọc<span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="number"
              value={formData.car_deposit}
              name="car_deposit"
              aria-label="car_deposit"
              className={cx('txt')}
              onChange={handleInputChange}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faDongSign} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput5">
          <Form.Label className="mb-3">
            Địa chỉ<span className="text-danger">*</span>
          </Form.Label>
          {/* <Form.Select
            value={formData.location}
            name="location"
            aria-label="location"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
          >
            {provinces.map((province, index) => (
              <option key={index} value={province.value}>
                {province.label}
              </option>
            ))}
          </Form.Select> */}
          <Form.Control
            type="text"
            value={formData.location}
            name="location"
            aria-label="location"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className={cx('col-sm-12 col-xs-12 col-md-6', 'col-form')}>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput11">
          <Form.Label className="mb-3">
            Loại xe<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            value={formData.type_vehicle}
            aria-label="type_vehicle"
            name="type_vehicle"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            disabled={view}
            onChange={handleInputChange}
          >
            <option key={-1} value={''}>
              Chọn loại xe
            </option>
            {typeVehicles.map((type, index) => (
              <option key={index} value={type.id}>
                {type.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput6">
          <Form.Label className="mb-3">
            Số lượng<span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="number"
              value={formData.quantity}
              name="quantity"
              aria-label="quantity"
              className={cx('txt')}
              readOnly={view}
              disabled={view}
              onChange={handleInputChange}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faBoxArchive} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <div className="d-flex">
          {(formData.type_service === 'Thuê xe tự lái' || formData.type_service === 'Cả 2 dịch vụ') && (
            <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput7">
              <Form.Label className="mb-3">
                Giá thuê tự lái<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="number"
                  value={formData.price1}
                  name="price1"
                  aria-label="price1"
                  className={cx('txt')}
                  onChange={handleInputChange}
                  readOnly={view}
                  disabled={view}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faDongSign} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )}

          {(formData.type_service === 'Thuê xe có người lái' || formData.type_service === 'Cả 2 dịch vụ') && (
            <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput8">
              <Form.Label className="mb-3">
                Giá thuê có người lái<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="number"
                  value={formData.price2}
                  name="price2"
                  aria-label="price2"
                  className={cx('txt')}
                  onChange={handleInputChange}
                  readOnly={view}
                  disabled={view}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faDongSign} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )}
        </div>
        <Form.Group className={cx('txt', 'mb-5', 'padding')} controlId="formInfor.ControlInput9">
          <Form.Label className="mb-3">
            Giảm giá<span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="number"
              value={formData.reduce}
              name="reduce"
              aria-label="reduce"
              className={cx('txt')}
              readOnly={view}
              disabled={view}
              onChange={handleInputChange}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faPercent} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput7">
          <Form.Label className="mb-3">
            Phí giữ chỗ<span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="number"
              value={formData.reservation_fees}
              name="reservation_fees"
              aria-label="reservation_fees"
              className={cx('txt')}
              onChange={handleInputChange}
              readOnly={view}
              disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faDongSign} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput10">
          <Form.Label className="mb-3">
            Trạng thái<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="status"
            aria-label="status"
            className={cx('txt', 'selectbox', 'infor-item')}
            value={formData.status}
            onChange={handleInputChange}
            readOnly={view}
            disabled={view}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status.value}>
                {status.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput9">
        <Form.Label className="mb-3">
          Mô tả<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.description}
          maxLength={500}
          readOnly={view}
          disabled={view}
        />
        <p className={cx('max-description')}>{formData.description.length}/500</p>
      </Form.Group>
      <Form.Group className={cx('txt', 'padding', 'mb-5')} controlId="formInfor.ControlInput9">
        <Form.Label className="mb-3">
          Tiện ích<span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          name="utility"
          as="textarea"
          rows={3}
          className={cx('txt')}
          onChange={handleInputChange}
          value={formData.utility}
          maxLength={300}
          readOnly={view}
          disabled={view}
        />
        <p className={cx('max-description')}>{formData.description.length}/300</p>
      </Form.Group>
      <Form.Group className={cx('txt', 'padding')} controlId="formMoreInfor.ControlInput2">
        <div className="align-items-center">
          <Form.Label>
            Chính sách <span className="text-danger">*</span>
          </Form.Label>
          <FontAwesomeIcon icon={faSquarePlus} className={cx('add-policy')} onClick={handleAddPolicy} />
        </div>
        {policies.map((policy, index) => (
          <div className={cx('d-flex', 'mt-2', 'mb-2')} key={policy.id}>
            <Form.Control
              type="text"
              placeholder={`Nhập chính sách ${index + 1} `}
              value={policy.value}
              onChange={(e) => handlePolicyChange(e, policy.id)}
              className={cx('txt')}
            />
            <FontAwesomeIcon
              icon={faSquareMinus}
              className={cx('add-policy', 'ms-2')}
              onClick={() => handleRemovePolicy(policy.id)}
            />
          </div>
        ))}
      </Form.Group>
    </>
  )
}
export default FormInforServiceRental
