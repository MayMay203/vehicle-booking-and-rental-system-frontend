import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getOrderOfBusTrip = async (id, date) => {
  try {
    const response = await httpRequest.get(`/v1/orderBusTrips/customer?busTripScheduleId=${id}&orderDate=${date}`, {
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