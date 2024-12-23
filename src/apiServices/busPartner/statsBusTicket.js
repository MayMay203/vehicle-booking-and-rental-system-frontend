import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const statsBusTicket = async (route, year, month, startDate, endDate, statsBy) => {
  try {
    let url
    if (statsBy === 'year') {
      if (route === '') {
        url = `?year=${year}`
      } else {
        url = `?route=${route}&year=${year}`
      }
    } else if (statsBy === 'month') {
      if (route === '') {
        url = `?month=${month}&year=${year}`
      } else {
        url = `?route=${route}&month=${month}&year=${year}`
      }
    } else if (statsBy === 'date') {
      if (route === '') {
        url = `?startDate=${startDate}&endDate=${endDate}`
      } else {
        url = `?startDate=${startDate}&endDate=${endDate}&route=${route}`
      }
    }
    const response = await httpRequest.get(`/v1/bus-trip-order/statistics/orders${url}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('tra ve type:', statsBy, '--url:', url, '--response:', response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
