import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '../utils/httpRequest'
export const logoutService = async () => {
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
