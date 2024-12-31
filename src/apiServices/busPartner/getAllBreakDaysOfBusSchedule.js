import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getAllBreakDaysOfBusSchedule = async (id) => {
  try {
    const response = await httpRequest.get(`/v1/busTripSchedules/get-break-days/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('getAllBreakDaysOfBusSchedule--id:', id, "---", response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
