import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const orderTicket = async (
  customerName,
  customerPhoneNumber,
  busTripScheduleId,
  numberOfTicket,
  departureDate,
  province,
  voucherId,
) => {
  try {
    const payload = {
      customerName,
      customerPhoneNumber,
      busTripScheduleId,
      numberOfTicket: Number(numberOfTicket),
      departureDate,
      province,
    }
    if (voucherId) {
      payload.voucherId = voucherId
    }
    const response = await httpRequest.post('/v1/orderBusTrips', payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to order ticket: ', error)
    throw httpRequest.getMessage(error)
  }
}
