import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const lockAccount = async (id, lockReason) => {
  try {
    const response = await httpRequest.put(
      `/v1/accounts/deactivate?idAccount=${id}`,
      {
        id,
        lockReason,
      },
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
