import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const updateBusType = async (id, name, numberOfSeat, chairType) => {
  try {
    const response = await httpRequest.put(
      '/v1/bus-types',
      {
        id,
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
