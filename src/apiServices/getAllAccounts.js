import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getAllAccounts = async (email, active, page = 1, size = 1) => {
  console.log('GET ALL ACCOUNTS: ', active)
  try {
    let url = `/v1/accounts?size=${size}&page=${page}&filter=active:${active}`
    if (email !== undefined && email !== '') {
      url += ` and email=~'${email}'`
    }
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}