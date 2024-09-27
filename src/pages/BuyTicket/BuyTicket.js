import classNames from "classnames/bind";
import styles from './BuyTicket.module.scss'
import { Breadcrumb } from 'react-bootstrap'
import { config } from '~/config'
import Search from '~/components/Search'
import { FilterIcon } from '~/components/Icon'
import TicketList from '~/components/TicketList/TicketList'
import Button from '~/components/Button'

const cx = classNames.bind(styles)
function BuyTicket() {
  return (
    <div className={cx('container', 'wrapper')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Home</Breadcrumb.Item>
        <Breadcrumb.Item href={config.routes.ticket} active>
          Vé xe khách
        </Breadcrumb.Item>
      </Breadcrumb>

      <Search />

      <div className="mt-5 fw-medium fs-1 d-flex justify-content-between">
        <div>
          <span> Kết quả: </span>
          <span> 30 chuyến</span>
        </div>
        <FilterIcon />
      </div>

      <TicketList />

      <Button roundHalf className={cx('btn-more')}>
        Xem thêm
      </Button>
    </div>
  )
}

export default BuyTicket;