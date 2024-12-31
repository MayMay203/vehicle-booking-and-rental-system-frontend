import classNames from 'classnames'
import styles from './TableVehiclesOfBusTrip.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import ModalBusInfor from '~/pages/BusPartner/BusManage/ModalBusInfor'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllBuses } from '~/redux/slices/busPartnerSlice'
import { detailBusByID } from '~/apiServices/busPartner/detailBusByID'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import { checkScheduleHasOrder } from '~/apiServices/busPartner/checkScheduleHasOrder'
import { toast } from 'react-toastify'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
const cx = classNames.bind(styles)
function TableVehiclesOfBusTrip({ handleUpdateSchedule, dataTable, date, idBusTrip }) {
  const [isHovered, setIsHovered] = useState(null)
  const [modalBusInforShow, setModalBusInforShow] = useState(false)
  const listBuses = useSelector((state) => state.busPartner.busList)
  const [selectedBus, setSelectedBus] = useState({ id: '', licensePlateNumber: '' })
  const [data, setData] = useState([])
  const [dataInforBus, setDataInforBus] = useState({})
  const dispatch = useDispatch()
  console.log('dataTable bên con:', dataTable)
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlateNumber',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 120,
      render: (licensePlateNumber, record) => (
        <div>
          <div>{licensePlateNumber}</div>
          <p
            style={{
              color: isHovered === record.key ? '#2474E5' : 'rgba(36, 116, 229, 0.5)',
              cursor: 'pointer',
              margin: 0,
              fontStyle: 'italic',
              textDecoration: isHovered === record.key ? 'underline' : '',
            }}
            onMouseEnter={() => setIsHovered(record.key)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => {
              setModalBusInforShow(true)
              setSelectedBus((prev) => ({
                ...prev,
                licensePlateNumber: licensePlateNumber,
              }))
            }}
          >
            Chi tiết
          </p>
        </div>
      ),
      // sorter: (a, b) => a.age - b.age,
    },

    {
      title: 'Loại xe',
      dataIndex: 'busType',
      align: 'center',
      width: 150,
      showSorterTooltip: {
        target: 'full-header',
      },
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'timeDeparture',
      align: 'center',
      width: 100,
      sorter: (a, b) => {
        const convertToMinutes = (time) => {
          const [hours, minutes] = time.split(':').map(Number)
          return hours * 60 + minutes
        }
        return convertToMinutes(a.timeDeparture) - convertToMinutes(b.timeDeparture)
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 120,
      render: (status) => (
        <span
          style={{
            color: status === 'Hoạt động' ? '#008000' : '#E20D0D',
          }}
        >
          {status}
        </span>
      ),
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 90,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tổng vé',
      dataIndex: 'totalSeat',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 110,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Còn trống',
      dataIndex: 'available',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 110,
      // sorter: (a, b) => a.age - b.age,
    },
    // {
    //   title: 'Xem',
    //   dataIndex: 'view',
    //   align: 'center',
    //   render: (text, record) => (
    //     <FontAwesomeIcon
    //       icon={faArrowUpRightFromSquare}
    //       style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
    //       onClick={() => handleViewBus(record.key)}
    //     />
    //   ),
    // },

    {
      title: 'Hủy vé',
      dataIndex: 'delete',
      align: 'center',
      width: 90,
      render: (text, record) => {
        const isDisabled = date <= new Date() // So sánh ngày

        return (
          <FontAwesomeIcon
            icon={faTrash}
            style={{
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              color: isDisabled ? '#D5420C80' : '#D5420C',
              fontSize: '2rem',
              opacity: isDisabled ? 0.5 : 1,
            }}
            onClick={() => !isDisabled && handleCancelScheduleOneDay(record.key)}
          />
        )
      },
    },
  ]
  // const getInforBusSchedule = async(id) => {
  //   if(dispatch(checkLoginSession())){

  //   }
  // }
  
  const handleCancelScheduleOneDay = async (id) => {
    if (dispatch(checkLoginSession())) {
      try {
        console.log('id Schedule iss:', id)
        // const response = await cancelScheduleOneDay(id, dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'))
        const response = await checkScheduleHasOrder(id)
        if (response.info.includes('has orders')) {
          console.log('vô')
          dispatch(
            setConfirmModalVisible({
              name: generalModalNames.DEL_BUS_TRIP_SCHEDULE_ONE_DAY,
              title: 'Xác nhận xoá vé xe',
              description:
                'Bạn có chắc chắn xoá vé xe này? Hiện vé xe đang có đơn đặt, nếu bạn đồng ý xóa chúng tôi sẽ hủy toàn bộ những đơn hàng đó.',
              isOpen: true,
              modalType: 'confirm',
              id,
              date,
              idBusTrip,
            }),
          )
        } else if (response.info.includes("hasn't orders")) {
          dispatch(
            setConfirmModalVisible({
              name: generalModalNames.DEL_BUS_TRIP_SCHEDULE_ONE_DAY,
              title: 'Xác nhận xoá vé xe',
              description: 'Bạn có chắc chắn xoá vé xe này?',
              isOpen: true,
              modalType: 'confirm',
              id,
              date,
              idBusTrip,
            }),
          )
        } else {
          toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!', { autoClose: 2000, position: 'top-center' })
          console.log('--response:', response)
        }
      } catch (error) {}
    }
  }
  // const data = [
  //   {
  //     key: '1',
  //     licensePlateNumber: '92H-12356',
  //     nameCompany: 'Honda',
  //     busType: 'Xe máy',
  //     status: 'Đang hoạt động',
  //     timeDeparture: '5:00; 10:00; 15:00',
  //     price: '100.000đ',
  //     discount: '10%',
  //     available: '12/37',
  //     rating: '3/5',
  //     location: 'Quảng Nam',
  //   },
  // ]
  const getInforBusByID = async () => {
    const response = await detailBusByID(selectedBus.id)
    setDataInforBus(response)
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllBuses())
    }
  }, [dispatch])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      // dispatch(busByID({ id: selectedIDBus }))
      if (modalBusInforShow === true) {
        getInforBusByID()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBus.id])
  useEffect(() => {
    const matchedBus = listBuses.find((item) => item.licensePlate === selectedBus.licensePlateNumber)
    if (matchedBus) {
      setSelectedBus((prev) => ({
        ...prev,
        id: matchedBus.busId,
      }))
    }
  }, [listBuses, selectedBus.licensePlateNumber])
  // console.log('bieenr so xe: selectedBus--', selectedBus)
  useEffect(() => {
    const transformedData = dataTable.map((item) => ({
      key: item.busTripSchedule,
      licensePlateNumber: item.busInfo.licensePlate,
      busType: item.busInfo.busType.name,
      status: item.status,
      timeDeparture: item.departureTime,
      discount: item.discountPercentage,
      totalSeat: item?.busInfo?.busType?.numberOfSeat,
      available: item.availableSeats,
      rating: item.ratingValue,
    }))
    setData(transformedData)
  }, [dataTable])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  // const navigate = useNavigate()
  // const handleViewBus = (id) => {
  //   navigate('detail-service-rental', { state: { enableEdit: false, busID: id } })
  // }
  // const handleEditBus = (id) => {
  //   navigate('edit-service-rental', { state: { enableEdit: true, busID: id } })
  // }
  return (
    <>
      <ConfigProvider locale={viVN}>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          bordered
          pagination={false}
          scroll={{ x: 'auto', y: 500 }}
          // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
          rowClassName="table-row-center" // Thêm class để căn giữa dọc
          showSorterTooltip={{
            target: 'sorter-icon',
          }}
          className={cx('')}
        />
      </ConfigProvider>

      <ModalBusInfor
        enableEdit={false}
        show={modalBusInforShow}
        selectedBus={dataInforBus}
        onHide={() => setModalBusInforShow(false)}
      />
    </>
  )
}
export default TableVehiclesOfBusTrip
