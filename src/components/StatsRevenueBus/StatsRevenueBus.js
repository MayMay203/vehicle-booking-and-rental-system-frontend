// // import classNames from 'classnames/bind'
// // import styles from './StatsRevenueBus.module.scss'
// // import React, { useState } from 'react'
// // import { Line } from 'react-chartjs-2'
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from 'chart.js'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { Col, Row } from 'react-bootstrap'
// // import Button from '../Button'
// // import { faCalendarDays, faSort } from '@fortawesome/free-solid-svg-icons'
// // import DatePicker from 'react-datepicker'
// import { Line } from '@ant-design/charts'
// import React from 'react'
// import { DatePicker } from 'antd'
// import { statsRevenueBus } from '~/apiServices/busPartner/statsRevenueBus'
// // import dayjs from 'dayjs'
// // const cx = classNames.bind(styles)
// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
// function StatsRevenueBus({ data }) {
//   // const [startDate, setStartDate] = useState(new Date())
//   // return (
//   //   <div>

//   //     <Row className="align-items-center">
//   //       <Col className={cx('left-col')}>
//   //         <div className={cx('background-red')}>
//   //           <span className={cx('text')}>Từ: </span>
//   //           <span className={cx('justify-content-center', 'content-calendar')}>
//   //             {/* {startDate.toLocaleDateString('vi-VN')} */}
//   //             {startDate.getFullYear()} {/* Chỉ hiển thị năm */}
//   //           </span>
//   //           <DatePicker
//   //             selected={startDate}
//   //             onChange={(date) => setStartDate(date)}
//   //             dateFormat="yyyy"
//   //             className={cx('content-calendar')}
//   //             customInput={
//   //               <FontAwesomeIcon icon={faCalendarDays} className={cx('justify-content-end', 'btn-calendar')} />
//   //             }
//   //             calendarClassName={cx('datetime-picker')}
//   //             showYearPicker
//   //           />
//   //         </div>
//   //       </Col>
//   //       <Col className={cx('right-col')}>
//   //         <Button rounded className={cx('btn-sort')}>
//   //           <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
//   //           <span className={cx('d-none d-lg-inline')}>Sắp xếp</span>
//   //         </Button>
//   //       </Col>
//   //     </Row>

//   //     <Line
//   //       data={{
//   //         labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//   //         datasets: [
//   //           {
//   //             data: [2382, 2390, 2411, 2502, 2635, 2809, 2947, 3402, 3700, 4267, 4203, 4444],
//   //             label: 'Doanh thu mỗi tháng',
//   //             borderColor: '#FF7F50',
//   //             fill: false,
//   //           },
//   //         ],
//   //       }}
//   //       options={{
//   //         responsive: true,
//   //         plugins: {
//   //           title: {
//   //             display: true,
//   //             text: 'DOANH THU THEO NĂM',
//   //             color: '#A33A3A',
//   //             font: {
//   //               size: 30,
//   //             },
//   //           },
//   //           legend: {
//   //             display: true,
//   //             position: 'bottom',
//   //             labels: {
//   //               color: '#A33A3A',
//   //               generateLabels: (chart) => {
//   //                 const datasets = chart.data.datasets
//   //                 return datasets.map((dataset, index) => ({
//   //                   text: dataset.label,
//   //                   fillStyle: dataset.backgroundColor || dataset.borderColor,
//   //                   strokeStyle: dataset.borderColor,
//   //                   lineWidth: 3,
//   //                   hidden: !chart.isDatasetVisible(index),
//   //                   datasetIndex: index,
//   //                 }))
//   //               },
//   //             },
//   //           },
//   //         },
//   //         scales: {
//   //           x: {
//   //             id: 'x',
//   //             type: 'category',
//   //             title: {
//   //               display: true,
//   //               text: 'Tháng',
//   //               color: '#A33A3A',
//   //               font: {
//   //                 size: 16,
//   //               },
//   //             },
//   //             ticks: {
//   //               color: '#A33A3A',
//   //             },
//   //           },
//   //           y: {
//   //             id: 'y',
//   //             type: 'linear',
//   //             title: {
//   //               display: true,
//   //               text: 'Doanh thu (triệu đồng)',
//   //               color: '#A33A3A',
//   //               font: {
//   //                 size: 16,
//   //               },
//   //             },
//   //             ticks: {
//   //               color: '#A33A3A',
//   //             },
//   //           },
//   //         },
//   //       }}
//   //     />
//   //   </div>
//   // )
//   const getRevenueBus = async() => {
//     const respone = await statsRevenueBus('2024')
//   }
//   const rawData = {
//     labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     datasets: [
//       {
//         data: [2382, 2390, 2411, 2502, 2635, 2809, 2947, 3402, 3700, 4267, 4203, 4444],
//         label: 'Doanh thu mỗi tháng',
//         borderColor: '#FF7F50',
//         fill: false,
//       },
//     ],
//   }

