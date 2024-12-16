import classNames from 'classnames/bind'
import styles from './AddManyTickets.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import TicketBus from '../TicketBus'
// import Button from '../Button'
const cx = classNames.bind(styles)
function AddManyTickets({ initialItems, content }) {
  const [items, setItems] = useState(initialItems)
  const [itemCounter, setItemCounter] = useState(items.length)
  console.log('ban đầu:', itemCounter)
    // const hasEmptyItem = items.some((item) => item.value.trim() === '')
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', id: itemCounter + 1 }])
    setItemCounter(itemCounter + 1)
    console.log('add:', itemCounter)
  }

  // const handleRemoveItem = (id) => {
  //   setItems((prevState) => prevState.filter((item) => item.id !== id))
  //   console.log('remove:', itemCounter)
  // }
  return (
    <div className="align-items-center row">
      <div className="d-flex align-items-center">
        <p className={cx('mb-2', 'me-3', 'txt')}>
          Thêm lịch khởi hành
          <span className="text-danger">*</span>
        </p>
        <FontAwesomeIcon
          icon={faSquarePlus}
          className={cx('add-item', 'mb-2')}
          onClick={handleAddItem}
        ></FontAwesomeIcon>
      </div>
      <div>
        {items.map((item, index) => (
          <div className={cx('d-flex')} key={item.id}>
            {/* <div className={cx('serial-number')}>{index + 1}</div> */}
            <TicketBus initialItems={[]} content={''}></TicketBus>
            {/* <Button primary className={cx('ms-5 me-5', 'btn-save')}>
              Lưu
            </Button> */}
            {/* <FontAwesomeIcon
              icon={faSquareMinus}
              className={cx('add-item', 'ms-3', 'align-items-center')}
              onClick={() => handleRemoveItem(item.id)}
            /> */}
          </div>
        ))}
      </div>
    </div>
  )
}
export default AddManyTickets
