import classNames from 'classnames/bind'
import styles from './AddManyTickets.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import ViewTicketBus from '../TicketBus/ViewTicketBus'
// import Button from '../Button'
const cx = classNames.bind(styles)
function AddManyTickets({ haveTitle = true, initialItems, data, content, idBusSchedule, enableEdit }) {
  const [items, setItems] = useState(initialItems)
  const [itemCounter, setItemCounter] = useState(items.length)
  // const dispatch = useDispatch()
  console.log('ban đầu:', itemCounter)
  // const hasEmptyItem = items.some((item) => item.value.trim() === '')
  const handleAddItem = () => {
    setItems((prevState) => [...prevState, { value: '', id: itemCounter + 1 }])
    setItemCounter(itemCounter + 1)
    console.log('add:', itemCounter)
  }

  return (
    <div className="align-items-center row">
      <div className="d-flex align-items-center">
        {haveTitle ? (
          <p className={cx('mb-2', 'me-3', 'txt')}>
            Thêm lịch khởi hành
            <span className="text-danger">*</span>
          </p>
        ) : (
          <></>
        )}
        {enableEdit && (
          <FontAwesomeIcon
            icon={faSquarePlus}
            className={cx('add-item', 'mb-2')}
            onClick={handleAddItem}
          ></FontAwesomeIcon>
        )}
      </div>
      <div>
        {items.map((item, index) => (
          <div className={cx('d-flex')} key={item.id}>
            <ViewTicketBus enableEdit={false} initialItems={[]} content={''} data={data}></ViewTicketBus>
          </div>
        ))}
      </div>
    </div>
  )
}
export default AddManyTickets
