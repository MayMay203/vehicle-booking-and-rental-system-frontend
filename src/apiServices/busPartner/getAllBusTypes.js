import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getAllBusTypes = async () => {
  try {
    const response = await httpRequest.get('/v1/bus-types-all', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}