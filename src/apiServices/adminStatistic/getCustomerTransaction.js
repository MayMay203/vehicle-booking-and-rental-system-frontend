import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getCustomerTransaction = async (month, year, businessPartnerId) => {
  try {
    const response = await httpRequest.get(
      `/v1/statistic/customer-of-partner?month=${month}&year=${year}&businessPartnerId=${year}`,
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to get customer transaction ', error)
  }
}
