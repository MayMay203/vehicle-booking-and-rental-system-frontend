import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelTicket = async (orderId) => {
  try {
    const response = await httpRequest.patch(
      `/v1/orderBusTrips/cancel-order/${orderId}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw httpRequest.getMessage(error)
  }
}
