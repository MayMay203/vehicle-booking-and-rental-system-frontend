import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getAllOrderByServiceID = async (id) => {
  try {
    const response = await httpRequest.get(`/v1/vehicle-rental-order/get-orders-by-service-id?service_id=${id}`, {
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
