import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getVoucherById = async (voucherId) => {
  try {
    const response = await httpRequest.get(`/v1/vouchers/${voucherId}`, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (error) {
    console.error('Failed to get voucher by ID: ', error)
  }
}
