import classNames from 'classnames/bind'
import styles from './AddManyBreakDay.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Form, Row } from 'react-bootstrap'
import { DatePicker } from 'antd'
import moment from 'moment'
const cx = classNames.bind(styles)

function AddManyBreakDay({ initialItems, content, setBreakDays, price=null }) {
  const [items, setItems] = useState(initialItems)
  const [itemCounter, setItemCounter] = useState(items.length)

  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { start: '', end: '', id: itemCounter + 1 }])
    setItemCounter((prev) => prev + 1)
  }

  const handleRemoveItem = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
  }

  const handleStartDateChange = (date, id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              start: date?.format('DD-MM-YYYY') || '',
            }
          : item,
      ),
    )
  }

  const handleEndDateChange = (date, id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              end: date?.format('DD-MM-YYYY') || '',
            }
          : item,
      ),
    )
  }

  useEffect(() => {
    const validDays = items
      .filter((item) => item.start !== '' && item.end !== '') // Filter items with non-empty start and end
      .map(({ start, end }) => ({ start, end })) // Extract only start and end fields
    setBreakDays(validDays) // Send to the parent
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <Row className="align-items-start">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faSquarePlus} className={cx('add-item')} onClick={handleAddItem} />
        <p className={cx('me-3', 'txt', 'p-2')}>Ngày nghỉ</p>
      </div>
      <div>
        {items.map((item) => (
          <div className={cx('d-flex', 'align-items-center')} key={item.id}>
            <Form.Group className={cx('txt', 'd-flex')} controlId={`formAddStart_${item.id}`}>
              <Form.Label className="mb-2 d-flex mt-3 me-2">Từ</Form.Label>
              <DatePicker
                placeholder="Chọn ngày"
                onChange={(date) => handleStartDateChange(date, item.id)}
                value={item.start ? moment(item.start, 'DD-MM-YYYY') : null}
                format="DD-MM-YYYY"
                className="content-calendar w-100"
              />
            </Form.Group>
            <Form.Group className={cx('txt', 'd-flex')} controlId={`formAddEnd_${item.id}`}>
              <Form.Label className="mb-2 d-flex mt-3 ms-5 me-2">Đến</Form.Label>
              <DatePicker
                placeholder="Chọn ngày"
                onChange={(date) => handleEndDateChange(date, item.id)}
                value={item.end ? moment(item.end, 'DD-MM-YYYY') : null}
                format="DD-MM-YYYY"
                className="content-calendar w-100"
              />
            </Form.Group>
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
