import classNames from 'classnames'
import styles from './TableVehiclesOfBusTrip.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { useState } from 'react'
import ModalBusInfor from '~/pages/BusPartner/BusManage/ModalBusInfor'
const cx = classNames.bind(styles)
function TableVehiclesOfBusTrip() {
  const [isHovered, setIsHovered] = useState(null)
  const [modalBusInforShow, setModalBusInforShow] = useState(false)
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
            onClick={() => setModalBusInforShow(true)}
          >
            Chi tiết
          </p>
        </div>
      ),
      // sorter: (a, b) => a.age - b.age,
    },

    {
      title: 'Loại xe',
      dataIndex: 'vehicleType',
      align: 'center',
      width: 150,
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Hãng xe',
      dataIndex: 'nameCompany',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 120,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'timeDeparture',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 100,
      // sorter: (a, b) => a.age - b.age,
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
            color: status === 'Đang hoạt động' ? '#008000' : '#E20D0D',
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
      title: 'Giá vé',
      dataIndex: 'price',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 110,
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
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',

      render: (text, record) => (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          onClick={() => handleEditBus(record.key)}
        />
      ),
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      align: 'center',
      render: (record) => (
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      ),
    },
  ]
  const data = [
    {
      key: '1',
      licensePlateNumber: '92H-12356',
      nameCompany: 'Honda',
      vehicleType: 'Xe máy',
      status: 'Đang hoạt động',
      timeDeparture: '5:00; 10:00; 15:00',
      price: '100.000đ',
      discount: '10%',
      available: '12/37',
      rating: '3/5',
      location: 'Quảng Nam',
    },
    {
      key: '2',
      licensePlateNumber: '72H-12356',
      nameCompany: 'Honda',
      vehicleType: 'Xe máy',
      status: 'Đang hoạt động',
      timeDeparture: '5:00',
      price: '100.000đ',
      discount: '10%',
      available: '12/37',
      rating: '3/5',
      location: 'Quảng Nam',
    },
    {
      key: '3',
      licensePlateNumber: '30H-12356',
      nameCompany: 'Honda',
      vehicleType: 'Xe máy',
      status: 'Đang hoạt động',
      timeDeparture: '5:00',
      price: '100.000đ',
      discount: '10%',
      available: '12/37',
      rating: '3/5',
      location: 'Quảng Nam',
    },
    {
      key: '5',
      licensePlateNumber: '42H-12356',
      nameCompany: 'Honda',
      vehicleType: 'Xe máy',
      status: 'Đang hoạt động',
      timeDeparture: '5:00',
      price: '100.000đ',
      discount: '10%',
      available: '12/37',
      rating: '3/5',
      location: 'Quảng Nam',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const navigate = useNavigate()
  // const handleViewBus = (id) => {
  //   navigate('detail-service-rental', { state: { enableEdit: false, busID: id } })
  // }
  const handleEditBus = (id) => {
    navigate('edit-service-rental', { state: { enableEdit: true, busID: id } })
  }
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
export default TableVehiclesOfBusTrip
