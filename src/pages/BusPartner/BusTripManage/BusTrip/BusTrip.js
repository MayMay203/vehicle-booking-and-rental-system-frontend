// import classNames from "classnames/bind"
// import styles from './BusTrip.module.scss'
// import Search from "~/components/Search"
// import { useState } from 'react'
// import Button from '~/components/Button'
// import { Col, Row } from "react-bootstrap"
// import Tippy from '@tippyjs/react/headless'
// import PopperWrapper from '~/components/PopperWrapper'
// import PopperItem from '~/components/PopperWrapper/PopperItem'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSort } from "@fortawesome/free-solid-svg-icons"
// import TicketBusTrip from "~/components/TicketBusTrip"
// import { useNavigate } from "react-router-dom"
// const cx = classNames.bind(styles)
// function BusTrip(){
//     const [activeTypeFilter, setActiveTypeFilter] = useState('all')
//     const handleTypeFilterClick = (btnType) => {
//         setActiveTypeFilter(btnType)
//     }
//     const navigate = useNavigate()
//     const handleShowDetail = (id) => {
//       navigate('detail-bus-trip', { state: { id: id } })
//     }
//     const handelAddBusTrip = () => {
//       navigate('add-bus-trip')
//     }

//     return (
//       <div className={cx('container')}>
//         <div className="mb-5"></div>
//         <Search noSelectBus={true}></Search>
//         <div className="d-flex justify-content-center mt-4 align-items-center">
//           <Button primary onClick={() => handelAddBusTrip()}>Thêm chuyến xe</Button>
//         </div>
//         <Row className='mt-4 justify-content-center'>
//           <Col xs="10" className="p-2">
//             <div className={cx('type-filter-container')}>
//               <Button
//                 rounded
//                 className={cx('type-filter', { active: activeTypeFilter === 'all' })}
//                 onClick={() => handleTypeFilterClick('all')}
//               >
//                 Tất cả
//               </Button>

//               <Button
//                 rounded
//                 className={cx('type-filter', { active: activeTypeFilter === 'no' })}
//                 onClick={() => handleTypeFilterClick('no')}
//               >
//                 Chưa đi
//               </Button>

//               <Button
//                 rounded
//                 className={cx('type-filter', { active: activeTypeFilter === 'done' })}
//                 onClick={() => handleTypeFilterClick('done')}
//               >
//                 Đã đi
//               </Button>
//             </div>
//           </Col>
//           <Col xs="2" className="d-flex justify-content-end p-2">
//             <Tippy
//               interactive
//               delay={[50, 400]}
//               placement="bottom-end"
//               render={(attrs) => (
//                 <div className={cx('filter')} tabIndex="-1" {...attrs}>
//                   <PopperWrapper>
//                     <PopperItem id="1" title="Mặc định" />
//                     <PopperItem id="2" title="Giá tăng dần" />
//                     <PopperItem id="3" title="Giá giảm dần" />
//                   </PopperWrapper>
//                 </div>
//               )}
//             >
//               <button>
//                 <Button rounded className={cx('btn-sort')}>
//                   <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
//                   <span className={cx('d-none d-lg-inline')}>Sắp xếp</span>
//                 </Button>
//               </button>
//             </Tippy>
//           </Col>
//         </Row>
//         <TicketBusTrip id={1} handleShowDetail={() => handleShowDetail(1)}></TicketBusTrip>
//         <div className="mb-5"></div>
//       </div>
//     )
// }
// export default BusTrip

import classNames from 'classnames/bind'
import styles from './BusTrip.module.scss'
import Search from '~/components/Search'
import Button from '~/components/Button'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'antd'
import { useState } from 'react'
import AddBusTrip from '../AddBusTrip'
import UpdateBusTrip from '../UpdateBusTrip'
const cx = classNames.bind(styles)
function BusTrip() {
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const handelAddBusTrip = () => {}
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      align: 'center',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Điểm khởi hành',
      dataIndex: 'departure',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 250,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Điểm đến',
      dataIndex: 'destination',
      align: 'center',
      width: 250,
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: [
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Thời gian di chuyển',
      dataIndex: 'duration',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 250,
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Xem',
      dataIndex: 'view',
      align: 'center',
      width: 90,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{ cursor: 'pointer', color: '#A33A3A', fontSize: '2rem' }}
          onClick={() => handleViewBus(record.key)}
        />
      ),
    },
    {
      title: 'Sửa',
      dataIndex: 'update',
      align: 'center',
      width: 90,
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: 'pointer', color: '#FF672F', fontSize: '2rem' }}
          onClick={() => handleEditBus(record.key)}
        />
      ),
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      align: 'center',
      width: 90,
      render: (record) => (
        <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: '#D5420C', fontSize: '2rem' }} />
      ),
    },
  ]
  const data = [
    {
      key: '1',
      departure: 'Hà Nội',
      destination: 'Đà Nẵng',
      duration: '8 tiếng',
    },
    {
      key: '2',
      departure: 'Hà Nội',
      destination: 'Đà Nẵng',
      duration: '8 tiếng',
    },
    {
      key: '3',
      departure: 'Hà Nội',
      destination: 'Đà Nẵng',
      duration: '8 tiếng',
    },
    {
      key: '5',
      departure: 'Hà Nội',
      destination: 'Đà Nẵng',
      duration: '8 tiếng',
    },
  ]
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const handleViewBus = (id) => {
    setShowModalAdd(true)
  }
  const handleEditBus = (id) => {
    setShowModalUpdate(true)
  }
  return (
    <div className={cx('container', 'mb-5 mt-5')}>
      <Row className="d-flex mb-5">
        <div className="col">
          <Search noSelectBus={true} noSelectDate={true}></Search>
        </div>
        <div className="col col-3 d-flex justify-content-center mt-4 align-items-center">
          <Button primary onClick={handelAddBusTrip}>
            Thêm chuyến xe
          </Button>
        </div>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
        pagination={false}
        scroll={{ x: 'max-content', y: 500 }}
        // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
        rowClassName="table-row-center" // Thêm class để căn giữa dọc
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        className={cx('')}
      />
      <AddBusTrip show={showModalAdd} onHide={() => setShowModalAdd(false)} />
      <UpdateBusTrip show={showModalUpdate} onHide={() => setShowModalUpdate(false)}></UpdateBusTrip>
    </div>
  )
}
export default BusTrip
