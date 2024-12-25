import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import { Col, Form, Row } from 'react-bootstrap'
import classNames from 'classnames/bind'
import styles from './StatsRevenueRental.module.scss'
import Button from '../Button'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { statsRevenueRental } from '~/apiServices/rentalPartner/statsRevenueRental'
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Title, Tooltip, Legend)

const cx = classNames.bind(styles)
function StatsRevenueRentalService() {
  const [time, setTime] = useState(dayjs())
  const [data, setData] = useState({ revenueStatistic: [] })
  // const [revenueBy, setRevenueBy] = useState('')
  const [activeTypeFilter, setActiveTypeFilter] = useState('ByMonth')
  const getRevenueBus = async (type, time) => {
    try {
      const response = await statsRevenueRental(type, time) // Fetch data
      return response
    } catch (error) {
      console.error('Error fetching revenue data:', error)
      return { revenueStatistic: [] } // Return fallback value on error
    }
  }
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
                : data.revenueStatistic.map((item) => parseInt(item.period)),
            datasets: [
              {
                data: [
                  null,
                  ...data.revenueStatistic.map((item) => parseInt(item.revenue.replace('VND', '').trim(), 10)),
                  null,
                ], // Safely access data
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

export default StatsRevenueRentalService
