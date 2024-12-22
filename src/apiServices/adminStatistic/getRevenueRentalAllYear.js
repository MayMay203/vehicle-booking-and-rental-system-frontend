import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getRevenueRentalAllYears = async (year) => {
  try {
    let url = '/v1/vehicle-rental-statistic/get-monthly-venue-in-year'
    if (year) url += `?year=${year}`
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get revenue bus all years', error)
  }
}
