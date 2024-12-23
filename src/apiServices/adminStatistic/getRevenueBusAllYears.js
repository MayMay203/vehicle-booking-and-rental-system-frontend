import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getRevenueBusAllYears = async (year) => {
  try {
    let url = '/v1/bus-trip-order/statistics/revenue'
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
