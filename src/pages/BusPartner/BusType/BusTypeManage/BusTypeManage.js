import classNames from 'classnames/bind'
import styles from './BusTypeManage.module.scss'
import { Table } from 'antd'
import TxtSearch from '~/components/TxtSearch'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalManageBusType from '../ModalManageBusType'
import { useState } from 'react'
const cx = classNames.bind(styles)
function BusTypeManage() {
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
      width: 300,
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
      width: 200,
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
      render: (record) => (
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      ),
    },
  ]

  const data = [
    {
      key: '1',
      typeSeat: 'Giường nằm',
      typeVehicle: 'Limounsine',
      numberSeat: '16 chỗ',
    },
    {
      key: '2',
      typeSeat: 'Giường nằm',
      typeVehicle: 'Limounsine',
      numberSeat: '16 chỗ',
    },
    {
      key: '3',
      typeSeat: 'Giường nằm',
      typeVehicle: 'Limounsine',
      numberSeat: '16 chỗ',
    },
    {
      key: '5',
      typeSeat: 'Giường nằm',
      typeVehicle: 'Limounsine',
      numberSeat: '16 chỗ',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
   const handelAddBusType = () => {
     setShowModalAdd(true)
   }
   const handleEditBusType = () => {
     setShowModalUpdate(true)
   }
  return (
    <div className="container mt-4 mb-5">
      <div className={cx('header')}>{/* <p>Danh sách loại xe khách</p> */}</div>
      <div className={cx('d-flex', 'mb-4')}>
        <TxtSearch content={'Tìm xe khách'}></TxtSearch>
        <Button primary className={cx('btn-add')} onClick={handelAddBusType}>
          Thêm xe
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
        onHide={() => setShowModalAdd(false)}
      />
      <ModalManageBusType
        functionModal={'update'}
        enableEdit={true}
        show={showModalUpdate}
        onHide={() => setShowModalUpdate(false)}
      />
    </div>
  )
}
export default BusTypeManage
