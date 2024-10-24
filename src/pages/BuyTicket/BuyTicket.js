import classNames from "classnames/bind";
import styles from './BuyTicket.module.scss'
import { Breadcrumb } from 'react-bootstrap'
import { config } from '~/config'
import Search from '~/components/Search'
import { FilterIcon } from '~/components/Icon'
import TicketList from '~/components/TicketList/TicketList'
import Button from '~/components/Button'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'

const cx = classNames.bind(styles)
function BuyTicket() {
  return (
    <div className={cx('container', 'wrapper')}>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item href={config.routes.home}>Trang chủ</Breadcrumb.Item>
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
        <Tippy
          interactive
          delay={[100, 700]}
          placement="bottom-end"
          render={(attrs) => (
            <div className={cx('filter')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <PopperItem id="1" title="Mặc định" />
                <PopperItem id="2" title="Giờ đi sớm nhất" />
                <PopperItem id="3" title="Giờ đi muộn nhất" />
                <PopperItem id="4" title="Lượt đánh giá cao nhất" />
                <PopperItem id="5" title="Giá tăng dần" />
                <PopperItem id="6" title="Giá giảm dần" />
              </PopperWrapper>
            </div>
          )}
        >
          <button>
            <FilterIcon />
          </button>
        </Tippy>
      </div>
      <TicketList />

      <Button roundHalf className={cx('btn-more')}>
        Xem thêm
      </Button>
    </div>
  )
}

export default BuyTicket;