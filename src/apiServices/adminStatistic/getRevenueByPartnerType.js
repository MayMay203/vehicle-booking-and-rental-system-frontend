import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getRevenueByPartnerType = async (month, year, businessPartnerType) => {
  try {
    const response = await httpRequest.get(
      `/v1/statistic/revenue-of-business-partner?month=${month}&year=${year}&partnerType=${businessPartnerType}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to get customer transaction ', error)
  }
}
