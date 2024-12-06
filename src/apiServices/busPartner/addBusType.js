import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const addBusType = async (name, numberOfSeat, chairType) => {
  try {
    const response = await httpRequest.post(
      '/v1/bus-types',
      {
        name,
        numberOfSeat,
        chairType,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
