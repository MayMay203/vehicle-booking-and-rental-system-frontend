import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const updateDropOffs = async (data) => {
  try {
    const response = await httpRequest.patch('v1/dropOffLocations', data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log('update bus trip: data--', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
