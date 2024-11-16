import classNames from "classnames"
import styles from './TableListRentalService.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { Table } from "antd"
const cx = classNames.bind(styles)
function TableListRentalService({ typeService }) {
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Hãng xe',
      dataIndex: 'nameCompany',
      align: 'center',
      width: 200,
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
      title: 'Loại xe',
      dataIndex: 'typeVehicle',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số lượng',
      dataIndex: 'number',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Giá cho thuê',
      dataIndex: 'charge',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'location',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 150,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Xem',
      dataIndex: 'view',
      align: 'center',
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewBus(record.key)}
        />
      ),
    },
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
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '100.000đ',
      location: 'Quảng Nam',
      status: 'Hoạt động',
    },
    {
      key: '2',
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '100.000đ',
      location: 'Quảng Nam',
      status: 'Hoạt động',
    },
    {
      key: '3',
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '100.000đ',
      location: 'Quảng Nam',
      status: 'Hoạt động',
    },
    {
      key: '5',
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '100.000đ',
      location: 'Quảng Nam',
      status: 'Hoạt động',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const navigate = useNavigate()
  const handleViewBus = (id) => {
    navigate('detail-service-rental', { state: { enableEdit: false, busID: id } })
  }
  const handleEditBus = (id) => {
    navigate('edit-service-rental', { state: { enableEdit: true, busID: id } })
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
export default TableListRentalService