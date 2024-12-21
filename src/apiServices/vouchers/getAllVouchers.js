import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllVouchers = async (page=1) => {
  try {
    const response = await httpRequest.get(`/v1/vouchers?size=6&page=${page}&filter=expired:false`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get all vouchers', error)
  }
}
