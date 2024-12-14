import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const claimVoucher = async (idVoucher) => {
  try {
    const response = await httpRequest.post(
      `/v1/vouchers/${idVoucher}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response
  } catch (error) {
    throw new Error(error)
  }
}
