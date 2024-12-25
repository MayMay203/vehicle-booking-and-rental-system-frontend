import { config } from '~/config'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getAllAccounts = async (email, active, page = 1) => {
  try {
    const params = {
      size: config.constants.pagesize,
      page: page,
      filter: `active:${active}${email ? ` and email~'${email}'` : ''} and accountRole.role.name~'USER'`, // Kết hợp filter
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