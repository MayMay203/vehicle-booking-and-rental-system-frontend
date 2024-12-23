import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const statsRevenueBus = async (statsBy, year) => {
  try {
    let url
    if (statsBy==='ByMonth'){
      url = `?year=${year}`
    } else if (statsBy === 'ByYear') {
      url = ''
    }
    const response = await httpRequest.get(`/v1/bus-trip-order/statistics/revenue${url}`, {
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
