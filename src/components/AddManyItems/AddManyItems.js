import classNames from 'classnames/bind'
import styles from './AddManyItems.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Form } from 'react-bootstrap'
const cx = classNames.bind(styles)
function AddManyItems({ initialItems, content }) {
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
  return (
    <Row>
      <Col className="d-flex col-md-4 align-items-center">
        <p className="">
          {content}<span className="text-danger">*</span>
        </p>
        <FontAwesomeIcon
          icon={faSquarePlus}
          className={cx('add-item')}
          onClick={handleAddItem}
        ></FontAwesomeIcon>
      </Col>
      <Col className="col-md-8">
        {items.map((item, index) => (
          <div className={cx('d-flex')} key={item.id}>
            {/* <div className={cx('serial-number')}>{index + 1}</div> */}
            <Form.Control
              type="text"
              placeholder={`Nhập địa điểm ${index + 1} `}
              value={item.value}
              // onChange={(e) => handleItemChange(e, item.id)}
              className={cx('txt')}
            />
            <FontAwesomeIcon
              icon={faSquareMinus}
              className={cx('add-item', 'ms-2')}
              onClick={() => handleRemoveItem(item.id)}
            />
          </div>
        ))}
      </Col>
    </Row>
  )
}
export default AddManyItems
