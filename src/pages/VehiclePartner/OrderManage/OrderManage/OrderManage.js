import classNames from 'classnames/bind'
import styles from './OrderManage.module.scss'
import { Table } from 'antd'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faMessage } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import TxtSearch from '~/components/TxtSearch'
import ModalDetailOrderRental from '~/components/ModalDetailOrderRental'
import { useState } from 'react'
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
      width: 190,
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
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Loại xe',
      dataIndex: 'typeVehicle',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 130,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'location',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 130,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Số lượng thuê',
      dataIndex: 'number',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 130,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'charge',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 100,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Chi tiết',
      dataIndex: 'view',
      align: 'center',
      width: 70,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewDetail(record.key)}
        />
      ),
    },
    {
      title: 'Đã trả xe',
      dataIndex: 'update',
      align: 'center',
      width: 70,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faSquare}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          //   onClick={() => handleEditBus(record.key)}
        />
      ),
    },
    {
      title: 'Nhắn tin',
      dataIndex: 'delete',
      align: 'center',
      width: 70,
      render: (record) => (
        <FontAwesomeIcon icon={faMessage} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      ),
    },
  ]
  const data = [
    {
      key: '1',
      typeVehicle: 'Ô tô 16 chỗ',
      number: '10',
      charge: '1.000.000đ',
      location: 'Quảng Nam',
      nameRental: 'Nguyễn Trần Như Ngọc',
      numberphone: '0842593668',
      timeRental: '12:00, 12/12/2024',
    },
    {
      key: '2',
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '1.000.000đ',
      location: 'Quảng Nam',
      nameRental: 'Nguyễn Trần Như Ngọc',
      numberphone: '0842593668',
      timeRental: '12:00, 12/12/2024',
    },
    {
      key: '3',
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '1.000.000đ',
      location: 'Quảng Nam',
      nameRental: 'Nguyễn Trần Như Ngọc',
      numberphone: '0842593668',
      timeRental: '12:00, 12/12/2024',
    },
    {
      key: '5',
      nameCompany: 'Honda',
      typeVehicle: 'Xe máy',
      number: '10',
      charge: '1.000.000đ',
      location: 'Quảng Nam',
      nameRental: 'Nguyễn Trần Như Ngọc',
      numberphone: '0842593668',
      timeRental: '12:00, 12/12/2024',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [modalDetailShow, setModalDetailShow] = useState(false)
  const handleViewDetail = (id) => {
    setModalDetailShow(true)
  }
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
        scroll={{x:'auto', y: 500 }}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        rowClassName="table-row-center" // Thêm class để căn giữa dọc
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        className={cx('')}
      />
      <div className="mb-5 mt-5"></div>
      <ModalDetailOrderRental show={modalDetailShow} onHide={() => setModalDetailShow(false)} />
    </div>
  )
}
export default OrderManage
