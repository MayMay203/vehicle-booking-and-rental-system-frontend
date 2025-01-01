import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const updateStatusOrder = async (id, status) => {
  try {
    const response = await httpRequest.post(
      `/v1/vehicle-rental-order/update-status-rental-order?rentalOrderId=${id}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    console.log('updateStatusOrder--', response)
    return response
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
