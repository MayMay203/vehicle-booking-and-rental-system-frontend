import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getRevenueAllYears = async (year) => {
  try {
    let url = '/v1/statistic/revenue'
    if (year) url += `?year=${year}`
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log('Failed to get all revenue all years', error)
  }
}
