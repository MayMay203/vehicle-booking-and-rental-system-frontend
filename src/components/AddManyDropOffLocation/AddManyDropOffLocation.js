import classNames from 'classnames/bind'
import styles from './AddManyDropOffLocation.module.scss'
import { useEffect, useRef, useState } from 'react'
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
import { getLocations } from '~/apiServices/getLocations'
import { convertMoneyIntoDigits } from '~/utils/convertMoneyIntoDigits'
import Button from '../Button'
import { fetchAllBusTrips } from '~/redux/slices/busPartnerSlice'
import { updateDropOffs } from '~/apiServices/busPartner/updateDropOffs'
import { generalModalNames, setLoadingModalVisible } from '~/redux/slices/generalModalSlice'
const cx = classNames.bind(styles)
function AddManyDropOffLocation({
  idBusTrip = '',
  mode = '',
  initialItems,
  departure,
  content,
  setListDropOffs = () => {},
}) {
  const [items, setItems] = useState(mode === 'update' ? initialItems : [initialItems])
  const [itemCounter, setItemCounter] = useState(items.length)
  // const [initialDepartures, setInitialDepartures] = useState([{ value: '', id: 1 }])
  const dispatch = useDispatch()
  const [activeSave, setActiveSave] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  console.log('ban đầu:', items, '--', initialItems)
  const [provincesList, setProvincesList] = useState([])
  const isFirstRender = useRef(true) // Khai báo biến cờ
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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // Đánh dấu là đã qua lần render đầu
      return // Không thực thi code bên dưới
    }
    if (mode === 'update') {
      const checkEmptyFields = () => {
        const isEmpty = items.every((item) => {
          const { dropOffs, ...rest } = item
          console.log('Kiểm tra item:', item)

          const hasEmpty = Object.values(rest).some((value) => value === '')
          const validDropOffs = dropOffs?.some((drop) => drop !== '')

          const result = hasEmpty || !validDropOffs
          console.log('Kết quả kiểm tra:', result)
          return !result
        })

        setActiveSave(isEmpty)
        setIsSaved(false)
      }

      checkEmptyFields()
    }
  }, [items, mode])
  //   const hasEmptyItem = items.some((item) => item.value.trim() === '')
  useEffect(() => {
    setListDropOffs(items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  useEffect(() => {
    if (mode === '') {
      setItems((prev) => prev.map((item) => (item.id === 1 ? initialItems : item)))
    } else {
      setItems(initialItems)
    }
  }, [initialItems, mode])
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', duration: '', price: '', dropOffs: [''], id: itemCounter + 1 }])
    setItemCounter(itemCounter + 1)
    console.log('add:', itemCounter)
    if (mode === 'update') {
      setActiveSave(true)
      setIsSaved(false)
    }
  }

  const handleRemoveItem = (id) => {
    if (mode === '') {
      setItems((prevState) => prevState.filter((item) => item.id !== id))
      console.log('remove:', itemCounter)
    } else {
      if (id > initialItems.length) {
        setItems((prevState) => prevState.filter((item) => item.id !== id))
        console.log('remove:', itemCounter)
      }
    }
    if (mode === 'update') {
      setActiveSave(true)
      setIsSaved(false)
    }
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
    if (mode === 'update') {
      setActiveSave(true)
      setIsSaved(false)
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
  const handleCancelDropOffs = () => {
    setItems(initialItems)
  }
  const handleSaveDropOffs = async () => {
    if (dispatch(checkLoginSession())) {
      dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: true }))
      try {
        for (const item of items) {
          const data = {
            id: parseInt(item.idDropOffs),
            province: item.value,
            priceTicket: Number(convertMoneyIntoDigits(item.price)),
            journeyDuration: item.duration,
            dropOffLocations: item.dropOffs.filter((item1) => item1 !== ''),
          }
          console.log('gửi:--', data)
          await updateDropOffs(data)
        }
        setIsSaved(true)
        dispatch(fetchAllBusTrips({ dep: '', des: '' }))
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại!', {
          autoClose: 2000,
          position: 'top-center',
        })
        setIsSaved(false)
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      } finally {
        dispatch(setLoadingModalVisible({ name: generalModalNames.LOADING, isOpen: false }))
      }
    }
  }
  return (
    <>
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
                        value={item?.duration ? convertTimeFormat(item.duration) : ''}
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
                        value={convertMoneyIntoDigits(item.price)}
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
                      <span className={cx('txt')}>Vị trí cụ thể</span>{' '}
                      <span className={cx('text-danger', 'txt')}>*</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      {mode === '' ? (
                        <AddManyItems
                          noTitle={true}
                          initialItems={[{ value: '', id: 1 }]}
                          content={'Vị trí cụ thể'}
                          idProvince={item.id}
                          setLocations={setLocations}
                        ></AddManyItems>
                      ) : (
                        <AddManyItems
                          noTitle={true}
                          initialItems={
                            item?.dropOffs
                              ? item.dropOffs.map((item1, index1) => ({
                                  value: item1,
                                  id: index1 + 1,
                                }))
                              : [{ value: '', id: 1 }]
                          }
                          content={'Vị trí cụ thể'}
                          idProvince={item.id}
                          setLocations={setLocations}
                        ></AddManyItems>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="col-md-1">
                {mode === ''
                  ? item.id !== 1 && (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        className={cx('add-item', 'ms-2')}
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    )
                  : item.id > initialItems.length && (
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
      {mode === 'update' && (
        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button outline className={cx('btn', 'btn-cancel')} onClick={() => handleCancelDropOffs()}>
            Hủy
          </Button>
          <Button
            primary
            className={cx('btn', 'btn-save')}
            disabled={!activeSave || isSaved}
            onClick={(event) => {
              event.preventDefault()
              // setIsSaved(true)
              // setActiveSave(false)
              handleSaveDropOffs()
            }}
          >
            {!isSaved ? 'Lưu' : 'Đã lưu'}
          </Button>
        </div>
      )}
    </>
  )
}
export default AddManyDropOffLocation
