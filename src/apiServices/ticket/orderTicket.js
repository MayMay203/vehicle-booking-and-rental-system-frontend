import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const orderTicket = async (
  customerName,
  customerPhoneNumber,
  busTripScheduleId,
  numberOfTicket,
  departureDate,
  province
) => {
  try {
    const response = await httpRequest.post(
      '/v1/orderBusTrips',
      {
        customerName,
        customerPhoneNumber,
        busTripScheduleId,
        numberOfTicket: Number(numberOfTicket),
        departureDate,
        province
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Failed to order ticket: ', error)
    throw httpRequest.getMessage(error)
  }
}
