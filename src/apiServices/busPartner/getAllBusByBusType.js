import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getAllBusByBusType = async (nameBusType) => {
  try {
    const response = await httpRequest.get(`/v1/buses/by-bus-type?nameBusType=${nameBusType}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
