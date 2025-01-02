import classNames from 'classnames/bind'
import styles from './AddManyItems.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Form } from 'react-bootstrap'
import Button from '../Button'
import { updateBusTrip } from '~/apiServices/busPartner/updateBusTrip'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { toast } from 'react-toastify'
import { fetchAllBusTrips } from '~/redux/slices/busPartnerSlice'
const cx = classNames.bind(styles)
function AddManyItems({
  formData,
  idBusTrip,
  mode = '',
  initialItems,
  content,
  setLocations,
  idProvince,
  noTitle = false,
}) {
  const [items, setItems] = useState(initialItems)
  const [itemCounter, setItemCounter] = useState(items.length)
  const [activeSave, setActiveSave] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const dispatch = useDispatch()
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', id: itemCounter + 2 }])
    setItemCounter(itemCounter + 1)
    // console.log('add:', itemCounter)
    setActiveSave(true)
    setIsSaved(false)
  }
  const handleRemoveItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    // console.log('remove:', itemCounter)
    setActiveSave(true)
    setIsSaved(false)
  }

  useEffect(() => {
    if (setLocations && typeof setLocations === 'function') {
      if (idProvince !== null) {
        setLocations(
          items.map((item, index) => item.value),
          idProvince,
        )
      } else {
        setLocations(items.map((item, index) => item.value))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  useEffect(() => {
    if (mode === 'update') {
      setItems(initialItems)
    }
  }, [initialItems, mode])

  const handleItemChange = (e, id) => {
    const { value } = e.target
    setItems((prevState) => prevState.map((item) => (item.id === id ? { ...item, value } : item)))
    setActiveSave(true)
    setIsSaved(false)
    //  console.log('change:', itemCounter)
  }
  const handleSavePickUps = async () => {
    if (dispatch(checkLoginSession())) {
      try {
        console.log(
          'gửi:--',
          parseInt(idBusTrip),
          '--',
          formData?.busTripInfo?.departureLocation,
          '--',
          items.filter((item) => item.value !== '').map((item) => item.value),
        )
        const data = {
          id: parseInt(idBusTrip),
          departureLocation: formData?.busTripInfo?.departureLocation,
          arrivalLocation: formData?.busTripInfo?.arrivalLocation,
          pickupLocations: items.filter((item) => item.value !== '').map((item) => item.value),
        }

        await updateBusTrip(data)
        setIsSaved(true)
        dispatch(fetchAllBusTrips({ dep: '', des: '' }))
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại!', {
          autoClose: 2000,
          position: 'top-center',
        })
        setIsSaved(false)
      }
    }
  }
  const handleCancelPickUps = () => {
    setItems(initialItems)
  }
  console.log('items:', items)
  return (
    <>
      <Row>
        <Col className={`d-flex align-items-center ${noTitle ? 'col-md-1' : 'col-md-3'}`}>
          {!noTitle ? (
            <p className={cx('ml-3', 'custom-line-height')}>
              {content}
              <span className="text-danger">*</span>
            </p>
          ) : (
            <></>
          )}
          {/* <Form.Group className={cx('txt', 'mb-5')} controlId="formAdd.ControlInput3"> */}
          {/* <Form.Label className={cx('txt')}>
          Địa điểm đón khách<span className="text-danger">*</span>
        </Form.Label> */}
          {/* </Form.Group> */}
          <FontAwesomeIcon icon={faSquarePlus} className={cx('add-item')} onClick={handleAddItem}></FontAwesomeIcon>
        </Col>
        <Col className={`${noTitle ? 'col-md-11' : 'col-md-9'}`}>
          {items.map((item, index) => (
            <div className={cx('d-flex', ' align-items-center')} key={item.id}>
              {/* <div className={cx('serial-number')}>{index + 1}</div> */}
              <Col className="col-md-11">
                <Form.Control
                  type="text"
                  placeholder={`Nhập địa điểm ${index + 1} `}
                  value={item.value}
                  onChange={(e) => handleItemChange(e, item.id)}
                  className={cx('txt', 'padding-1')}
                />
              </Col>
              <Col className="col-md-1">
                {item.id === 1 ? (
                  <></>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faSquareMinus}
                      className={cx('add-item', 'ms-2')}
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </>
                )}
              </Col>
            </div>
          ))}
        </Col>
      </Row>
      {mode === 'update' && (
        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button outline className={cx('btn', 'btn-cancel')} onClick={() => handleCancelPickUps()}>
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
              handleSavePickUps()
            }}
          >
            {!isSaved ? 'Lưu' : 'Đã lưu'}
          </Button>
        </div>
      )}
    </>
  )
}
export default AddManyItems
