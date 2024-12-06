import classNames from 'classnames'
import styles from './TableSchedulesOfBus.module.scss'
import { Table } from 'antd'
import { useState } from 'react'
import ModalBusInfor from '~/pages/BusPartner/BusManage/ModalBusInfor'
const cx = classNames.bind(styles)
function TableSchedulesOfBus({ handleUpdateSchedule }) {
  const [isHovered, setIsHovered] = useState(null)
  const [modalBusInforShow, setModalBusInforShow] = useState(false)
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
            onClick={() => setModalBusInforShow(true)}
          >
            Chi tiết
          </p>
        </div>
      ),
    },
  ]
  const data = [
    {
      key: '1',
      timeDepart: '12:00',
      timeDesti: '15:00',
      dateStart: '20/10/2022',
      departure: 'Đà Nẵng',
      destination: 'TP.Hồ Chí Minh',
    },
    {
      key: '2',
      timeDepart: '14:00',
      timeDesti: '15:00',
      dateStart: '20/10/2022',
      departure: 'Đà Nẵng',
      destination: 'TP.Hồ Chí Minh',
    },
    {
      key: '3',
      timeDepart: '12:00',
      timeDesti: '15:00',
      dateStart: '20/11/2022',
      departure: 'Đà Nẵng',
      destination: 'TP.Hồ Chí Minh',
    },
    {
      key: '5',
      timeDepart: '12:00',
      timeDesti: '15:00',
      dateStart: '20/12/2022',
      departure: 'Đà Nẵng',
      destination: 'TP.Hồ Chí Minh',
    },
  ]
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
      <ModalBusInfor enableEdit={false} show={modalBusInforShow} onHide={() => setModalBusInforShow(false)} />
    </>
  )
}
export default TableSchedulesOfBus
