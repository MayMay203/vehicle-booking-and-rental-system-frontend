import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelRentalOrder = async (orderId) => {
  try {
    const response = await httpRequest.post(
      `v1/vehicle-rental-order/canceled-vehicle-rental-order?vehicleRentalOrderId=${orderId}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    console.log('vehicleRentalOrderId hủy:----', orderId)
    return response.data
  } catch (error) {
    console.error(error)
    throw httpRequest.getMessage(error)
  }
}
