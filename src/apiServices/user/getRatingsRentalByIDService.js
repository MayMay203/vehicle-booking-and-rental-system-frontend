import * as httpRequest from '~/utils/httpRequest'
export const getRatingsRentalByIDService = async (id) => {
  try {
    const response = await httpRequest.get(`v1/ratings?filter=order.carRentalOrders.carRentalService.id=${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
