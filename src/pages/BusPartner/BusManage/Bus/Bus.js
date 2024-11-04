import classNames from 'classnames/bind'
import styles from './Bus.module.scss'
import { Table } from 'antd'
import TxtSearch from '~/components/TxtSearch'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)
function Bus() {
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
      width: 400,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      align: 'center',
      width: 200,
      render: (text, record) => (
        <Image
          rounded
          src={record.image}
          alt="Ảnh"
          style={{ width: '16rem', height: '10rem', objectFit: 'cover', border: '1px solid #D9D9D9' }}
        />
      ),
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
      title: 'Xem',
      dataIndex: 'view',
      align: 'center',
      render: () => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
        />
      ),
    },
    {
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',

      render: () => <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }} />,
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      align: 'center',
      render: () => (
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      ),
    },
  ]
  
  const data = [
    {
      key: '1',
      licensePlateNumber: '30G-49344',
      typeVehicle: 'Limounsine 34 chỗ',
      image: 'https://limody.vn/wp-content/uploads/2020/05/xe-di-bac-kan-5.png',
      view: '',
    },
    {
      key: '2',
      licensePlateNumber: '40G-49344',
      typeVehicle: 'Limounsine 34 chỗ',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9Bjixv9pTmcH-o0hi6OIpTEXB2T1VbhvwhfRcD_r9E3OD-MiAtMQYxC7QXDOYnSWC7A&usqp=CAU',
      view: '',
    },
    {
      key: '3',
      licensePlateNumber: '50G-49344',
      typeVehicle: 'Limounsine 34 chỗ',
      image: 'https://limosine.vn/wp-content/uploads/2021/11/xe-quyen-quang-ha-noi-2.jpg',
      view: '',
    },
    {
      key: '5',
      licensePlateNumber: '60G-49344',
      typeVehicle: 'Limounsine 34 chỗ',
      image: 'https://datvere24h.com/partner/nha-xe-phu-loc/1724401439nh%C3%A0%20xe%20ph%C3%BA%20l%E1%BB%99c.jpg',
      view: '',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const navigate = useNavigate()
  const handleAddBus = () => {
    navigate('add-bus')
  }
  return (
    <div className="container mt-4 mb-5">
      <div className={cx('header')}>
        <p>Danh sách xe khách</p>
      </div>
      <div className={cx('d-flex', 'mb-4')}>
        <TxtSearch content={'Tìm xe khách'}></TxtSearch>
        <Button primary className={cx('btn-add')} onClick={handleAddBus}>
          Thêm xe
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
        pagination={false}
        scroll={{y: 500 }}
        // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        rowClassName="table-row-center" // Thêm class để căn giữa dọc
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
    </div>
  )
}
export default Bus
