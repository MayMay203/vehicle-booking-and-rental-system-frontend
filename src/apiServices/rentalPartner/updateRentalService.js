import * as httpRequestV2 from '~/utils/httpRequestV2'
import { getAccessToken } from '~/utils/cookieUtils'
export const updateRentalService = async (formData) => {
  try {
    const response = await httpRequestV2.patch('user/vehicle-register/update-vehicle-rental-service', formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequestV2.getMessage(error)
  }
}
