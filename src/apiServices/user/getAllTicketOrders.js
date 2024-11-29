import { config } from '~/config'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllTicketOrders = async (status, page = 1) => {
  try {
    const response = await httpRequest.get(
      `/v1/orderBusTrips?page=${page}&size=${config.variables.pagesize}&isGone=${status}`,
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to get all ticket orders', error)
  }
}
