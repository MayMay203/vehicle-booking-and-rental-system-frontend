import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getFeeService = async(idVehicleType) => {
  try {
    const response =await httpRequest.get(`/v1/vehicle-types?idVehicleType=${idVehicleType}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (err) {
    console.log('Failed to get fee services by Id: ', err)
  }
}
