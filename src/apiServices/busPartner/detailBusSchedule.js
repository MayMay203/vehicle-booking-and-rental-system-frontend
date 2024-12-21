import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const detailBusSchedule = async (id, date) => {
  try {
    const response = await httpRequest.get(
      `/v1/busTripSchedules/detail?busTripScheduleId=${id}&departureDate=${date}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
