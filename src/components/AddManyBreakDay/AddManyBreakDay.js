import classNames from 'classnames/bind'
import styles from './AddManyBreakDay.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Form, Row } from 'react-bootstrap'
const cx = classNames.bind(styles)
function AddManyBreakDay({ initialItems, content }) {
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
  const startBreakDay = '12/22/2024'
  return (
    <Row>
      <div className="d-flex align-items-center">
        <p className={cx('ms-2', 'me-3', 'txt', 'p-2')}>
          Ngày nghỉ
          {/* <span className="text-danger">*</span> */}
        </p>
        <FontAwesomeIcon icon={faSquarePlus} className={cx('add-item')} onClick={handleAddItem}></FontAwesomeIcon>
      </div>
      <div>
        {items.map((item, index) => (
          <div className={cx('d-flex', 'align-items-center')} key={item.id}>
            {/* <div className={cx('serial-number')}>{index + 1}</div> */}
            <Form.Control
              type="text"
              placeholder="45"
              name="startBreakDay"
              aria-label="startBreakDay"
              className={cx('txt')}
              value={'Từ:' + startBreakDay}
            />
            <Form.Control
              type="text"
              placeholder="45"
              name="numberSeat"
              aria-label="numberSeat"
              className={cx('txt')}
              value={'Đến:' + startBreakDay}
            />

            <FontAwesomeIcon
              icon={faSquareMinus}
              className={cx('add-item', 'ms-2')}
              onClick={() => handleRemoveItem(item.id)}
            />
          </div>
        ))}
      </div>
    </Row>
  )
}
export default AddManyBreakDay
