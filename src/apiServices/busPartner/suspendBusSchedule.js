import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const suspendBusSchedule = async (id, status) => {
  try {
    const response = await httpRequest.patch(
      `/v1/busTripSchedules/${id}/status?suspended=${status}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
