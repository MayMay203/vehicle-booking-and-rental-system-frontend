import classNames from 'classnames/bind'
import styles from './TableListTenant.module.scss'
import { Table, ConfigProvider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { getIDServiceByIDRegister } from '~/apiServices/rentalPartner/getIDServiceByIDRegister'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { getAllOrderByServiceID } from '~/apiServices/rentalPartner/getAllOrderByServiceID'
import viVN from 'antd/locale/vi_VN'
import { createCoversation } from '~/apiServices/messageService/createConverstation'
import { setMessageModalVisible } from '~/redux/slices/generalModalSlice'

const cx = classNames.bind(styles)

function TableListTenant({ idRegister }) {
  const dispatch = useDispatch()
  const [listIDService, setListIDService] = useState([{ id: '', type: -1 }])
  const [selectedType, setSelectedType] = useState(0)
  const [data, setData] = useState([])

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
      dataIndex: 'customerInfo',
      align: 'center',
      width: 300,
      render: (customerInfo) => customerInfo?.name || 'N/A',
      sorter: (a, b) => (a.customerInfo?.name || '').localeCompare(b.customerInfo?.name || ''),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerInfo',
      align: 'center',
      width: 150,
      render: (customerInfo) => customerInfo?.phoneNumber || 'N/A',
    },
    {
      title: 'Đặt lúc',
      dataIndex: 'createAt',
      align: 'center',
      width: 150,
    },
    {
      title: 'Số xe thuê',
      dataIndex: 'rentalInfo',
      align: 'center',
      width: 100,
      render: (rentalInfo) => rentalInfo?.numberOfVehicles || 'N/A',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'pricingInfo',
      align: 'center',
      width: 150,
      render: (pricingInfo) => pricingInfo?.priceTotal?.toLocaleString('vi-VN') + 'đ' || '0đ',
    },
    {
      title: 'Hủy lúc',
      dataIndex: 'rentalInfo',
      align: 'center',
      width: 150,
      render: (rentalInfo) => rentalInfo?.cancelAt || '--',
    },
    // {
    //   title: 'Nhắn tin',
    //   dataIndex: 'orderId',
    //   align: 'center',
    //   width: 100,
    //   render: (orderId) => (
    //     <FontAwesomeIcon
    //       icon={faMessage}
    //       style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
    //       onClick={() => handleChat(orderId)}
    //     />
    //   ),
    // },
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
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const handleChat = async () => {
    if (dispatch(checkLoginSession())) {
      // Create new conversation
      const idConversation = await createCoversation(currentUser.id, currentRole, data.customerInfo?.accountId, 'USER')
      dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
    }
  }
  // const handleChat = (orderId) => {
  //   console.log('Nhắn tin với order ID:', orderId)
  // }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const isLoggedIn = dispatch(checkLoginSession())
        if (isLoggedIn) {
          const response = await getIDServiceByIDRegister(idRegister)
          if (response && response.length > 0) {
            const services = response.map((item) => ({
              id: item.vehicle_rental_service_id,
              type: item.type,
            }))
            setListIDService(services)

            const matchedItem = services.find((item) => item.type === selectedType)
            if (matchedItem) {
              const orders = await getAllOrderByServiceID(matchedItem.id)
              setData(orders)
            } else {
              setData([])
            }
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error)
        setListIDService([{ id: '', type: -1 }])
      }
    }

    fetchOrders()
  }, [idRegister, selectedType, dispatch])

  const handleInputChange = (event) => {
    setSelectedType(Number(event.target.value))
  }

  return (
    <div>
      <Form.Select
        aria-label="Chọn loại dịch vụ"
        value={selectedType}
        onChange={handleInputChange}
        className={cx('txt', 'width-30', 'infor-item', 'justify-content-end mb-3')}
      >
        {listIDService.map((item, index) => (
          <option key={index} value={item.type}>
            {item.type === 0 ? 'Thuê xe tự lái' : 'Thuê xe có người lái'}
          </option>
        ))}
      </Form.Select>

      <ConfigProvider locale={viVN}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.orderId}
          bordered
          pagination={false}
          scroll={{ x: 'auto', y: 500 }}
          onChange={(pagination, filters, sorter, extra) => console.log('params', pagination, filters, sorter, extra)}
          className={cx('table-container')}
        />
      </ConfigProvider>
    </div>
  )
}

export default TableListTenant
