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
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'
import { FilterIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function OrderManagement() {
  const [status, setStatus] = useState('current')
  const [currentPage, setCurrentPage] = useState(1)
  const myTicketOrders = useSelector((state) => state.orders.myTicketOrders)
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [filterType, setfilterType] = useState('ticketOrder')

  useEffect(() => {
    async function fetchAllTicketList() {
      if (dispatch(checkLoginSession())) {
        if (status === 'canceled') {
          if (filterType === 'ticketOrder') {
            dispatch(
              fetchAllMyTicketOrders({
                isGone: false,
                isCanceled: 1,
              }),
            )
          }
        } else {
          if (filterType === 'ticketOrder') {
            dispatch(
              fetchAllMyTicketOrders({
                isGone: status === 'completed',
                isCanceled: 0,
              }),
            )
          }
        }
      }
    }
    fetchAllTicketList()
  }, [status, dispatch, filterType])

  useEffect(() => {
    async function fetchAllTicketList() {
      if (dispatch(checkLoginSession())) {
        if (status === 'canceled') {
          if (filterType === 'ticketOrder') {
            console.log('Vô cái huỷ')
            dispatch(
              fetchAllMyTicketOrders({
                isCanceled: 1,
                page: currentPage,
              }),
            )
          }
        } else {
          if (filterType === 'ticketOrder') {
            dispatch(
              fetchAllMyTicketOrders({
                isCanceled: 0,
                page: currentPage,
                isGone: status === 'completed',
              }),
            )
          }
        }
      }
    }
    fetchAllTicketList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

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
    console.log(type)
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
      <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'mt-5', 'container')}>
        <h1 className={cx('title')} style={{ fontSize: '2.4rem', fontWeight: '500', paddingLeft: '4px' }}>
          {filterType === 'ticketOrder' ? 'ĐƠN VÉ XE' : filterType === 'carRentalOrder' ? 'ĐƠN THUÊ XE' : 'ĐƠN ĐẶT XE'}
        </h1>
        <Tippy
          visible={isVisible}
          interactive
          delay={[100, 700]}
          placement="bottom-end"
          onClickOutside={() => setIsVisible(false)}
          render={(attrs) => (
            <div className={cx('filter')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <PopperItem id="1" title="Đơn vé xe" onClick={() => setfilterType('ticketOrder')} />
                <PopperItem id="2" title="Đơn thuê xe" onClick={() => setfilterType('carRentalOrder')} />
                <PopperItem id="3" title="Đơn đặt xe" onClick={() => setfilterType('carBookingOrder')} />
              </PopperWrapper>
            </div>
          )}
        >
          <button onClick={() => setIsVisible((prev) => !prev)}>
            <FilterIcon />
          </button>
        </Tippy>
      </div>
      <Tabs tabList={tabList} settings={settings} type={status} handleClickTab={handleClickTab}></Tabs>
      {myTicketOrders.result?.length > 0 && <TicketList status={status} dataList={myTicketOrders.result} />}
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
      {myTicketOrders.result?.length === 0 && (
        <Empty style={{ marginTop: '70px' }} description="Không có đơn hàng nào" />
      )}
    </div>
  )
}

export default OrderManagement
