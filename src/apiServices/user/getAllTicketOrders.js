import { config } from '~/config'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllTicketOrders = async (status, isCancel = 0, page = 1) => {
  console.log(status, isCancel, page)
  try {
    let url = `/v1/orderBusTrips?page=${page}&size=${config.variables.pagesize}`
    if (isCancel === 1) {
      url += `&filter=status: ${isCancel}`
    } else {
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
