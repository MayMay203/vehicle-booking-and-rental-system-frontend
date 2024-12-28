import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllVehicleRental = async (typeService, status) => {
  try {
    const response = await httpRequest.get(
      `/user/vehicle-register/all?service_type=${typeService}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
