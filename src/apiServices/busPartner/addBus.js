import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const addBus = async (formData) => {
  try {
    const response = await httpRequest.post('/v1/buses', formData, {
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
