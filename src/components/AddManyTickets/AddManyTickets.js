import classNames from 'classnames/bind'
import styles from './AddManyTickets.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import TicketBus from '../TicketBus'
import { useDispatch } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { detailBusSchedule } from '~/apiServices/busPartner/detailBusSchedule'
import dayjs from 'dayjs'
import ViewTicketBus from '../TicketBus/ViewTicketBus'
// import Button from '../Button'
const cx = classNames.bind(styles)
function AddManyTickets({ haveTitle=true,initialItems, data, content, idBusSchedule, enableEdit }) {
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
  // const [data, setData] = useState({})
  // console.log('nhận date 11222:--', dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'), '--id:', idBusSchedule)
  // useEffect(() => {
  //   const fetchBusSchedule = async () => {
  //     if (dispatch(checkLoginSession())) {
  //       if (idBusSchedule) {
  //         try {
  //           const response = await detailBusSchedule(idBusSchedule,dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'))
  //           setData(response)
  //         } catch (error) {
  //           console.error('Failed to fetch bus schedule:', error)
  //         }
  //       }
  //     }
  //   }

  //   fetchBusSchedule()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [idBusSchedule, date]) 

  // const handleRemoveItem = (id) => {
  //   setItems((prevState) => prevState.filter((item) => item.id !== id))
  //   console.log('remove:', itemCounter)
  // }
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
            {/* <div className={cx('serial-number')}>{index + 1}</div> */}
            <ViewTicketBus enableEdit={false} initialItems={[]} content={''} data={data}></ViewTicketBus>
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
