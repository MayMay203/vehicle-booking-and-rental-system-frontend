import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllRatingOfRental = async (idService) => {
  try {
    const response = await httpRequest.get(`/v1/ratings?filter=order.carRentalOrders.carRentalService=${idService}`, {
      header: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('lisst rating trar ve:', response.data)
    return response.data
  } catch (error) {
    console.log('Failed to get all rating of order', error)
  }
}
