import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '../utils/httpRequest'
export const logout = async () => {
  console.log(getAccessToken())
  try {
    const response = await httpRequest.post(
      '/v1/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
