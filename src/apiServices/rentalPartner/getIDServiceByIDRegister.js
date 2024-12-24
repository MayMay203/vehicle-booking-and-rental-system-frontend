import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequestV2 from '~/utils/httpRequestV2'

export const getIDServiceByIDRegister = async (id) => {
  try {
    const response = await httpRequestV2.get(
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
