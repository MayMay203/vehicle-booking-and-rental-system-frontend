import classNames from "classnames/bind"
import styles from './TableListTenant.module.scss'
import { Table } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage } from "@fortawesome/free-solid-svg-icons"
const cx = classNames.bind(styles)
function TableListTenant(){
    const columns = [
      {
        title: 'STT',
        dataIndex: '',
        align: 'center',
        width: 70,
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Họ tên',
        dataIndex: 'name',
        align: 'center',
        width: 300,
        showSorterTooltip: {
          target: 'full-header',
        },
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'numberphone',
        align: 'center',
        defaultSortOrder: 'descend',
        width: 150,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Đặt lúc',
        dataIndex: 'orderAt',
        align: 'center',
        defaultSortOrder: 'descend',
        width: 150,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Số xe thuê',
        dataIndex: 'numberVehicle',
        align: 'center',
        defaultSortOrder: 'descend',
        width: 100,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'totalCharge',
        align: 'center',
        defaultSortOrder: 'descend',
        width: 150,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Hủy lúc',
        dataIndex: 'cancelAt',
        align: 'center',
        defaultSortOrder: 'descend',
        width: 150,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Nhắn tin',
        dataIndex: 'chat',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <FontAwesomeIcon
            icon={faMessage}
            style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
            onClick={() => handleChat(record.key)}
          />
        ),
      },
    ]
  const handleChat = () => {

  }
  
  const data = [
    {
      key: '1',
      name: 'Nguyễn Văn Đức',
      numberphone: '0842005668',
      orderAt: '12h, 12/11/2024',
      numberVehicle: '4',
      totalCharge: '1.200.00đ',
      cancelAt: '12h, 12/11/2024',
      chat: '',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
        pagination={false}
        scroll={{ x:'auto',y: 500 }}
        // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        rowClassName="table-row-center" // Thêm class để căn giữa dọc
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        className={cx('')}
      />
    )
}
export default TableListTenant