import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const orderVehicleRental = async (data) => {
  try {
    const response = await httpRequest.post('/v1/vehicle-rental-order/ordering', data, {
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
