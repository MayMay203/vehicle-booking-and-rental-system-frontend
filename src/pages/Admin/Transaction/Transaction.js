import classNames from 'classnames/bind'
import styles from './Transaction.module.scss'
import { config } from '~/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faCar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import React, { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table } from 'antd'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'
import { getRevenueByPartnerType } from '~/apiServices/adminStatistic/getRevenueByPartnerType'
const cx = classNames.bind(styles)
function Transaction() {
  const [type, setType] = useState(config.constants.busPartner)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState([])

  console.log(selectedDate.getUTCMonth())
  console.log(selectedDate.getUTCFullYear())

  useEffect(() => {
    async function fetchData() {
      const dataRes = await getRevenueByPartnerType(selectedDate.getMonth() + 1, selectedDate.getFullYear(), type)
      console.log(dataRes)
      if (dataRes?.result) {
        setData(dataRes?.result)
      }
    }
    fetchData()
  }, [selectedDate, type])

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
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
      title: 'Tên đối tác',
      dataIndex: 'businessName',
      key: 'businessName',
      ...getColumnSearchProps('businessName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'bankName',
      key: 'bankName',
      ...getColumnSearchProps('bankName'),
    },
    {
      title: 'Tổng tiền (VNĐ)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (a, _) => {
        return a.replaceAll('.', ',').replace('VND', '')
      },
      sorter: (a, b) => {
        const numA = Number(a.revenue.replace(/\./g, '').replace(',', '.').replace('VND', '').trim())
        const numB = Number(b.revenue.replace(/\./g, '').replace(',', '.').replace('VND', '').trim())
        return numA - numB
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Chi tiết giao dịch',
      //  _ : giá trị cột hiện tại, b: dòng dữ liệu
      render: (_, b) => (
        <Link
          to={`/detail-transaction/${b.businessPartnerId}`}
          style={{ textDecoration: 'underline', color: 'var(--primary-color)' }}
        >
          Xem chi tiết
        </Link>
      ),
    },
  ]

  return (
    <div className={cx('wrapper')}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-5">
        <div className="d-flex gap-3 gap-md-4 gap-lg-5 flex-wrap">
          <button
            className={cx('btn-type', { active: type === config.constants.busPartner })}
            onClick={() => setType(config.constants.busPartner)}
          >
            <FontAwesomeIcon icon={faBus} className="me-2"></FontAwesomeIcon>
            Đối tác nhà xe
          </button>
          <button
            className={cx('btn-type', { active: type === config.constants.carRentalPartner })}
            onClick={() => setType(config.constants.carRentalPartner)}
          >
            <FontAwesomeIcon icon={faCar} className="me-2"></FontAwesomeIcon>
            Đối tác cho thuê xe
          </button>
        </div>
        <div className="month-year-wrapper">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="Select time"
          />
          <span className="calendar-icon">📅</span>
        </div>
      </div>
      <div className="mt-5">
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

export default Transaction
