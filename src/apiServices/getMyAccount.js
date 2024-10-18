import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getMyAccount = async () => {
  try {
    const response = await httpRequest.get('/v1/account', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get my account: ', error)
  }
}
