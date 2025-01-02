import classNames from 'classnames/bind'
import styles from './OrderManage.module.scss'
import { Table } from 'antd'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faMessage } from '@fortawesome/free-solid-svg-icons'
import TxtSearch from '~/components/TxtSearch'
import ModalDetailOrderRental from '~/components/ModalDetailOrderRental'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllOrder } from '~/redux/slices/rentalPartnerSlice'
import { createCoversation } from '~/apiServices/messageService/createConverstation'
import { generalModalNames, setConfirmModalVisible, setMessageModalVisible } from '~/redux/slices/generalModalSlice'
import { getVehicleRentalByID } from '~/apiServices/user/getVehicleRentalByID'
import { fetchAllConversationsByAcc } from '~/redux/slices/conversationSlice'
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'
import { convertDateTimeFormat } from '~/utils/convertDateTimeFormat'
const cx = classNames.bind(styles)
function OrderManage() {
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Người thuê',
      dataIndex: 'nameRental',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 170,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberphone',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 120,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Thuê lúc',
      dataIndex: 'timeRental',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      render: (text) => convertDateTimeFormat(text),
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Loại xe',
      dataIndex: 'typeVehicle',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 120,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'location',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 200,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số lượng thuê',
      dataIndex: 'number',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'charge',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 110,
      // sorter: (a, b) => a.age - b.age,
      render: (value) => {
        return value ? `${value.toLocaleString('vi-VN')} đ` : '-'
      },
    },
    {
      title: 'Chi tiết',
      dataIndex: 'view',
      align: 'center',
      width: 85,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewDetail(record.transactionCode, record.inforRentalVehicle)}
        />
      ),
    },
    {
      title: 'Đã trả xe',
      dataIndex: 'update',
      align: 'center',
      width: 80,
      render: (text, record) =>
        record.statusOrder === 'returned' ? (
          <FontAwesomeIcon
            icon={faSquareCheck}
            style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
            onClick={() => handleReturned(record.key, 'not_returned')}
          />
        ) : (
          <FontAwesomeIcon
            icon={faSquare}
            style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
            onClick={() => handleReturned(record.key, 'returned')}
          />
        ),
    },
    {
      title: 'Nhắn tin',
      dataIndex: 'delete',
      align: 'center',
      width: 85,
      // render: (record) => (
      //   <FontAwesomeIcon icon={faMessage} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      // ),
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faMessage}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleChat(record.accountID)}
        />
      ),
    },
  ]
  const dispatch = useDispatch()
  const listOrder = useSelector((state) => state.rentalPartner.orderList)
  const [data, setData] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  const { currentRole } = useSelector((state) => state.menu)
  const [inforRentalVehicle, setInforRentalVehicle] = useState({})
  // const data = [
  //   {
  //     key: '1',
  //     typeVehicle: 'Ô tô 16 chỗ',
  //     number: '10',
  //     charge: '1.000.000đ',
  //     location: 'Quảng Nam',
  //     nameRental: 'Nguyễn Trần Như Ngọc',
  //     numberphone: '0842593668',
  //     timeRental: '12:00, 12/12/2024',
  //   },
  // ]
  const getInforRentalVehicle = async (id) => {
    const response = await getVehicleRentalByID(id)
    return response
  }
  const handleReturned = (id, statusOrder) => {
    if (dispatch(checkLoginSession())) {
      try {
        dispatch(
          setConfirmModalVisible({
            name: generalModalNames.UPDATE_STATUS_RENTAL_ORDERS,
            title: 'Xác nhận',
            description: statusOrder === 'not_returned' ? 'Khách hàng chưa trả xe?' : 'Khách hàng đã trả xe?',
            isOpen: true,
            modalType: 'confirm',
            id: id,
            status: statusOrder,
            // startDate: startDate.toISOString(),
          }),
        )
      } catch (error) {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
      }
    }
  }
  const handleChat = async (id) => {
    if (dispatch(checkLoginSession())) {
      // Create new conversation
      const idConversation = await createCoversation(parseInt(currentUser.id), currentRole, parseInt(id), 'USER')
      dispatch(fetchAllConversationsByAcc({ accountId: currentUser.id, roleAccount: currentRole }))
      dispatch(setMessageModalVisible({ isOpen: true, conversationId: idConversation }))
    }
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [modalDetailShow, setModalDetailShow] = useState(false)
  const [transactionCode, setTransactionCode] = useState('')
  const handleViewDetail = (transactionCode, inforRentalVehicle) => {
    console.log('transactionCode-trong-cha:', transactionCode, '--inforRentalVehicle:', inforRentalVehicle)
    setModalDetailShow(true)
    setTransactionCode(transactionCode)
    // setInforRentalVehicle(inforRentalVehicle)
  }
  console.log('transactionCode--cha:', transactionCode)
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllOrder())
    }
  }, [dispatch])

  useEffect(() => {
    const fetchRentalInfo = async () => {
      try {
        const updatedData = await Promise.all(
          listOrder.map(async (item, index) => {
            const rentalInfo = await getInforRentalVehicle(item.rentalInfo.carRentalServiceId)
            setInforRentalVehicle(rentalInfo)
            return {
              key: item.orderId,
              typeVehicle: rentalInfo.vehicle_type,
              number: item.rentalInfo.numberOfVehicles,
              charge: item.pricingInfo.priceTotal,
              location: item.rentalInfo.pickupLocation,
              nameRental: item.customerInfo.name,
              numberphone: item.customerInfo.phoneNumber,
              timeRental: item.createAt,
              accountID: item.customerInfo.accountId,
              transactionCode: item.transactionCode,
              inforRentalVehicle: rentalInfo,
              statusOrder: item.rentalInfo.statusOrder,
            }
          }),
        )
        setData(updatedData)
      } catch (error) {
        console.error('Error fetching rental info:', error)
      }
    }
    fetchRentalInfo()
  }, [listOrder])

  return (
    <div className="container">
      <Row className="mt-4 justify-content-center align-items-center">
        <div className={cx('header', 'd-flex')}>
          <p className={cx('justify-content-center', 'txt-header')}>Danh sách đơn thuê hiện có</p>
        </div>
      </Row>
      <Row>
        <TxtSearch content={'Tìm kiếm người đặt...'}></TxtSearch>
      </Row>
      <div className="mb-4 mt-4"></div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
        // pagination={false}
        scroll={{ x: 'max-content', y: 500 }}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        rowClassName="table-row-center" // Thêm class để căn giữa dọc
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        className={cx('')}
      />
      <div className="mb-5 mt-5"></div>
      <ModalDetailOrderRental
        show={modalDetailShow}
        transactionCode={transactionCode}
        inforRentalVehicle={inforRentalVehicle}
        onHide={() => setModalDetailShow(false)}
      />
    </div>
  )
}
export default OrderManage
