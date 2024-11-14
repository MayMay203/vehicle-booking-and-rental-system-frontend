import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const createFeeService = async (name, price, description) => {
  try {
    const response = await httpRequest.post(
      '/v1/vehicle-types',
      {
        name,
        price: parseFloat(price),
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (err) {
    console.log('Failed to get all fee services: ', err)
  }
}
