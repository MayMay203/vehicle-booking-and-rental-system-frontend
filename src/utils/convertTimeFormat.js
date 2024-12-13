export const convertTimeFormat = (timeString) => {
  // Kiểm tra nếu timeString không chứa 'h' hoặc 'm', trả về chuỗi rỗng
  if (!timeString.includes('h') || !timeString.includes('m')) {
    return ''
  }

  // Tách chuỗi thành giờ và phút
  const [hours, minutes] = timeString.split('h:')

  // Nếu giờ hoặc phút không hợp lệ (ví dụ: không phải là số), trả về chuỗi rỗng
  if (isNaN(hours) || (minutes && isNaN(minutes.replace('m', '')))) {
    return ''
  }

  // Loại bỏ số 0 ở đầu của giờ (nếu có)
  const formattedHours = parseInt(hours, 10)

  // Kiểm tra nếu có phút (minutes)
  const formattedMinutes = minutes ? parseInt(minutes.replace('m', ''), 10) : null

  // Nếu có phút, trả về định dạng "X tiếng Y phút", nếu không chỉ trả về "X tiếng"
  if (formattedMinutes !== null && formattedMinutes !== 0) {
    return `${formattedHours} tiếng ${formattedMinutes} phút`
  } else if (formattedMinutes === null || formattedMinutes === 0) {
    return `${formattedHours} tiếng`
  }
}
