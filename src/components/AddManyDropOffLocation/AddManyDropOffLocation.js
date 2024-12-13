import classNames from 'classnames/bind'
import styles from './AddManyDropOffLocation.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Form, Accordion } from 'react-bootstrap'
import AddManyItems from '../AddManyItems'
import { convertTimeFormat } from '~/utils/convertTimeFormat'
import { toast } from 'react-toastify'
import { getLongitudeLatitude } from '~/apiServices/getLongitudeLatitude'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { getDurationDistance } from '~/apiServices/busPartner/getDurationDistance'
const cx = classNames.bind(styles)
function AddManyDropOffLocation({ initialItems, departure, content, provincesList, setListDropOffs }) {
  const [items, setItems] = useState([initialItems])
  const [itemCounter, setItemCounter] = useState(items.length)
  const dispatch = useDispatch()
  console.log('ban đầu:', items, '--', initialItems)
  //   const hasEmptyItem = items.some((item) => item.value.trim() === '')
  useEffect(() => {
    setListDropOffs(items)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  useEffect(() => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === 1
          ? 
              initialItems
          
          : item,
      ),
    )
  }, [initialItems])
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', duration: '', price: '', dropOffs: [''], id: itemCounter + 1 }])
    setItemCounter(itemCounter + 1)
    console.log('add:', itemCounter)
  }

  const handleRemoveItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    console.log('remove:', itemCounter)
  }
  // const handleInputChange = (e) => {
  //   // const {name, value} = e.target
  //   // setFormData((prevState) => ({
  //   //   ...prevState,
  //   //   [name]: value,
  //   // }))
  //   // console.log(formData)
  // }
  const getDurationOfTwoProvinces = async (departure, destination) => {
    try {
      const dep = await getLongitudeLatitude(departure)
      const des = await getLongitudeLatitude(destination)
      console.log('dep:', dep)
      console.log('des:', des)

      console.log('dep--:', dep[0].lon)
      console.log('des--:', des[0].lon)
      if (dispatch(checkLoginSession())) {
        const response = await getDurationDistance(dep[0].lon, dep[0].lat, des[0].lon, des[0].lat)
        return response
      }
    } catch (error) {
      console.log('Lỗi:', error)
    }
  }
  const handleInputChange = (id, field, value) => {
    if (field === 'value') {
      // Kiểm tra xem value mới có trùng lặp không
      const isDuplicate = items.some((item) => item.value === value && item.id !== id) || value === departure

      if (isDuplicate) {
        toast.error('Tên tỉnh đã tồn tại. Vui lòng chọn tên tỉnh khác.', {
          autoClose: 2000,
          position: 'top-center',
        })
        return
      }
    }
    setItems((prevState) => prevState.map((item) => (item.id === id ? { ...item, [field]: value } : item)))

    if (field === 'value') {
      checkSessionAndGetDuration(id, value)
    }
  }
  const checkSessionAndGetDuration = async (id, destination) => {
    if (dispatch(checkLoginSession())) {
      if (departure && destination) {
        const response = await getDurationOfTwoProvinces(departure, destination)
        if (response) {
          console.log('vào -- response:', response)
          setItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    duration: response.duration,
                  }
                : item,
            ),
          )
        }
      }
    }
  }
  // useEffect(() => {
    

  //   checkSessionAndGetDuration()
  // }, [])
  const setLocations = (locations, id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              dropOffs: locations,
            }
          : item,
      ),
    )
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
                      aria-label="value"
                      name="value"
                      value={item.value}
                      onChange={(e) => handleInputChange(item.id, 'value', e.target.value)}
                      className={cx('txt', 'selectbox')}
                      readOnly={item.id === 1}
                      disabled={item.id === 1}
                    >
                      {item.id === 1 ? (
                        <option value={item.value}>{item.value}</option>
                      ) : (
                        <>
                          <option value={''}>Chọn tỉnh/thành phố</option>
                          {provincesList.map((province, index) => (
                            <option key={index} value={province.name}>
                              {province.name}
                            </option>
                          ))}
                        </>
                      )}
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
                      value={convertTimeFormat(item.duration)}
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
                      value={item.price}
                      onChange={(e) => {
                        const input = e.target.value
                        if (/^\d*$/.test(input) && input.length <= 8) {
                          // Allow only digits
                          handleInputChange(item.id, 'price', input)
                        }
                      }}
                      className={cx('txt', 'selectbox')}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              {/* </div> */}
              <Accordion>
                <Accordion.Item eventKey={item.id}>
                  <Accordion.Header>
                    <span className={cx('txt')}>Vị trí cụ thể</span> <span className={cx('text-danger', 'txt')}>*</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <AddManyItems
                      noTitle={true}
                      initialItems={[{ value: '', id: 1 }]}
                      content={'Vị trí cụ thể'}
                      idProvince={item.id}
                      setLocations={setLocations}
                    ></AddManyItems>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="col-md-1">
              {item.id !== 1 && (
                <FontAwesomeIcon
                  icon={faSquareMinus}
                  className={cx('add-item', 'ms-2')}
                  onClick={() => handleRemoveItem(item.id)}
                />
              )}
            </div>
          </Row>
        ))}
      </Col>
    </Row>
  )
}
export default AddManyDropOffLocation
