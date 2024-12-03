import classNames from 'classnames/bind'
import styles from './AddManyDropOffLocation.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Form } from 'react-bootstrap'
import AddManyItems from '../AddManyItems'
const cx = classNames.bind(styles)
function AddManyDropOffLocation({ initialItems, content, provincesList }) {
  const [items, setItems] = useState(initialItems)
  const [itemCounter, setItemCounter] = useState(items.length)
  console.log('ban đầu:', itemCounter)
  //   const hasEmptyItem = items.some((item) => item.value.trim() === '')
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', id: itemCounter + 1 }])
    setItemCounter(itemCounter + 1)
    console.log('add:', itemCounter)
  }

  const handleRemoveItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    console.log('remove:', itemCounter)
  }
  const handleInputChange = (e) => {
    // const {name, value} = e.target
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }))
    // console.log(formData)
  }
  return (
    <Row>
      <Col className="d-flex col-md-3 align-items-center">
        <p className="">
          Địa điểm trả khách
          <span className="text-danger">*</span>
        </p>
        <FontAwesomeIcon icon={faSquarePlus} className={cx('add-item')} onClick={handleAddItem}></FontAwesomeIcon>
      </Col>
      <Col className="col-md-9">
        {items.map((item, index) => (
          <Row className={cx('d-flex', ' align-items-center')}>
            <div
              className={cx('mt-4', 'wrap-drop-off-location', 'col-md-11')}
              key={item.id}
              data-content={`Địa điểm ${index + 1}`}
            >
              {/* <div className={cx('d-flex', ' align-items-center')}> */}
              <Row className={cx('mt-4')}>
                <Col>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput1">
                    <Form.Label className="mb-3">
                      Tỉnh<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      aria-label="province"
                      name="province"
                      // value={formData.province}
                      onChange={handleInputChange}
                      className={cx('txt', 'selectbox')}
                    >
                      <option value={''}>Chọn tỉnh/thành phố</option>
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
                      Thời gian di chuyển<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="duration"
                      name="duration"
                      // value={formData.departure}
                      onChange={handleInputChange}
                      className={cx('txt')}
                      readOnly
                      disabled
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3">
                    <Form.Label className="mb-3">
                      Giá vé<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="price"
                      name="price"
                      // value={formData.departure}
                      onChange={handleInputChange}
                      className={cx('txt', 'selectbox')}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              {/* </div> */}
              <AddManyItems initialItems={[1]} content={'Vị trí cụ thể'}></AddManyItems>
            </div>
            <div className="col-md-1">
              <FontAwesomeIcon
                icon={faSquareMinus}
                className={cx('add-item', 'ms-2')}
                onClick={() => handleRemoveItem(item.id)}
              />
            </div>
          </Row>
        ))}
      </Col>
    </Row>
  )
}
export default AddManyDropOffLocation
