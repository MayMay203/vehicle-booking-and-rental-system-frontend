import classNames from 'classnames'
import styles from './TableListRentalService.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllVehicle } from '~/redux/slices/rentalPartnerSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'
import viVN from 'antd/lib/locale/vi_VN'
import 'moment/locale/vi'
import EditServiceRental from '~/pages/VehiclePartner/ServiceManage/EditServiceRental'
const cx = classNames.bind(styles)
function TableListRentalService({ typeService }) {
  const [modalEditService, setModalEditService] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState('')
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
      width: 130,
      showSorterTooltip: {
        target: 'full-header',
      },
      sorter: (a, b) => a.nameCompany.localeCompare(b.nameCompany),
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
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
    ...(typeService === 2 || typeService === 0
      ? [
          {
            title: 'Giá cho thuê tự lái',
            dataIndex: 'selfDriverPrice',
            align: 'center',
            defaultSortOrder: 'descend',
            width: 160,
          },
        ]
      : []),
    ...(typeService === 2 || typeService === 1
      ? [
          {
            title: 'Giá cho thuê có người lái',
            dataIndex: 'driverPrice',
            align: 'center',
            defaultSortOrder: 'descend',
            width: 160,
            // sorter: (a, b) => a.age - b.age,
          },
        ]
      : []),

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
      width: 120,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Xem',
      dataIndex: 'view',
      align: 'center',
      width: 80,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewVehicle(record)}
        />
      ),
    },
    {
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',
      width: 80,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          onClick={() => handleEditVehicle(record.key)}
        />
      ),
    },
    // {
    //   title: 'Xóa',
    //   width: 90,
    //   dataIndex: 'delete',
    //   align: 'center',
    //   render: (record) => (
    //     <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
    //   ),
    // },
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
  // const handleViewVehicle = (inforVehicle) => {
  //   console.log('inforVehicle cha---', inforVehicle)
  //   navigate('detail-service-rental', { state: { enableEdit: false, inforVehicle: inforVehicle } })
  // }
  // const [inforVehicle, setInforVehicle] = useState({})
  const handleViewVehicle = (record) => {
    const selectedVehicle = vehicleList.find((item) => item.vehicle_register_id === record.key)
    if (selectedVehicle) {
      // setInforVehicle(selectedVehicle)
      console.log('selectedVehicle cha---', selectedVehicle)
      navigate('detail-service-rental', { state: { enableEdit: false, inforVehicle: selectedVehicle } })
    }
  }

  const handleEditVehicle = (id) => {
    // navigate('edit-service-rental', { state: { enableEdit: true, vehicleID: id } })
    setModalEditService(true)
    setSelectedVehicle(id)
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
          key: item.vehicle_register_id,
          nameCompany: item.manufacturer,
          typeVehicle: item.vehicle_type,
          number: item.quantity,
          selfDriverPrice: item.selfDriverPrice === 0 ? '_' : item.selfDriverPrice,
          driverPrice: item.driverPrice === 0 ? '_' : item.driverPrice,
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
    <ConfigProvider locale={viVN}>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
        // pagination={false}
        scroll={{ x: 'max-content', y: 500 }}
        pagination={{ position: ['bottomCenter'], pageSize: 6 }}
        rowClassName="table-row-center"
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        className={cx('')}
      />
      <EditServiceRental
        // enableEdit={true}
        // functionModal={'EditServiceRental'}
        idRegister={selectedVehicle}
        show={modalEditService}
        onHide={() => setModalEditService(false)}
      ></EditServiceRental>
    </ConfigProvider>
  )
}
export default TableListRentalService
