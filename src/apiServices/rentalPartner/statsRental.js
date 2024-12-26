import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const statsRental = async (location, vehicleType, year, month, startDate, endDate, statsBy) => {
  try {
    console.log('statsBy stats rental:', statsBy)
    let url
    if (statsBy === 'month') {
      url = `/v1/vehicle-rental-statistic/statistic-from-location-or-vehicleType-by-month-and-year?location=${location}&vehicle_type=${vehicleType}&month=${month}&year=${year}`
    } else if (statsBy === 'year') {
      url = `/v1/vehicle-rental-statistic/statistic-from-location-or-vehicleType-by-year?location=${location}&vehicle_type=${vehicleType}&year=${year}`
    } else if (statsBy === 'date') {
      url = `/v1/vehicle-rental-statistic/statistic-from-location-or-vehicleType-by-date?location=${location}&vehicle_type=${vehicleType}&&start_date=${startDate}&end_date=${endDate}`
    }
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log("response stats rental:", response)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
