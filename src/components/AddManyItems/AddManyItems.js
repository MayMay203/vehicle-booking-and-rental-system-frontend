import classNames from 'classnames/bind'
import styles from './AddManyItems.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Form } from 'react-bootstrap'
const cx = classNames.bind(styles)
function AddManyItems({ initialItems, content, setLocations, idProvince, noTitle=false }) {
  const [items, setItems] = useState(initialItems)
  const [itemCounter, setItemCounter] = useState(items.length)
  // console.log('ban đầu:', itemCounter)
  //   const hasEmptyItem = items.some((item) => item.value.trim() === '')
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', id: itemCounter + 1 }])
    setItemCounter(itemCounter + 1)
    // console.log('add:', itemCounter)
  }
  const handleRemoveItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    // console.log('remove:', itemCounter)
  }
  // console.log('items:', items)
  useEffect(() => {
    if (setLocations && typeof setLocations === 'function') {
      if(idProvince !== null){
        setLocations(items.map((item, index) => item.value), idProvince)
      } else{
        setLocations(items.map((item, index) => item.value))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
   const handleItemChange = (e, id) => {
     const { value } = e.target
     setItems((prevState) => prevState.map((item) => (item.id === id ? { ...item, value } : item)))
    //  console.log('change:', itemCounter)
   }
  return (
    <Row>
      <Col className={`d-flex align-items-center ${noTitle ? 'col-md-1' : 'col-md-3'}`}>
        {!noTitle ? (
          <p className="ml-3">
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
  )
}
export default AddManyItems
