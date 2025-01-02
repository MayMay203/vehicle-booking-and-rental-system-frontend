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

  console.log('-----formData-------', formData)
  const typeVehicles = useSelector((state) => state.rentalPartner.vehicleTypeList)
  console.log('formData.policy----', formData.policy)
  const [policies, setPolicies] = useState(
    formData?.policy
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
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllVehicleTypes())
    }
  }, [dispatch])
  useEffect(() => {
    const updatedListPolicies = policies.map((policy) => policy.value).join(' @#$%& ')
    // setListPolicies(updatedListPolicies)
    handleInputChange({ target: { name: 'policy', value: updatedListPolicies } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policies])
  const handleAddPolicy = () => {
    setPolicies((prevState) => {
      const updatedPolicies = [...prevState, { value: '', id: policyCounter + 1 }]
      setPolicyCounter((prev) => prev + 1) 
      return updatedPolicies
    })
  }

  useEffect(() => {
    if (formData?.policy) {
      setPolicies(
        formData?.policy
          .split('@#$%&')
          .map((value, index) => ({ value: value.trim(), id: index })) || '',
      )
    }
  }, [formData.policy])

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
              // disabled={view}
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
              value={formData.vehicleLife}
              name="vehicleLife"
              aria-label="vehicleLife"
              className={cx('txt')}
              readOnly={view}
              // disabled={view}
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
            // disabled={view}
            onChange={handleInputChange}
          >
            {typeServices.map((type, index) => (
              <option key={index} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput7">
          <Form.Label className="mb-3">
            Phí đặt cọc<span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className={cx('txt', 'infor-item')}>
            <Form.Control
              type="number"
              // value={formData?.car_deposit?.toLocaleString('vi-VN')}
              value={formData?.car_deposit}
              name="car_deposit"
              aria-label="car_deposit"
              className={cx('txt')}
              onChange={handleInputChange}
              readOnly={view}
              // disabled={view}
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
          <Form.Control
            type="text"
            value={formData.location}
            name="location"
            aria-label="location"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            // disabled={view}
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
            value={
              mode === 'edit'
                ? typeVehicles.find((type) => type.name === formData.type_vehicle)?.id || ''
                : formData.type_vehicle
            }
            aria-label="type_vehicle"
            name="type_vehicle"
            className={cx('txt', 'selectbox', 'infor-item')}
            readOnly={view}
            // disabled={view}
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
              // disabled={view}
              onChange={handleInputChange}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faBoxArchive} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <div className="d-flex">
          {[0, '0', 2, '2'].includes(formData.type_service) && (
            <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput7">
              <Form.Label className="mb-3">
                Giá thuê tự lái<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="number"
                  value={formData?.price1?.toLocaleString('vi-VN')}
                  name="price1"
                  aria-label="price1"
                  className={cx('txt')}
                  onChange={handleInputChange}
                  readOnly={view}
                  // disabled={view}
                />
                <InputGroup.Text className={cx('txt')}>
                  <FontAwesomeIcon icon={faDongSign} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          )}

          {[1, '1', 2, '2'].includes(formData.type_service) && (
            <Form.Group className={cx('txt', 'padding-s', 'mb-5')} controlId="formInfor.ControlInput8">
              <Form.Label className="mb-3">
                Giá thuê có người lái<span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className={cx('txt', 'infor-item')}>
                <Form.Control
                  type="number"
                  value={formData?.price2?.toLocaleString('vi-VN')}
                  name="price2"
                  aria-label="price2"
                  className={cx('txt')}
                  onChange={handleInputChange}
                  readOnly={view}
                  // disabled={view}
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
              // disabled={view}
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
              value={formData?.reservation_fees?.toLocaleString('vi-VN')}
              name="reservation_fees"
              aria-label="reservation_fees"
              className={cx('txt')}
              onChange={handleInputChange}
              readOnly={view}
              // disabled={view}
            />
            <InputGroup.Text className={cx('txt')}>
              <FontAwesomeIcon icon={faDongSign} />
            </InputGroup.Text>
          </InputGroup>
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
          // disabled={view}
        />
        <p className={cx('max-description')}>{formData?.description?.length || 0}/500</p>
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
          // disabled={view}
        />
        <p className={cx('max-description')}>{formData?.utility?.length || 0}/300</p>
      </Form.Group>
      {mode !== 'view' && (
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
      )}
    </>
  )
}
export default FormInforServiceRental
