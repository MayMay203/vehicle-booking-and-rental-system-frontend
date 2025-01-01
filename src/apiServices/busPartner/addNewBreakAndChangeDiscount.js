import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const addNewBreakAndChangeDiscount = async (data) => {
  try {
    const response = await httpRequest.post('/v1/busTripSchedules/breakDays', data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('addNewBreakAndChangeDiscount: data--', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
