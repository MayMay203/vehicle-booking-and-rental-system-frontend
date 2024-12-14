import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const calculateRentalPrice = async (startDT, endDT, price) => {
  try {
    console.log('prraamm:', startDT, endDT, price)
    const response = await httpRequest.get(
      `/v1/vehicle-rental-order/calculate-price-by-start-and-end-time?start_time=${startDT}&end_time=${endDT}&priceADay=${price}`,
        {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}