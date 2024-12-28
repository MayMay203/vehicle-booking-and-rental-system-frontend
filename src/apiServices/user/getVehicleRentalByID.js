// import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getVehicleRentalByID = async (id) => {
  try {
    const response = await httpRequest.get(
      `/user/vehicle-register/get-vehicle-rental-service?vehicle_rental_service_id=${id}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${getAccessToken()}`,
      //   },
      // },
    )
    console.log("--repsonse infor rental by id service:", response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
