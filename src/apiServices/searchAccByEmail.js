import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const searchAccByEmail = async (email) => {
  try {
      const response = await httpRequest.get(`v1/accounts?filter=email~'${email}'`, {
          headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
        }
    })
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
