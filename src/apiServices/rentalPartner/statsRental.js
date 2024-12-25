import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const statsRental = async (location, vehicleType, year, month, startDate, endDate, statsBy) => {
  try {
    let url
    if (statsBy === 'ByMonth') {
      url = `/v1/vehicle-rental-statistic/statistic-from-location-or-vehicleType-by-year?location=${location}&vehicle_type=${vehicleType}&month=${month}&year=${year}`
    } else if (statsBy === 'ByYear') {
      url = `/v1/vehicle-rental-statistic/statistic-from-location-or-vehicleType-by-year?location=${location}&vehicle_type=${vehicleType}&year=${year}`
    } else if (statsBy === 'ByDate') {
      url = `/v1/vehicle-rental-statistic/statistic-from-location-or-vehicleType-by-year?location=${location}&vehicle_type=${vehicleType}&&start_date=${startDate}&end_date=${endDate}`
    }
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
