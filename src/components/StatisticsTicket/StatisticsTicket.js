import classNames from "classnames/bind"
import styles from './StatisticsTicket.module.scss'
import { Form, Row } from "react-bootstrap"
import { useState } from "react"
import { Table } from "antd"
import Button from "../Button"
const cx = classNames.bind(styles)
function StatisticsTicket(){
    const [isCorrectDateStart, setIsCorrectDateStart] = useState(false)
    const [isCorrectDateEnd, setIsCorrectDateEnd] = useState(false)
    const routes = [
      { value: '', label: 'Chọn tuyến đường' },
      { value: 'Hà Nội - Đà Nẵng', label: 'Hà Nội - Đà Nẵng' },
      { value: 'Hà Nội - Sài Gòn', label: 'Hà Nội - Sài Gòn' },
      { value: 'Hà Nội - Quảng Ninh', label: 'Hà Nội - Quảng Ninh' },
    ]
    const statisticsBy = [
      { value: 'Theo ngày', label: 'Theo ngày' },
      { value: 'Theo tháng', label: 'Theo tháng' },
      { value: 'Theo quý', label: 'Theo quý' },
      { value: 'Theo năm', label: 'Theo năm' },
    ]
    const handleInputChange = (e) => {
      const { name, value } = e.target
      if (name === 'dateStart') {
        const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/
        if (!regex.test(value)) {
          setIsCorrectDateStart(false)
          return
        }
      }
      if (name === 'dateEnd') {
        const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/
        if (!regex.test(value)) {
          setIsCorrectDateEnd(false)
          return
        }
      }

      setIsCorrectDateStart(true)
      setIsCorrectDateEnd(true)
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }))
    }
     const columns = [
       {
         title: 'STT',
         dataIndex: '',
         align: 'center',
         width: 70,
         render: (text, record, index) => index + 1,
       },
       {
         title: 'Tuyến đường',
         dataIndex: 'route',
         align: 'center',
         width: 400,
         showSorterTooltip: {
           target: 'full-header',
         },
         filters: [
           {
             text: 'Joe',
             value: 'Joe',
           },
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
               {
                 text: 'Black',
                 value: 'Black',
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
         title: 'Vé đã bán',
         dataIndex: 'soldTicket',
         align: 'center',
         defaultSortOrder: 'descend',
         width: 200,
         // sorter: (a, b) => a.age - b.age,
       },
       {
         title: 'Vé còn',
         dataIndex: 'unsoldTicket',
         align: 'center',
         width: 200,
         filters: [
           {
             text: 'London',
             value: 'London',
           },
           {
             text: 'New York',
             value: 'New York',
           },
         ],
         onFilter: (value, record) => record.address.indexOf(value) === 0,
       },
       {
         title: 'Vé đã hủy',
         dataIndex: 'cancelTicket',
         align: 'center',
         defaultSortOrder: 'descend',
         width: 400,
         // sorter: (a, b) => a.age - b.age,
       },
     ]

     const data = [
       {
         key: '1',
         route: 'Hà Nội - Quảng Ngãi',
         soldTicket: '232',
         unsoldTicket: '12',
         cancelTicket: '1',
       },
       {
         key: '2',
         route: 'Hà Nội - Quảng Ngãi',
         soldTicket: '232',
         unsoldTicket: '12',
         cancelTicket: '1',
       },
       {
         key: '3',
         route: 'Hà Nội - Quảng Ngãi',
         soldTicket: '232',
         unsoldTicket: '12',
         cancelTicket: '1',
       },
       {
         key: '5',
         route: 'Hà Nội - Quảng Ngãi',
         soldTicket: '232',
         unsoldTicket: '12',
         cancelTicket: '1',
       },
     ]
    return (
      <div className="mt-3 mb-5">
        <Row className={cx('row-cols-5 align-items-start', 'wrap-filter')}>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formStatistics.ControlInput1">
            <Form.Label className="mb-3">
              Tuyến đường<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="route"
              name="route"
              className={cx('txt', 'selectbox', 'infor-item')}
              // onChange={handleInputChange}
            >
              {routes.map((route, index) => (
                <option key={index} value={route.value}>
                  {route.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-5')} controlId="formStatistics.ControlInput2">
            <Form.Label className="mb-3">
              Thống kê theo<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="statisticsBy"
              name="statisticsBy"
              className={cx('txt', 'selectbox', 'infor-item')}
              // onChange={handleInputChange}
            >
              {statisticsBy.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput2">
            <Form.Label className="mb-3">
              Ngày bắt đầu<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="12-01-2003"
              name="dateStart"
              aria-label="dateStart"
              className={cx('txt', 'm-0')}
              onChange={handleInputChange}
            />
            {!isCorrectDateStart && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
          </Form.Group>
          <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput2">
            <Form.Label className="mb-3">
              Ngày kết thúc<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="12-01-2003"
              name="dateEnd"
              aria-label="dateEnd"
              className={cx('txt', 'm-0')}
              onChange={handleInputChange}
            />
            {!isCorrectDateEnd && <p className={cx('txt-warn')}>Vui lòng nhập theo dạng: dd-mm-yyyy</p>}
          </Form.Group>
          <div className={cx('d-flex justify-content-end align-items-end', 'btn-statistics')}>
            <Button primary className={cx('mb-4 mt-2')}>
              Thống kê
            </Button>
          </div>
        </Row>

        <Row>
          <Table
            columns={columns}
            dataSource={data}
            // onChange={onChange}
            bordered
            pagination={false}
            scroll={{ y: 500 }}
            // pagination={{ position: ['bottomCenter'], pageSize: 10 }}
            rowClassName="table-row-center" // Thêm class để căn giữa dọc
            showSorterTooltip={{
              target: 'sorter-icon',
            }}
          />
        </Row>
      </div>
    )
}
export default StatisticsTicket