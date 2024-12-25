import classNames from 'classnames/bind'
import styles from './TableListBuyTicket.module.scss'
import { Table } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { createCoversation } from '~/apiServices/messageService/createConverstation'
import { setMessageModalVisible } from '~/redux/slices/generalModalSlice'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'
const cx = classNames.bind(styles)
function TableListBuyTicket({ listOrderOfBusTrip }) {
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      align: 'center',
      width: 200,
      showSorterTooltip: {
        target: 'full-header',
      },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberphone',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 130,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Đặt lúc',
      dataIndex: 'orderAt',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số vé',
      dataIndex: 'numberTicket',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalCharge',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Đặt lúc',
      dataIndex: 'orderAt',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Nhắn tin',
      dataIndex: 'chat',
      align: 'center',
      width: 100,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faMessage}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleChat(record.key)}
        />
      ),
    },
  ]
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const handleChat = async() => { if (dispatch(checkLoginSession())) {
        // Create new conversation
        const idConversation = await createCoversation(
          currentUser.id,
          currentRole,
          data.businessPartnerInfo?.accountId,
          'USER',
        )
        dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
        dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
      }}
  // const data = [
  //   {
  //     key: '1',
  //     name: 'Nguyễn Văn Đức',
  //     numberphone: '0842005668',
  //     orderAt: '12h, 12/11/2024',
  //     numberTicket: '4',
  //     totalCharge: '1.200.00đ',
  //     departure: '123 Nguyễn Lương Bằng, Đà Nẵng',
  //     destination: '123 Nguyễn Lương Bằng, Hà Nội',
  //     cancelAt: '12h, 12/11/2024',
  //     chat: '',
  //   },
  // ]
  const [data, setData] = useState([{}])
  useEffect(() => {
    setData(
      listOrderOfBusTrip
        // .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime)) // Sắp xếp theo thời gian đặt vé giảm dần
        .map((item, index) => ({
          key: index,
          name: item.name,
          numberphone: item.phoneNumber,
          orderAt: item.orderTime,
          numberTicket: item.numberOfTicker,
          totalCharge: item.totalPrice,
          cancelAt: item.cancelTime,
        })),
    )
  }, [listOrderOfBusTrip])
  console.log(
    'Order lisst:--',
    listOrderOfBusTrip,
    '------ data bang:',
    listOrderOfBusTrip
      // .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime)) // Sắp xếp theo thời gian đặt vé giảm dần
      .map((item, index) => ({
        key: index,
        name: item.name,
        numberphone: item.phoneNumber,
        orderAt: item.orderTime,
        numberTicket: item.numberOfTicker,
        totalCharge: item.totalPrice,
        cancelAt: item.cancelTime,
      })),
  )
  // useEffect(() => {setData(listOrderOfBusTrip)}, [listOrderOfBusTrip])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      bordered
      pagination={false}
      scroll={{ y: 500 }}
      // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      rowClassName="table-row-center" // Thêm class để căn giữa dọc
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
      className={cx('')}
    />
  )
}
export default TableListBuyTicket
