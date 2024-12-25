import classNames from 'classnames/bind'
import styles from './BusTicket.module.scss'
import Search from '~/components/Search'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import { Col, Row } from 'react-bootstrap'
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import TicketBusTrip from '~/components/TicketBusTrip'
import ModalManageBusTicket from '../ModalManageBusTicket'
import ModalDetailBusTicket from '../ModalDetailBusTicket'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginSession } from '~/redux/slices/userSlice'
import { fetchBusTicketList } from '~/redux/slices/busPartnerSlice'
import { Empty, Pagination } from 'antd'
import { config } from '~/config'
const cx = classNames.bind(styles)
function BusTicket() {
  const [activeTypeFilter, setActiveTypeFilter] = useState('all')
  const [busTicket, setBusTicket] = useState({})
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  // const [total, setTotal] = useState(0)
  const total = 0
  const listBusTicket = useSelector((state) => state.busPartner.busTicketList)
  useEffect(() => {
    if(dispatch(checkLoginSession())){
      dispatch(fetchBusTicketList({dep: '', des: '' }))
    }
  }, [dispatch])
  const handleTypeFilterClick = (btnType) => {
    setActiveTypeFilter(btnType)
  }
  const handleShowDetail = (ticket) => {
    setModalDetailTicketShow(true)
    setBusTicket(ticket)
  }
  const [modalAddTicketShow, setModalAddTicketShow] = useState(false)
  const handleAddTicket = () => {
    setModalAddTicketShow(true)
  }
  const [modalDetailTicketShow, setModalDetailTicketShow] = useState(false)
  // const handleDetailTicket = () => {
  //   setModalDetailTicketShow(true)
  // }
  // const [modalUpdateTicketShow, setModalUpdateTicketShow] = useState(false)
  // const handleUpdateTicket = () => {
  //   setModalUpdateTicketShow(true)
  // }
  return (
    <div className={cx('container')}>
      <div className="mb-5"></div>
      {/* <Search noSelectBus={true} noSelectDate={true} type={'partner'}></Search>
      <div className="d-flex justify-content-center mt-4 align-items-center">
        <Button primary onClick={() => handleAddTicket()}>
          Thêm vé xe
        </Button>
      </div> */}
      <Row className="d-flex mb-5">
        <div className="col">
          <Search noSelectBus={true} noSelectDate={true} type={'partner-ticket'}></Search>
        </div>
        <div className="col col-3 d-flex justify-content-center mt-4 align-items-center">
          <Button primary onClick={() => handleAddTicket()}>
            Thêm vé xe
          </Button>
        </div>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs="10" className="p-2">
          <div className={cx('type-filter-container')}>
            <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter === 'all' })}
              onClick={() => handleTypeFilterClick('all')}
            >
              Tất cả
            </Button>

            <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter === 'no' })}
              onClick={() => handleTypeFilterClick('no')}
            >
              Hết vé
            </Button>

            <Button
              rounded
              className={cx('type-filter', { active: activeTypeFilter === 'done' })}
              onClick={() => handleTypeFilterClick('done')}
            >
              Còn vé
            </Button>
          </div>
        </Col>
        <Col xs="2" className="d-flex justify-content-end p-2">
          <Tippy
            interactive
            delay={[50, 400]}
            placement="bottom-end"
            render={(attrs) => (
              <div className={cx('filter')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <PopperItem id="1" title="Mặc định" />
                  <PopperItem id="2" title="Giá tăng dần" />
                  <PopperItem id="3" title="Giá giảm dần" />
                </PopperWrapper>
              </div>
            )}
          >
            <button>
              <Button rounded className={cx('btn-sort')}>
                <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
                <span className={cx('d-none d-lg-inline')}>Sắp xếp</span>
              </Button>
            </button>
          </Tippy>
        </Col>
      </Row>
      {listBusTicket.map((ticket, index) => (
        <TicketBusTrip key={index} ticket={ticket} handleShowDetail={() => handleShowDetail(ticket)}></TicketBusTrip>
      ))}
      {listBusTicket.length === 0 && (
        <div style={{ marginTop: '110px' }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Hiện chưa có vé xe trên tuyến đường này." />
        </div>
      )}

      {listBusTicket.length > 0 && (
        <Pagination
          className="mt-5"
          align="center"
          current={currentPage}
          pageSize={config.constants.pagesize}
          total={total}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      <div className="mb-5"></div>
      <ModalManageBusTicket
        enableEdit={true}
        functionModal={'add'}
        show={modalAddTicketShow}
        onHide={() => setModalAddTicketShow(false)}
      ></ModalManageBusTicket>
      <ModalDetailBusTicket
        enableEdit={false}
        functionModal={'view'}
        show={modalDetailTicketShow}
        ticket={busTicket}
        idTicket={busTicket?.busTripScheduleId}
        onHide={() => setModalDetailTicketShow(false)}
      ></ModalDetailBusTicket>
    </div>
  )
}
export default BusTicket
