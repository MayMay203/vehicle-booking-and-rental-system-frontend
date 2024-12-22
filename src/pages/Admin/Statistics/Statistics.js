import { Chart } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['A', 'B', 'C', 'D'], // Các nhãn của trục X
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5], // Dữ liệu cho cột đầu tiên
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền của cột
      borderColor: 'rgba(255, 99, 132, 1)', // Màu viền của cột
      borderWidth: 1,
      barPercentage: 0.4, // Điều chỉnh tỷ lệ của mỗi cột
    },
    {
      label: 'Dataset 2',
      data: [8, 15, 5, 10], // Dữ liệu cho cột thứ hai
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền của cột
      borderColor: 'rgba(54, 162, 235, 1)', // Màu viền của cột
      borderWidth: 1,
      barPercentage: 0.4, // Điều chỉnh tỷ lệ của mỗi cột
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ Cột Kép',
    },
  },
  scales: {
    x: {
      stacked: false, // Cột không chồng lên nhau
    },
    y: {
      beginAtZero: true,
    },
  },
}

const Statistic = () => <Bar data={data} options={options} />

export default Statistic
