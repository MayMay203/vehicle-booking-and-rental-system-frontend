// import classNames from 'classnames/bind'
// import styles from './Statistics.module.scss'
// import { useEffect, useState } from 'react'
// import { Line } from '@ant-design/plots'
import { Column } from '@ant-design/plots'
// import { getTotalRevenueAllYears } from '~/apiServices/statistic/getTotalRevenueAllYears'

// const cx = classNames.bind(styles)
function Statistics() {
  // const [type, setType] = useState('allYears')
  // const [dataChart, setDataChart] = useState([])
  // const [totalDataChart, setTotalDataChart] = useState([])
  // const [totalRevenue, setTotalRevenue] = useState()
  // const [year, setYear] = useState(2024)

  // useEffect(() => {
  //  async function fetchDataStatistics(){ 
  //    if (type === 'allYears') {
  //      const dataRes = await getTotalRevenueAllYears()
  //      console.log(dataRes)
  //      if (dataRes) {
  //        setTotalRevenue(dataRes.totalRevenue)
  //        const dataArr = dataRes.revenueStatistic.map((item) => ({ 'Năm': item.period, 'Doanh thu': Number(item.revenue.replace(/\./g, '').replace(' VND', '')) }))
  //        console.log(dataArr)
  //        setTotalDataChart(dataArr)
  //      }
  //    }
  //   }
  //   fetchDataStatistics()
  // }, [type])
  
  // const data = [
  //   { year: '1991', value: 3 },
  //   { year: '1992', value: 4 },
  //   { year: '1993', value: 3.5 },
  //   { year: '1994', value: 5 },
  //   { year: '1995', value: 4.9 },
  //   { year: '1996', value: 6 },
  //   { year: '1997', value: 7 },
  //   { year: '1998', value: 9 },
  //   { year: '1999', value: 13 },
  // ]
  // const config = {
  //   data,
  //   xField: 'year',
  //   yField: 'value',
  //   point: {
  //     shapeField: 'circle',
  //     sizeField: 4,
  //   },
  //   interaction: {
  //     tooltip: {
  //       marker: false,
  //     },
  //   },
  //   style: {
  //     lineWidth: 2,
  //   },
  // }

  // const totalConfig = {
  //   data:totalDataChart,
  //   xField: 'Năm',
  //   yField: 'Doanh thu',
  //   point: {
  //     shapeField: 'circle',
  //     sizeField: 4,
  //   },
  //   interaction: {
  //     tooltip: {
  //       marker: false,
  //     },
  //   },
  //   style: {
  //     lineWidth: 2,
  //   },
  // }

  // return (
  //   <div className={cx('wrapper')}>
  //     <h1 className={cx('title')}>THỐNG KÊ DOANH THU</h1>
  //     <div className="d-flex align-items-center column-gap-5" style={{ marginBottom: '30px' }}>
  //       <button className={cx('stat-btn', { active: type === 'allYears' })} onClick={() => setType('allYears')}>
  //         Tất cả năm
  //       </button>
  //       <button className={cx('stat-btn', { active: type === 'allMonths' })} onClick={() => setType('allMonths')}>
  //         Theo tháng trong năm
  //       </button>
  //     </div>
  //     <div style={{ marginBottom: '80px', marginTop: '50px' }}>
  //       <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>Biểu đồ doanh thu các loại đối tác</h2>
  //       <span className={cx('total')}>{`Tổng doanh thu: ${totalRevenue
  //         ?.replace('.', ',')
  //         .replace(' VND', ' VNĐ')}`}</span>
  //       {/* <Line {...config} /> */}
  //     </div>
  //     <div>
  //       <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>Biểu đồ doanh thu tất cả đối tác</h2>
  //       <span className={cx('total')}>{`Tổng doanh thu: ${totalRevenue
  //         ?.replace('.', ',')
  //         .replace(' VND', ' VNĐ')}`}</span>
  //       {/* {totalDataChart.length > 0 && <Line {...totalConfig} />} */}
  //     </div>
  //   </div>
  // )

  const config = {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json',
    },
    xField: '月份',
    yField: '月均降雨量',
    colorField: 'name',
    group: true,
    style: {
      // 矩形四个方向的内边距
      inset: 5,
      // 矩形单个方向的内边距
      // insetLeft:5,
      // insetRight:20,
      // insetBottom:10
      // insetTop:10
    },
  }
  return <Column {...config} />
}

export default Statistics
