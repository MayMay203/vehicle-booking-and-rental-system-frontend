import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getIDServiceByIDRegister = async (id) => {
  try {
    const response = await httpRequest.get(
      `/user/vehicle-register/get-vehicle-rental-service-by-vehicle-register?vehicleRegisterId=${id}`,
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
