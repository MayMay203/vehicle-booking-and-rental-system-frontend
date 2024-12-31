import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const checkScheduleHasOrder = async (id) => {
  try {
    const response = await httpRequest.get(`/v1/busTripSchedules/${id}/hasOrders`, {
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
