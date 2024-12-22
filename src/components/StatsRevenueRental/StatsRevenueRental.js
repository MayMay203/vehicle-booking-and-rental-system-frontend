import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import classNames from 'classnames/bind'
import styles from './StatsRevenueRental.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'react-bootstrap'
import Button from '../Button'
import { faCalendarDays, faSort } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const cx = classNames.bind(styles)

function StatsRevenueRental() {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <div>
      <Row className="align-items-center">
        <Col className={cx('left-col')}>
          <div className={cx('background-red')}>
            <span className={cx('text')}>Từ: </span>
            <span className={cx('justify-content-center', 'content-calendar')}>
              {/* {startDate.toLocaleDateString('vi-VN')} */}
              {startDate.getFullYear()} {/* Chỉ hiển thị năm */}
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy"
              className={cx('content-calendar')}
              customInput={
                <FontAwesomeIcon icon={faCalendarDays} className={cx('justify-content-end', 'btn-calendar')} />
              }
              calendarClassName={cx('datetime-picker')}
              showYearPicker
            />
          </div>
        </Col>
        <Col className={cx('right-col')}>
          <Button rounded className={cx('btn-sort')}>
            <FontAwesomeIcon icon={faSort} className={cx('icon-sort')} />
            <span className={cx('d-none d-lg-inline')}>Sắp xếp</span>
          </Button>
        </Col>
      </Row>

      <Line
        width={1010}
        height={500}
        data={{
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          datasets: [
            {
              data: [2382, 2390, 2411, 2502, 2635, 2809, 2947, 3402, 3700, 4267, 4203, 4444],
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
              text: 'DOANH THU THEO NĂM',
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
                    fillStyle: dataset.backgroundColor || dataset.borderColor, // Background matches dataset color
                    strokeStyle: dataset.borderColor, // Border matches dataset color
                    lineWidth: 3, // Width of the border line
                    hidden: !chart.isDatasetVisible(index), // Show/hide based on dataset visibility
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
                color: '#A33A3A', // x-axis label color
                font: {
                  size: 16, // x-axis label font size
                },
              },
              ticks: {
                color: '#A33A3A',
              },
              grid: {
                // display: false, // Remove grid lines
                // color: '#A33A3A', // Màu lưới trục x
                // borderColor: '#FF5733', // Màu đường viền trục x
                // borderWidth: 2, // Độ dày đường viền trục x
              },
            },
            y: {
              id: 'y',
              type: 'linear',
              grid: {
                // display: false, // Remove grid lines
                // color: '#A33A3A', // Màu lưới trục x
                // borderColor: '#FF5733', // Màu đường viền trục x
                // borderWidth: 2, // Độ dày đường viền trục x
              },
              title: {
                display: true,
                text: 'Doanh thu (triệu đồng)',
                color: '#A33A3A', // y-axis label color
                font: {
                  size: 16, // y-axis label font size
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
  )
}

export default StatsRevenueRental
