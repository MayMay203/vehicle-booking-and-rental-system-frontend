import classNames from 'classnames/bind'
import styles from './BusTypeManage.module.scss'
import { Table } from 'antd'
import TxtSearch from '~/components/TxtSearch'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalManageBusType from '../ModalManageBusType'
import { useCallback, useEffect, useState } from 'react'
import { getAllBusTypes } from '~/apiServices/busPartner/getAllBusTypes'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { generalModalNames, setConfirmModalVisible } from '~/redux/slices/generalModalSlice'
const cx = classNames.bind(styles)
function BusTypeManage() {
  const dispatch = useDispatch()
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Loại xe',
      dataIndex: 'typeVehicle',
      align: 'center',
      width: 400,
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
      title: 'Loại ghế',
      dataIndex: 'typeSeat',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 250,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số chỗ',
      dataIndex: 'numberSeat',
      align: 'center',
      width: 200,
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',

      render: (text, record) => (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          onClick={() => handleEditBusType(record.key)}
        />
      ),
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      align: 'center',
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ]
  
  const handleDelete = (id) => {
    dispatch(
      setConfirmModalVisible({
        name: generalModalNames.UTILITY_MODAL,
        title: 'Xác nhận xoá loại xe',
        description: 'Bạn có chắc chắn xoá loại xe này?',
        isOpen: true,
        modalType: 'confirm',
        id,
      }),
    )
  }
  const [data, setData] = useState([])
  // Dùng useCallback để ghi nhớ hàm handleGetAllBusTypes
  const handleGetAllBusTypes = useCallback(async () => {
    if (dispatch(checkLoginSession())) {
      try {
        const allBusTypes = await getAllBusTypes()
        console.log('allBusTypes:', allBusTypes)
        const newData = allBusTypes?.result.map((item) => ({
          key: item.id,
          typeSeat: item.chairType,
          typeVehicle: item.name,
          numberSeat: `${item.numberOfSeat} chỗ`,
        }))
        setData(newData)
        console.log('newData:',newData)
      } catch (message) {
        console.log(message)
      }
    }
  }, [dispatch]) // Giới hạn dependency cho dispatch nếu cần thiết
  
  const closeModalAdd = () => {
    setShowModalAdd(false)
  }
  const closeModalUpdate = () => {
    setShowModalUpdate(false)
  }
  console.log('data:', data)
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [idSlectedBusType, setIDSlectedBusType] = useState(null)
  const handelAddBusType = () => {
    setShowModalAdd(true)
  }
  const handleEditBusType = (id) => {
    setShowModalUpdate(true)
    setIDSlectedBusType(id)
  }
  useEffect(() => {
    handleGetAllBusTypes()
  }, [handleGetAllBusTypes, showModalAdd, showModalUpdate])
  return (
    <div className="container mt-4 mb-5">
      <div className={cx('header')}>{/* <p>Danh sách loại xe khách</p> */}</div>
      <div className={cx('d-flex', 'mb-4')}>
        <TxtSearch content={'Tìm xe khách'}></TxtSearch>
        <Button primary className={cx('btn-add')} onClick={handelAddBusType}>
          Thêm loại xe
        </Button>
      </div>
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
      />
      <ModalManageBusType
        functionModal={'add'}
        enableEdit={true}
        show={showModalAdd}
        closeModal={closeModalAdd}
        onHide={() => setShowModalAdd(false)}
      />
      <ModalManageBusType
        functionModal={'update'}
        enableEdit={true}
        show={showModalUpdate}
        idBusType={idSlectedBusType}
        closeModal={closeModalUpdate}
        onHide={() => setShowModalUpdate(false)}
      />
    </div>
  )
}
export default BusTypeManage
