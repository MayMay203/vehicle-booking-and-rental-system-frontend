import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const statsRevenueRental = async (statsBy, year) => {
  try {
    let url
    if (statsBy==='ByMonth'){
      url = `?year=${year}`
    } else if (statsBy === 'ByYear') {
      url = ''
    }
    const response = await httpRequest.get(`/v1/vehicle-rental-statistic/revenue${url}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('statsRevenueRental', response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
