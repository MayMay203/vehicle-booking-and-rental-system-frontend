import React from 'react'
import { Calendar, theme } from 'antd'
import classNames from 'classnames/bind'
import styles from './HolidayCalendar.module.scss'
const cx = classNames.bind(styles)

function HolidayCalendar() {
  // Danh sách ngày nghỉ với định dạng dd-MM-yyyy (có thể lấy từ API)
  const holidayList = ['25-12-2024', '31-12-2024', '01-01-2024']

  // Hàm xử lý khi thay đổi chế độ của panel (tháng, năm,...)
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  // Lấy thông tin từ theme của Ant Design
  const { token } = theme.useToken()

  // Style cho wrapper của calendar
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  }

  // Hàm render các ô ngày trong calendar
  const dateCellRender = (date) => {
    // Định dạng ngày theo kiểu dd-MM-yyyy
    const formattedDate = date.format('DD-MM-YYYY')

    // Kiểm tra xem ngày có trong danh sách ngày nghỉ hay không
    const isHoliday = holidayList.includes(formattedDate)

    // Trả về ngày bình thường hoặc ngày nghỉ với màu sắc đặc biệt
    return <div className={cx({ 'holiday-day': isHoliday })}>{date.format('DD')}</div>
  }

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
    </div>
  )
}

export default HolidayCalendar
