import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getVouchersForUser = async () => {
  try {
    const response = await httpRequest.get(`/v1/vouchers/for-users`, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get all vouchers', error)
  }
}
