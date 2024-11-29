import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getDetailTransaction = async (transactionCode, orderType) => {
  try {
    const response = await httpRequest.get(
      `/v1/orders/detail?transactionCode=${transactionCode}&orderType=${orderType}`,
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to get transaction details: ', error)
  }
}
