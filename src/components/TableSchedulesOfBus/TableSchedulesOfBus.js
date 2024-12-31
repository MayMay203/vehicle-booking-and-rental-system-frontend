import classNames from 'classnames'
import styles from './TableSchedulesOfBus.module.scss'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import ModalBusInfor from '~/pages/BusPartner/BusManage/ModalBusInfor'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchAllSchedulesByBusID } from '~/redux/slices/busPartnerSlice'
import { getAllBreakDaysOfBusSchedule } from '~/apiServices/busPartner/getAllBreakDaysOfBusSchedule'
import dayjs from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs'
import { ConfigProvider } from 'antd'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker
const cx = classNames.bind(styles)
function TableSchedulesOfBus({ handleUpdateSchedule, idBus }) {
  const [modalBusInforShow, setModalBusInforShow] = useState(false)
  const dispatch = useDispatch()
  const listSchedules = useSelector((state) => state.busPartner.scheduleListByBusID)
  const [isHovered, setIsHovered] = useState(null)
  const [breakDays, setBreakDays] = useState([]) // Danh sách ngày nghỉ từ API
  const [openPicker, setOpenPicker] = useState(false) // Điều khiển mở DatePicker
  const [selectedSchedule, setSelectedSchedule] = useState('')
  const [selectedDays, setSelectedDays] = useState([]) // Lưu các ngày được chọn
  const [data, setData] = useState([])

  // Gọi API lấy ngày nghỉ khi component load
  useEffect(() => {
    const fetchBreakDays = async () => {
     if(dispatch(checkLoginSession())){
      if(selectedSchedule){
         const response = await getAllBreakDaysOfBusSchedule(selectedSchedule)
         if (response) {
           const mappedDays = response.map((item) => ({
             start: dayjs(item.startDay, 'DD-MM-YYYY'),
             end: dayjs(item.endDay, 'DD-MM-YYYY'),
           }))
           setBreakDays(mappedDays)
         }
      }
     }
    }
    fetchBreakDays()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule])

  // // Hàm disable các ngày nghỉ
  // const disabledDate = (current) => {
  //   return breakDays.some(({ start, end }) => {
  //     return current.isBetween(start, end, 'day', '[]')
  //   })
  // }
// const disabledDate = (current) => {
//   const currentDay = dayjs(current) // Chuyển current sang dayjs


//   // Chỉ cho phép chọn nếu ngày nằm trong khoảng nghỉ
//   const isInBreak = breakDays.some(({ start, end }) => {
//     return currentDay.isBetween(start, end, 'day', '[]') // Kiểm tra ngày trong khoảng
//   })

//   return !isInBreak // Chỉ cho phép chọn ngày nghỉ
// }
const handleDetailClick = (id) => {
  setSelectedSchedule(id)
  setOpenPicker(true)
}

const disabledDate = (current) => {
  const currentDay = dayjs(current)
  return !breakDays.some(({ start, end }) => currentDay.isBetween(start, end, 'day', '[]'))
}




  // // Xử lý khi click vào "Chi tiết"
  // const handleDetailClick = (id) => {
  //   setOpenPicker(true)
  //   setSelectedSchedule(id)
  // }

  // Xử lý khi chọn ngày
  const handleDateChange = (dates) => {
    setSelectedDays(dates)
    setOpenPicker(false) // Đóng DatePicker sau khi chọn
  }
  const columns = [
    {
      title: 'Giờ xuất phát',
      dataIndex: 'timeDepart',
      align: 'center',
      width: 130,
    },
    {
      title: 'Giờ đến',
      dataIndex: 'timeDesti',
      align: 'center',
      width: 130,
    },

    {
      title: 'Ngày bắt đầu',
      dataIndex: 'dateStart',
      align: 'center',
      width: 150,
      showSorterTooltip: {
        target: 'full-header',
      },
    },
    {
      title: 'Địa điểm đi',
      dataIndex: 'departure',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 170,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Địa điểm đến',
      dataIndex: 'destination',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 170,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Ngày nghỉ',
      dataIndex: 'status',
      align: 'center',
      render: (text, record) => (
        <div>
          <p
            style={{
              color: isHovered === record.key ? '#2474E5' : 'rgba(36, 116, 229, 0.5)',
              cursor: 'pointer',
              textDecoration: isHovered === record.key ? 'underline' : '',
            }}
            onMouseEnter={() => setIsHovered(record.key)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => handleDetailClick(record.key)}
          >
            Chi tiết
          </p>
          {openPicker && selectedSchedule === record.key && (
            <RangePicker
              open={openPicker}
              onOpenChange={(open) => setOpenPicker(open)}
              disabledDate={disabledDate}
              onChange={handleDateChange}
              value={selectedDays}
              format="DD-MM-YYYY"
            />
          )}
        </div>
      ),
    },
  ]
  // const data = [
  //   {
  //     key: '1',
  //     timeDepart: '12:00',
  //     timeDesti: '15:00',
  //     dateStart: '20/10/2022',
  //     departure: 'Đà Nẵng',
  //     destination: 'TP.Hồ Chí Minh',
  //   },
  // ]


useEffect(() => {
  if (dispatch(checkLoginSession())) {
   if(idBus){
     dispatch(fetchAllSchedulesByBusID({ idBus: idBus }))
   } else { setData([])}
  }
}, [dispatch, idBus])

useEffect(() => {
  const transformedData = listSchedules.map((item) => ({
    key: item.busTripScheduleId,
    timeDepart: item.departureTime,
    timeDesti: item.arrivalTime,
    dateStart: item.startOperationDay,
    departure: item.departureLocation,
    destination: item.arrivalLocation,
  }))
  setData(transformedData)
}, [listSchedules])

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
      <ConfigProvider picker={dayjsGenerateConfig}>
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

      <ModalBusInfor enableEdit={false} show={modalBusInforShow} onHide={() => setModalBusInforShow(false)} />
    </>
  )
}
export default TableSchedulesOfBus
