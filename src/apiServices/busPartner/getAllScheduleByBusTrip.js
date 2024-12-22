import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getAllScheduleByBusTrip = async (date, id) => {
  try {
    console.log("cos vo goi ne")
    const response = await httpRequest.get(`/v1/busTripSchedules/get-all?departureDate=${date}&busTripId=${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log("response datat:", response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
