import { useEffect, useMemo, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import Tabs from '~/components/Tabs'
import TicketList from '~/components/TicketList'
import { config } from '~/config'
import classNames from 'classnames/bind'
import styles from './OrderManagement.module.scss'
import { Empty, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMyTicketOrders } from '~/redux/slices/orderSlice'
import { checkLoginSession } from '~/redux/slices/userSlice'

const cx = classNames.bind(styles)
function OrderManagement() {
  const [status, setStatus] = useState('current')
  const [currentPage, setCurrentPage] = useState(1)
  const myTicketOrders = useSelector((state) => state.orders.myTicketOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchAllTicketList() {
      if (dispatch(checkLoginSession())) {
        if (status === 'canceled') {
          dispatch(
            fetchAllMyTicketOrders({
              isGone: false,
              isCanceled: 1,
              page: currentPage,
            }),
          )
        } else {
          dispatch(
            fetchAllMyTicketOrders({
              isGone: status === 'completed',
              isCanceled: 0,
              page: currentPage,
            }),
          )
        }
      }
    }
    fetchAllTicketList()
  }, [status, dispatch, currentPage])

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
      {
        myTicketOrders.result?.length > 0 && (
          <TicketList status={status} dataList={myTicketOrders.result} />
        )
      }
      {myTicketOrders.result?.length > 0 && (
        <Pagination
          className="mt-5"
          align="center"
          current={currentPage}
          pageSize={config.variables.pagesize}
          total={myTicketOrders.meta?.total}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      {myTicketOrders.result?.length === 0 && <Empty style={{ marginTop: '70px' }} description="Không có đơn hàng nào" />}
    </div>
  )
}

export default OrderManagement