//   // Transform data for Ant Design Charts
//   const formattedData = rawData.labels.map((month, index) => ({
//     date: `Tháng ${month}`, // Format as 'Tháng 1', 'Tháng 2', etc.
//     revenue: rawData.datasets[0].data[index], // Get the corresponding revenue
//   }))

//   const config = {
//     data: formattedData,
//     xField: 'date',
//     yField: 'revenue',
//     xAxis: {
//       title: {
//         text: 'Tháng',
//         style: {
//           fontSize: 14,
//           fontWeight: 'bold',
//         },
//       },
//     },
//     yAxis: {
//       title: {
//         text: 'Doanh thu theo tháng(VND)',
//       },
//       label: {
//         formatter: (value) => `${(value / 1000).toFixed(1)}K`, // Format as thousands
//       },
//     },
//     color: ['#A33A3A'],
//     smooth: true,
//     point: {
//       size: 5,
//       shape: 'circle',
//     },
//   }
//   const handleOnChange = () => {

//   }
//   return (
//     <div>
//       <DatePicker placeholder='Chọn năm' onChange={handleOnChange} picker="year" />
//       <Line {...config} />
//     </div>
//   )
// }
// export default StatsRevenueBus

import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
// import { Line } from '@ant-design/charts'
import { Col, Form, Row } from 'react-bootstrap'
import classNames from 'classnames/bind'
import styles from './StatsRevenueBus.module.scss'
import { statsRevenueBus } from '~/apiServices/busPartner/statsRevenueBus'
import Button from '../Button'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
const cx = classNames.bind(styles)
function StatsRevenueBus() {
  const [time, setTime] = useState(dayjs())
  const [data, setData] = useState({ revenueStatistic: [] })
  // const [revenueBy, setRevenueBy] = useState('')
  const [activeTypeFilter, setActiveTypeFilter] = useState('ByMonth')
  // const rawData = {
  //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //   datasets: [
  //     {
  //       data: data.revenueStatistic.map((item) => parseInt(item.revenue.replace('VND', '').trim(), 10)), // Safely access data
  //       label: 'Doanh thu mỗi tháng',
  //       borderColor: '#FF7F50',
  //       fill: false,
  //     },
  //   ],
  // }

  // const formattedData = rawData.labels.map((month, index) => ({
  //   date: `Tháng ${month}`,
  //   revenue: rawData.datasets[0].data[index] || 0, // Use 0 if data[index] is undefined
  // }))

  // const config = {
  //   data: formattedData,
  //   xField: 'date',
  //   yField: 'revenue',
  //   xAxis: {
  //     title: {
  //       text: 'Tháng',
  //       style: { fontSize: 14, fontWeight: 'bold' },
  //     },
  //   },
  //   yAxis: {
  //     title: { text: 'Doanh thu theo tháng (VND)' },
  //     label: {
  //       formatter: (value) => `${(value / 1000).toFixed(1)}K`,
  //     },
  //   },
  //   color: ['#A33A3A'],
  //   smooth: true,
  //   point: {
  //     size: 5,
  //     shape: 'circle',
  //     style: {
  //       fill: '#A33A3A',
  //       stroke: '#A33A3A',
  //     },
  //   },
  //   lineStyle: {
  //     stroke: '#A33A3A',
  //     lineWidth: 3,
  //   },
  // }

  const getRevenueBus = async (type, time) => {
    try {
      const response = await statsRevenueBus(type, time) // Fetch data
      return response
    } catch (error) {
      console.error('Error fetching revenue data:', error)
      return { revenueStatistic: [] } // Return fallback value on error
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (time !== '') {
  //       const revenueData = await getRevenueBus(time.format('YYYY'))
  //       setData(revenueData)
  //     }
  //   }
  //   fetchData()
  // }, [time])
  useEffect(() => {
    const fetchData = async () => {
      const revenueData = await getRevenueBus(activeTypeFilter, time.format('YYYY'))
      setData(revenueData)
    }
    fetchData()
  }, [activeTypeFilter, time])
  const handleOnChange = (dateString) => {
    setTime(dateString)
    console.log('Selected year:', dateString)
  }

  const handleTypeFilterClick = (btnType) => {
    setActiveTypeFilter(btnType)
  }
  console.log('setActiveTypeFilter:', activeTypeFilter)
  return (
    <div className="mb-3 mt-3 container">
      <div>
        {/* <Row className="mt-4 justify-content-center align-items-center">
          <div className={cx('header', 'd-flex')}>
            <p className={cx('justify-content-center', 'txt-header')}>DOANH THU THEO THÁNG</p>
          </div>
        </Row> */}
        <Row className="mt-5 justify-content-center align-items-center mb-5">
          <Col xs="10" className="p-2 align-items-center justify-content-center">
            <div className={cx('type-filter-container')}>
              <Button
                rounded
                className={cx('type-filter', { active: activeTypeFilter === 'ByMonth' })}
                onClick={() => handleTypeFilterClick('ByMonth')}
              >
                Doanh thu mỗi tháng
              </Button>
              <Button
                rounded
                className={cx('type-filter', { active: activeTypeFilter === 'ByYear' })}
                onClick={() => handleTypeFilterClick('ByYear')}
              >
                Doanh thu mỗi năm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="row mb-4 align-items-center">
        <Col>
          {activeTypeFilter === 'ByMonth' && (
            // <DatePicker placeholder="Chọn năm" onChange={handleOnChange} picker="year" />
            <>
              <Form.Group className={cx('txt', 'mb-1')} controlId="formInfor.ControlInput3">
                <Form.Label className="mb-3">
                  Năm<span className={cx('text', 'text-danger', 'ms-1', 'me-4')}>*</span>
                </Form.Label>
                <DatePicker
                  picker="year"
                  onChange={handleOnChange}
                  defaultValue={time}
                  format="YYYY"
                  className={cx('content-calendar')}
                />
              </Form.Group>
            </>
          )}
        </Col>
        <Col className={cx('justify-content-end', 'wrap-total')}>
          <p className={cx('title-total')}>Tổng doanh thu</p>
          <p className={cx('txt-total')}>{data?.totalRevenue}</p>
        </Col>
      </div>
      <div style={{ flex: 1, marginLeft: '20px' }}>
        {/* <Line {...config} /> */}
        <Line
          data={{
            labels:
              activeTypeFilter === 'ByMonth'
                ? ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '']
                : [null, ...data.revenueStatistic.map((item) => parseInt(item.period)), null],
            datasets: [
              {
                data: [
                  null,
                  ...data.revenueStatistic.map((item) => parseInt(item.revenue.replace('VND', '').trim(), 10)),
                  null,
                ],
                label: 'Doanh thu mỗi tháng',
                borderColor: '#FF7F50',
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: activeTypeFilter === 'ByMonth' ? 'DOANH THU THEO THÁNG' : 'DOANH THU THEO NĂM',
                color: '#A33A3A',
                font: {
                  size: 30,
                },
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: '#A33A3A',
                  generateLabels: (chart) => {
                    const datasets = chart.data.datasets
                    return datasets.map((dataset, index) => ({
                      text: dataset.label,
                      fillStyle: dataset.backgroundColor || dataset.borderColor,
                      strokeStyle: dataset.borderColor,
                      lineWidth: 3,
                      hidden: !chart.isDatasetVisible(index),
                      datasetIndex: index,
                    }))
                  },
                },
              },
            },
            scales: {
              x: {
                id: 'x',
                type: 'category',
                title: {
                  display: true,
                  text: 'Tháng',
                  color: '#A33A3A',
                  font: {
                    size: 16,
                  },
                },
                ticks: {
                  color: '#A33A3A',
                },
              },
              y: {
                id: 'y',
                type: 'linear',
                title: {
                  display: true,
                  text: 'Doanh thu (VNĐ)',
                  color: '#A33A3A',
                  font: {
                    size: 16,
                  },
                },
                ticks: {
                  color: '#A33A3A',
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default StatsRevenueBus
