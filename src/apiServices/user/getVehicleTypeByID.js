// import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getVehicleTypeByID = async (id) => {
  try {
    const response = await httpRequest.get(`/v1/vehicle-types/${id}`, 
    //   {
    //   headers: {
    //     Authorization: `Bearer ${getAccessToken()}`,
    //   },
    // }
  )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
