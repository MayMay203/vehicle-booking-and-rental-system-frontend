import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllSuitableVouchers = async (totalOrder) => {
    console.log(totalOrder)
  try {
    const response = await httpRequest.get(`/v1/vouchers/get-voucher-of-account?totalOrder=${totalOrder}`, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get all suitable vouchers', error)
  }
}
