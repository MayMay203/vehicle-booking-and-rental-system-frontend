import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getAllAccounts = async (email, active, page = 1, size = 1) => {
  console.log('GET ALL ACCOUNTS: ', active)
  try {
    const params = {
      size: size,
      page: page,
      filter: `active:${active}${email ? ` and email='${email}'` : ''}`, // Kết hợp filter
    }

    const response = await httpRequest.get('/v1/accounts', {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}