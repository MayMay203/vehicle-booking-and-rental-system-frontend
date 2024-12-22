import classNames from 'classnames/bind'
import styles from './Statistics.module.scss'
import { useEffect, useMemo, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { getRevenueAllYears } from '~/apiServices/adminStatistic/getRevenueAllYears'
// import { Chart } from 'react-chartjs-2'
// import { Bar, Line} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { getRevenueBusAllYears } from '~/apiServices/adminStatistic/getRevenueBusAllYears'
import { getRevenueRentalAllYears } from '~/apiServices/adminStatistic/getRevenueRentalAllYear'

// // Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// const data = {
//   labels: ['A', 'B', 'C', 'D'], // Các nhãn của trục X
//   datasets: [
//     // {
//     //   label: 'Dataset 1',
//     //   data: [12, 19, 3, 5], // Dữ liệu cho cột đầu tiên
//     //   backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền của cột
//     //   borderColor: 'rgba(255, 99, 132, 1)', // Màu viền của cột
//     //   borderWidth: 1,
//     //   barPercentage: 0.4, // Điều chỉnh tỷ lệ của mỗi cột
//     // },
//     {
//       label: 'Doanh thu',
//       data: [8, 15, 5, 10], // Dữ liệu cho cột thứ hai
//       backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền của cột
//       borderColor: 'rgba(54, 162, 235, 1)', // Màu viền của cột
//       borderWidth: 1,
//       barPercentage: 0.4, // Điều chỉnh tỷ lệ của mỗi cột
//     },
//   ],
// }

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Biểu đồ Cột Kép',
//     },
//   },
//   scales: {
//     x: {
//       stacked: false, // Cột không chồng lên nhau
//     },
//     y: {
//       beginAtZero: true,
//     },
//   },
// }

// // function Statistics() {
// //   <div></div>
// // }

// // export default Statistics;

// const Statistic = () => <Line data={data} options={options} />

// export default Statistic

const cx = classNames.bind(styles)
function Statistics() {
  const [type, setType] = useState('allYears')
  const [yearData, setYearData] = useState({})
  const [totalRevenueAllYears, setTotalRevenueAllYears] = useState(0)
  const [totalYearData, setTotalYearData] = useState([])

  const totalData = useMemo(() => {
    return {
      labels: totalYearData.map((item) => Number(item.year)),
      datasets: [
        {
          label: 'Doanh thu',
          backgroundColor: '#fff6f3',
          borderColor: '#d34714',
          data: [null, ...totalYearData.map((item) => item.revenue), null],
          spanGaps: true,
        },
      ],
    }
  }, [totalYearData])

  console.log(
    yearData.rentalData?.revenueStatistic?.map((item) => Number(item.revenue.replace(/\./g, '').replace(' VND', ''))),
  )

  console.log(
    yearData.busData?.revenueStatistic?.map((item) => Number(item.revenue.replace(/\./g, '').replace(' VND', ''))),
  )
  const data = useMemo(() => {
    const busData = yearData.busData?.revenueStatistic || []
    const rentalData = yearData.rentalData?.revenueStatistic || []
    return {
      labels: busData.map((item) => Number(item.period)),
      datasets: [
        {
          label: 'Doanh thu đối tác nhà xe',
          data: [null, ...busData.map((item) => Number(item.revenue.replace(/\./g, '').replace(' VND', ''))), null],
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền của cột
          borderColor: 'rgba(255, 99, 132, 1)', // Màu viền của cột
          borderWidth: 1,
          barPercentage: 0.4, // Điều chỉnh tỷ lệ của mỗi cột
        },
        {
          label: 'Doanh thu đối tác cho thuê xe',
          data: [null, ...rentalData.map((item) => Number(item.revenue.replace(/\./g, '').replace(' VND', ''))), null],
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền của cột
          borderColor: 'rgba(54, 162, 235, 1)', // Màu viền của cột
          borderWidth: 1,
          barPercentage: 0.4, // Điều chỉnh tỷ lệ của mỗi cột
        },
      ],
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearData])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category', // Loại trục danh mục
        labels: ['', ...totalYearData.map((item) => item.year), ''],
        title: {
          display: true,
          text: 'Năm',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)',
        },
      },
    },
  }

  useEffect(() => {
    async function fetchData() {
      if (type === 'allYears') {
        if (totalYearData.length === 0) {
          const data = await getRevenueAllYears()
          if (data) {
            setTotalRevenueAllYears(Number(data.totalRevenue.replace(/\./g, '').replace(' VND', '')))
            setTotalYearData(
              data.revenueStatistic.map((item) => ({
                year: item.period,
                revenue: Number(item.revenue.replace(/\./g, '').replace(' VND', '')),
              })),
            )
          }
        }
        const busData = await getRevenueBusAllYears()
        const rentalData = await getRevenueRentalAllYears()
        if (busData || yearData) {
          setYearData((prev) => ({
            ...prev,
            busData,
            rentalData,
          }))
        }
      }
    }
    if (type) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('mb-5', 'title')}>THỐNG KÊ DOANH THU</h1>
      <div className="d-flex gap-5">
        <button className={cx('stat-btn', { active: type === 'allYears' })} onClick={() => setType('allYears')}>
          Theo tất cả năm
        </button>
        <button className={cx('stat-btn', { active: type === 'allMonths' })} onClick={() => setType('allMonths')}>
          Theo các tháng trong năm
        </button>
      </div>
      {/* Biểu đồ từng loại đối tác*/}
      <div className="mt-5">
        <h2 className={cx('chart-title')}>Biểu đồ doanh thu các đối tác</h2>
        <div className={cx('total-revenue')}>
          Tổng doanh thu đối tác nhà xe:{' '}
          <span style={{ fontWeight: 600, fontStyle: 'italic', color: 'var(--primary-color)' }}>
            {yearData.busData?.totalRevenue.replaceAll('.', ',').replace(' VND', ' VNĐ')}
          </span>
        </div>
        <div className={cx('total-revenue')}>
          Tổng doanh thu đối tác cho thuê xe:{' '}
          <span style={{ fontWeight: 600, fontStyle: 'italic', color: 'var(--primary-color)' }}>
            {totalRevenueAllYears.toLocaleString()} VNĐ
          </span>
        </div>
        <Bar data={data} options={options}></Bar>
      </div>
      {/* Biểu đồ tất cả đối tác */}
      {totalYearData.length > 0 && (
        <div className="mt-5">
          <h2 className={cx('chart-title')}>Biểu đồ tổng doanh thu</h2>
          <div className={cx('total-revenue')}>
            Tổng doanh thu:{' '}
            <span style={{ fontWeight: 600, fontStyle: 'italic', color: 'var(--primary-color)' }}>
              {totalRevenueAllYears.toLocaleString()} VNĐ
            </span>
          </div>
          <Line data={totalData} options={options} />
        </div>
      )}
    </div>
  )
}

export default Statistics
