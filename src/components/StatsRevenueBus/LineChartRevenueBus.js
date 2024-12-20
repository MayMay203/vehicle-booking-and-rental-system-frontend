import React from 'react'
import { Line } from '@ant-design/charts'
function LineChartRevenueBus({data}) {
  const rawData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        data: data.revenueStatistic.map((item) => parseInt(item.revenue.replace('VND', '').trim(), 10)), // Safely access data
        label: 'Doanh thu mỗi tháng',
        borderColor: '#FF7F50',
        fill: false,
      },
    ],
  }

  const formattedData = rawData.labels.map((month, index) => ({
    date: `Tháng ${month}`,
    revenue: rawData.datasets[0].data[index] || 0, // Use 0 if data[index] is undefined
  }))

  const config = {
    data: formattedData,
    xField: 'date',
    yField: 'revenue',
    xAxis: {
      title: {
        text: 'Tháng',
        style: { fontSize: 14, fontWeight: 'bold' },
      },
    },
    yAxis: {
      title: { text: 'Doanh thu theo tháng (VND)' },
      label: {
        formatter: (value) => `${(value / 1000).toFixed(1)}K`,
      },
    },
    color: ['#A33A3A'],
    smooth: true,
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: '#A33A3A',
        stroke: '#A33A3A',
      },
    },
    lineStyle: {
      stroke: '#A33A3A',
      lineWidth: 3,
    },
  }

  return <Line {...config} />
}

export default LineChartRevenueBus
