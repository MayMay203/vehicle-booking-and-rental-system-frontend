// import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getVehicleRentalByIDRegis = async (id) => {
  try {
    const response = await httpRequest.get(
      `user/vehicle-register/get-vehicle-register?vehicle_register_id=${id}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${getAccessToken()}`,
      //   },
      // },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
