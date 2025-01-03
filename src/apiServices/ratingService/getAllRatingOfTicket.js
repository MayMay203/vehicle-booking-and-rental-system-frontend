import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllRatingOfTicket = async (busTripSchedule) => {
  try {
    const response = await httpRequest.get(
      `/v1/ratings?filter=order.orderBusTrip.busTripSchedule.id=${busTripSchedule}`,
      {
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
     console.log('lisst rating trar ve:', response.data)
    return response.data
  } catch (error) {
    console.log('Failed to get all rating of order', error)
  }
}
