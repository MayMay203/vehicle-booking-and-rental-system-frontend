import classNames from "classnames/bind"
import styles from './BusTrip.module.scss'
import Search from "~/components/Search"
import { useState } from 'react'
import Button from '~/components/Button'
import { Col, Row } from "react-bootstrap"
import Tippy from '@tippyjs/react/headless'
import PopperWrapper from '~/components/PopperWrapper'
import PopperItem from '~/components/PopperWrapper/PopperItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from "@fortawesome/free-solid-svg-icons"
import TicketBusTrip from "~/components/TicketBusTrip"
import { useNavigate } from "react-router-dom"
const cx = classNames.bind(styles)
function BusTrip(){
    const [activeTypeFilter, setActiveTypeFilter] = useState('all')
    const handleTypeFilterClick = (btnType) => {
        setActiveTypeFilter(btnType)
    }
    const navigate = useNavigate()
    const handleShowDetail = (id) => {
      navigate('detail-bus-trip', { state: { id: id } })
    }
    return (
      <div className={cx('container')}>
        <div className="mb-5"></div>
        <Search noSelectBus={true}></Search>
        <div className="d-flex justify-content-center mt-4 align-items-center">
          <Button primary>Thêm chuyến xe</Button>
        </div>
        <Row className='mt-4 justify-content-center'>
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
                Chưa đi
              </Button>

              <Button
                rounded
                className={cx('type-filter', { active: activeTypeFilter === 'done' })}
                onClick={() => handleTypeFilterClick('done')}
              >
                Đã đi
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
        <TicketBusTrip id={1} handleShowDetail={() => handleShowDetail(1)}></TicketBusTrip>
        <div className="mb-5"></div>
      </div>
    )
}
export default BusTrip