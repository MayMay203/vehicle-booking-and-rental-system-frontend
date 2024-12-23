import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getAllOrder = async (nameBusType) => {
  try {
    const response = await httpRequest.get(`/v1/vehicle-rental-order/get-all-orders`, {
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
