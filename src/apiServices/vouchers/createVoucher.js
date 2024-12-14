import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const createVoucher = async (voucherInfo) => {
    console.log(voucherInfo)
  try {
    const response = await httpRequest.post(
      '/v1/vouchers',
      {
        ...voucherInfo,
      },
      {
        headers: {
         Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to add new voucher' + error)
  }
}
