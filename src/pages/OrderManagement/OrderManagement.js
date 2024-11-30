import { useEffect, useMemo, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import Tabs from '~/components/Tabs'
import TicketList from '~/components/TicketList'
import { config } from '~/config'
import classNames from 'classnames/bind'
import styles from './OrderManagement.module.scss'
import { getAllTicketOrders } from '~/apiServices/user/getAllTicketOrders'
import { Pagination } from 'antd'

const cx = classNames.bind(styles)
function OrderManagement() {
  const [status, setStatus] = useState('current')
  const [ticketList, setTicketList] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchAllTicketList() {
      const data = await getAllTicketOrders(status === 'completed')
      if (data) {
        setTicketList(data.result)
        setTotal(data.meta.total)
      }
    }
    fetchAllTicketList()
  }, [status])

  const settings = useMemo(
    () => ({
      slidesToShow: 3,
      infinite: false,
      swipe: false,
      draggable: false,
    }),
    [],
  )
  const tabList = useMemo(
    () => [
      {
        label: 'Hiện tại',
        value: 'current',
      },
      {
        label: 'Đã đi',
        value: 'completed',
      },
      {
        label: 'Đã huỷ',
        value: 'canceled',
      },
    ],
    [],
  )
  const handleClickTab = (type) => {
    setStatus(type)
  }
  return (
    <div className={cx('container', 'wrapper')}>
      <Breadcrumb>
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.order} active>
          Quản lý đơn hàng
        </Breadcrumb.Item>
      </Breadcrumb>
      <Tabs tabList={tabList} settings={settings} type={status} handleClickTab={handleClickTab}></Tabs>
      <TicketList status={status} dataList={ticketList}></TicketList>
      {ticketList.length > 0 && (
        <Pagination
          className="mt-5"
          align="center"
          current={currentPage}
          pageSize={config.variables.pagesize}
          total={total}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  )
}

export default OrderManagement
