import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const updateFeeService = async (id, name, price, description) => {
  try {
    const response = await httpRequest.put(
      '/v1/vehicle-types',
      {
        id,
        name,
        price,
        description,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (err) {
    console.error('Failed to update fee service: ', err)
  }
}
