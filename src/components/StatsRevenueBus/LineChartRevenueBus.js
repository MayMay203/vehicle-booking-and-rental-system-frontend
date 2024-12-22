// import React from 'react'
// import { Line } from '@ant-design/charts'
function LineChartRevenueBus({data}) {
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

  // return <Line {...config} />
}

export default LineChartRevenueBus



// import React, { useEffect, useState } from 'react'
// import { DatePicker } from 'antd'
// // import { Line } from '@ant-design/charts'
// import { Col, Row } from 'react-bootstrap'
// import classNames from 'classnames/bind'
// import styles from './StatsRevenueBus.module.scss'
// import { statsRevenueBus } from '~/apiServices/busPartner/statsRevenueBus'
// import Button from '../Button'
// import LineChartRevenueBus from './LineChartRevenueBus'
// const cx = classNames.bind(styles)
// function StatsRevenueBus() {
//   const [time, setTime] = useState('')
//   const [data, setData] = useState({ revenueStatistic: [] }) // Initialize with a safe default value
//   // const [revenueBy, setRevenueBy] = useState('')
//   const [activeTypeFilter, setActiveTypeFilter] = useState('ByMonth')
//   // const rawData = {
//   //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//   //   datasets: [
//   //     {
//   //       data: data.revenueStatistic.map((item) => parseInt(item.revenue.replace('VND', '').trim(), 10)), // Safely access data
//   //       label: 'Doanh thu mỗi tháng',
//   //       borderColor: '#FF7F50',
//   //       fill: false,
//   //     },
//   //   ],
//   // }

//   // const formattedData = rawData.labels.map((month, index) => ({
//   //   date: `Tháng ${month}`,
//   //   revenue: rawData.datasets[0].data[index] || 0, // Use 0 if data[index] is undefined
//   // }))

//   // const config = {
//   //   data: formattedData,
//   //   xField: 'date',
//   //   yField: 'revenue',
//   //   xAxis: {
//   //     title: {
//   //       text: 'Tháng',
//   //       style: { fontSize: 14, fontWeight: 'bold' },
//   //     },
//   //   },
//   //   yAxis: {
//   //     title: { text: 'Doanh thu theo tháng (VND)' },
//   //     label: {
//   //       formatter: (value) => `${(value / 1000).toFixed(1)}K`,
//   //     },
//   //   },
//   //   color: ['#A33A3A'],
//   //   smooth: true,
//   //   point: {
//   //     size: 5,
//   //     shape: 'circle',
//   //     style: {
//   //       fill: '#A33A3A',
//   //       stroke: '#A33A3A',
//   //     },
//   //   },
//   //   lineStyle: {
//   //     stroke: '#A33A3A',
//   //     lineWidth: 3,
//   //   },
//   // }

//   const getRevenueBus = async (time) => {
//     try {
//       const response = await statsRevenueBus(time) // Fetch data
//       return response
//     } catch (error) {
//       console.error('Error fetching revenue data:', error)
//       return { revenueStatistic: [] } // Return fallback value on error
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       if (time !== '') {
//         const revenueData = await getRevenueBus(time)
//         setData(revenueData)
//       }
//     }
//     fetchData()
//   }, [time])

//   const handleOnChange = (date, dateString) => {
//     setTime(dateString)
//     console.log('Selected year:', dateString)
//   }

//   const handleTypeFilterClick = (btnType) => {
//     setActiveTypeFilter(btnType)
//   }
//   return (
//     <div className="mb-3 mt-3 container">
//       <div>
//         {/* <Row className="mt-4 justify-content-center align-items-center">
//           <div className={cx('header', 'd-flex')}>
//             <p className={cx('justify-content-center', 'txt-header')}>DOANH THU THEO THÁNG</p>
//           </div>
//         </Row> */}
//         <Row className="mt-5 justify-content-center align-items-center mb-5">
//           <Col xs="10" className="p-2 align-items-center justify-content-center">
//             <div className={cx('type-filter-container')}>
//               <Button
//                 rounded
//                 className={cx('type-filter', { active: activeTypeFilter === 'ByMonth' })}
//                 onClick={() => handleTypeFilterClick('ByMonth')}
//               >
//                 Doanh thu theo tháng
//               </Button>
//               <Button
//                 rounded
//                 className={cx('type-filter', { active: activeTypeFilter === 'ByYear' })}
//                 onClick={() => handleTypeFilterClick('ByYear')}
//               >
//                 Doanh thu theo năm
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//       <div className="row mb-4">
//         <Col>
//           {activeTypeFilter === 'ByMonth' && (
//             <DatePicker placeholder="Chọn năm" onChange={handleOnChange} picker="year" />
//           )}
//         </Col>
//         <Col className={cx('justify-content-end', 'wrap-total')}>
//           <p className={cx('title-total')}>Tổng doanh thu</p>
//           <p className={cx('txt-total')}>{data?.totalRevenue}</p>
//         </Col>
//       </div>
//       <div style={{ flex: 1, marginLeft: '20px' }}>
//         {/* <Line {...config} /> */}
//         <LineChartRevenueBus data={data}></LineChartRevenueBus>
//       </div>
//     </div>
//   )
// }

// export default StatsRevenueBus