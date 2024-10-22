import { useMemo, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import Tabs from '~/components/Tabs'
import TicketList from '~/components/TicketList'
import { config } from '~/config'
import classNames from 'classnames/bind'
import styles from './OrderManagement.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
function OrderManagement() {
  const [status, setStatus] = useState('current')
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
      <TicketList status={status}></TicketList>
      <Button roundHalf className={cx('btn-more')}>
        Xem thêm
      </Button>
    </div>
  )
}

export default OrderManagement
