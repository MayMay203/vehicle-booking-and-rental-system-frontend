import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const cancelScheduleOneDay = async (id, date) => {
  try {
    const response = await httpRequest.patch(`/v1/busTripSchedules/${id}?cancelDate=${date}`,{}, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
