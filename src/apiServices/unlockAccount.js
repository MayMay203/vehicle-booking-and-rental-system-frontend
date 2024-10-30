import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const unlockAccount = async (id) => {
  try {
    const response = await httpRequest.put(
      `/v1/accounts/activate?idAccount=${id}`,
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
