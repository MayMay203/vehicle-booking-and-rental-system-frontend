import classNames from "classnames/bind";
import styles from './BuyTicket.module.scss'
import { Breadcrumb } from 'react-bootstrap'
import { config } from '~/config'
import Search from '~/components/Search'
import { FilterIcon } from '~/components/Icon'
import TicketList from '~/components/TicketList/TicketList'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'
import { useEffect, useState } from 'react'
import { getAllTickets } from '~/apiServices/ticket/getAllTicket'
import { Empty, Pagination } from 'antd'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)
function BuyTicket() {
  const [ticketList, setTicketList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [sortType, setSortType] = useState('default')
  const [isVisible, setIsVisible] = useState(false)

  const { busName, departureLocation, arrivalLocation, departureDate } = useSelector(
    (state) => state.search.searchTicket,
  )

  useEffect(() => {
    async function fetchAllTicketList() {
      const data = await getAllTickets(currentPage, departureLocation, arrivalLocation, busName, departureDate, sortType)
      if (data) {
        setTicketList(data.result)
        setTotal(data.meta.total)
      }
    }
    fetchAllTicketList()
  }, [currentPage, busName, departureLocation, arrivalLocation, departureDate, sortType])

  const handleChangeFilter = (value) => {
    setSortType(value)
    setTimeout(() => setIsVisible(false), 250)
  }
  
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
          <span>{`${total} chuyến`}</span>
        </div>
        <Tippy
          visible={isVisible}
          interactive
          delay={[100, 700]}
          placement="bottom-end"
          onClickOutside={() => setIsVisible(false)}
          render={(attrs) => (
            <div className={cx('filter')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <PopperItem
                  id="1"
                  title="Mặc định"
                  onClick={() => {
                    handleChangeFilter('default')
                  }}
                  checked={sortType === 'default'}
                />
                <PopperItem
                  id="2"
                  title="Giờ đi sớm nhất"
                  onClick={() => handleChangeFilter('departureTime,asc')}
                  checked={sortType === 'departureTime,asc'}
                />
                <PopperItem
                  id="3"
                  title="Giờ đi muộn nhất"
                  onClick={() => handleChangeFilter('departureTime,desc')}
                  checked={sortType === 'departureTime,desc'}
                />
                <PopperItem id="4" title="Lượt đánh giá cao nhất" />
                <PopperItem
                  id="5"
                  title="Giá tăng dần"
                  onClick={() => handleChangeFilter('priceTicket,asc')}
                  checked={sortType === 'priceTicket,asc'}
                />
                <PopperItem
                  id="6"
                  title="Giá giảm dần"
                  onClick={() => handleChangeFilter('priceTicket,desc')}
                  checked={sortType === 'priceTicket,desc'}
                />
              </PopperWrapper>
            </div>
          )}
        >
          <button onClick={() => setIsVisible((prev) => !prev)}>
            <FilterIcon />
          </button>
        </Tippy>
      </div>
      <TicketList dataList={ticketList} />
      {ticketList.length === 0 && (
       <div style={{marginTop: '60px'}}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có vé xe nào phù hợp với yêu cầu của bạn lúc này."
          />
       </div>
      )}

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

export default BuyTicket;