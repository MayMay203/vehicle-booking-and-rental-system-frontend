import { config } from '~/config'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllOrderRental = async (isCancel, page = 1, status) => {
  try {
    let url = `/v1/orderBusTrips?page=${page}&size=${config.constants.pagesize}&filter=status:${isCancel}`
    if (isCancel === 0) {
      url += `&isGone=${status}`
    }
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get all ticket orders', error)
  }
}
