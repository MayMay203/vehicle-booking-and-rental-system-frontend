// import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequestV2 from '~/utils/httpRequestV2'
export const getVehicleRentalByID = async (id) => {
  try {
    const response = await httpRequestV2.get(
      `/user/vehicle-register/get-vehicle-register?vehicle_rental_service_id=${id}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${getAccessToken()}`,
      //   },
      // },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequestV2.getMessage(error)
  }
}
