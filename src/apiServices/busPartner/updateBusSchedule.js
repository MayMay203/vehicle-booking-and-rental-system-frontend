import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const updateBusSchedule = async (data) => {
  try {
    const response = await httpRequest.put('/v1/busTripSchedules/breakDays', data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('update bus schedule: data--', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
