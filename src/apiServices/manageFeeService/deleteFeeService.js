import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const deleteFeeService = async (idVehicleType) => {
  try {
    const response = await httpRequest.DELETE(`/v1/vehicle-types?idVehicleType=${idVehicleType}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
