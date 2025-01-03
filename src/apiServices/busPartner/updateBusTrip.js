import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const updateBusTrip = async (data) => {
  try {
    const response = await httpRequest.put(
      'v1/busTrips',
      data,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    console.log('update bus trip: data--', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
