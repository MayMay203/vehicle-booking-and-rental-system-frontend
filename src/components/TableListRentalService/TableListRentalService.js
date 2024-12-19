import classNames from 'classnames'
import styles from './TableListRentalService.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllVehicle } from '~/redux/slices/rentalPartnerSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
const cx = classNames.bind(styles)
function TableListRentalService({ typeService }) {
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Hãng xe',
      dataIndex: 'nameCompany',
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
      width: 120,
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
      width: 230,
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
      width: 90,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewVehicle(record.key)}
        />
      ),
    },
    {
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',
      width: 90,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          onClick={() => handleEditVehicle(record.key)}
        />
      ),
    },
    {
      title: 'Xóa',
      width: 90,
      dataIndex: 'delete',
      align: 'center',
      render: (record) => (
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      ),
    },
  ]
  // const data = [
  //   {
  //     key: '1',
  //     nameCompany: 'Honda',
  //     typeVehicle: 'Xe máy',
  //     number: '10',
  //     charge: '100.000đ',
  //     location: 'Quảng Nam',
  //     status: 'Hoạt động',
  //   },

  // ]
  const dispatch = useDispatch()
  const vehicleList = useSelector((state) => state.rentalPartner.vehicleList)
  const [data, setData] = useState([])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const navigate = useNavigate()
  const handleViewVehicle = (id) => {
    navigate('detail-service-rental', { state: { enableEdit: false, vehicleID: id } })
  }
  const handleEditVehicle = (id) => {
    navigate('edit-service-rental', { state: { enableEdit: true, vehicleID: id } })
  }
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      dispatch(fetchAllVehicle({ typeService: typeService?.toString(), status: 'available' }))
    }
  }, [dispatch, typeService])
  useEffect(() => {
    if (dispatch(checkLoginSession())) {
      try {
        const newData = vehicleList?.map((item) => ({
          key: item.id,
          nameCompany: item.manufacturer,
          typeVehicle: item.vehicle_type,
          number: item.quantity,
          charge: item.price,
          location: item.location,
          status: 'Hoạt động',
        }))
        setData(newData)
        console.log('newData:', newData)
      } catch (message) {
        console.log(message)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleList])
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      bordered
      // pagination={false}
      scroll={{ x: 'auto', y: 500 }}
      pagination={{ position: ['bottomCenter'], pageSize: 6 }}
      rowClassName="table-row-center"
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
      className={cx('')}
    />
  )
}
export default TableListRentalService
