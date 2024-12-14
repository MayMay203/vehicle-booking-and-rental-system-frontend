import * as httpRequestV2 from '~/utils/httpRequestV2'

// export const filterRentalService = async (location, manufacturer, vehicle_type, service_type, start_date, end_date) => {
//   try {
//     console.log('param ===', location, manufacturer, vehicle_type, service_type, start_date, end_date)
//     const response = await httpRequestV2.get(
//       `user/vehicle-register/filters-rental-service?location=${location}&manufacturer=${manufacturer}&vehicle_type=${vehicle_type}&service_type=${service_type}&start_date=${start_date}&end_date=${end_date}`,
//     )
//     console.log("response ===", response)
//     return response.data
//   } catch (error) {
//     throw error.response.data.message
//   }
// }
export const filterRentalService = async (location, manufacturer, vehicle_type, service_type, start_date, end_date) => {
  try {
    console.log('param ===', location, manufacturer, vehicle_type, service_type, start_date, end_date)

    // Mảng chứa các tham số hợp lệ
    const queryParams = []

    // Kiểm tra từng tham số và chỉ thêm vào mảng nếu không phải chuỗi rỗng
    if (location !== '') queryParams.push(`location=${location}`)
    if (manufacturer !== '') queryParams.push(`manufacturer=${manufacturer}`)
    if (vehicle_type !== '') queryParams.push(`vehicle_type=${vehicle_type}`)
    if (service_type !== '') queryParams.push(`service_type=${service_type}`)
    if (start_date !== '') queryParams.push(`start_date=${start_date}`)
    if (end_date !== '') queryParams.push(`end_date=${end_date}`)

    // Xây dựng chuỗi query string từ mảng các tham số hợp lệ
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

    // Gửi yêu cầu HTTP với query string đã xây dựng
    const response = await httpRequestV2.get(`user/vehicle-register/filters-rental-service${queryString}`)
    console.log('response ===', response)
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

