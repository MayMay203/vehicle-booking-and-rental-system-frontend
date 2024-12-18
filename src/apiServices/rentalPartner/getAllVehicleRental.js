import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequestV2 from '~/utils/httpRequestV2'

export const getAllVehicleRental = async (typeService, status) => {
  try {
    const response = await httpRequestV2.get(
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
