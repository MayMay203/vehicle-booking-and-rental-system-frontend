import { useParams } from 'react-router-dom'
import styles from './DetailTransaction.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { getCustomerTransaction } from '~/apiServices/adminStatistic/getCustomerTransaction'
import DatePicker from 'react-datepicker'
import { Button, Input, Space, Table } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

const cx = classNames.bind(styles)
function DetailTransaction() {
  const partnerId = useParams()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    async function fetchData() {
      const dataRes = await getCustomerTransaction(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        partnerId.id,
      )
      if (dataRes?.result) {
        setData(dataRes?.result)
      }
    }
    fetchData()
  }, [selectedDate, partnerId.id])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100)
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })
  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps('customerName'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      ...getColumnSearchProps('customerPhoneNumber'),
    },
    {
      title: 'Tổng hoá đơn (VNĐ)',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (a, _) => {
        return a.replaceAll('.', ',').replace('VND', '')
      },
      sorter: (a, b) => {
        const numA = Number(a.totalPrice.replace(/\./g, '').replace(',', '.').replace('VND', '').trim())
        const numB = Number(b.totalPrice.replace(/\./g, '').replace(',', '.').replace('VND', '').trim())
        return numA - numB
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Thời gian thanh toán',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
  ]

  return (
    <div className={cx('wrapper')}>
      <h1
        className="mb-5"
        style={{
          color: 'var(--primary-color)',
          fontWeight: 600,
          fontSize: '2rem',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        CHI TIẾT GIAO DỊCH KHÁCH HÀNG CỦA MỖI ĐỐI TÁC
      </h1>
      <div className="month-year-wrapper d-flex justify-content-end">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          placeholderText="Select time"
        />
        <span className="calendar-icon">📅</span>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['bottomCenter'], pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  )
}
export default DetailTransaction
