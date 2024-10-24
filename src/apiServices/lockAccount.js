import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const lockAccount = async (id) => {
  try {
    const response = await httpRequest.put(`/v1/accounts?idAccount=${id}`,{}, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
