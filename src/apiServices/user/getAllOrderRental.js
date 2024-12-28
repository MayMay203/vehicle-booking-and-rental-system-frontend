import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllOrderRental = async (status) => {
  try {
    let url = `v1/vehicle-rental-order/get-all-orders-user?`
    if (status === 'canceled') {
      url += `status=canceled`
    } else if (status === 'current') {
      url += `status=not_returned`
    } else if (status === 'completed') {
      url += `status=returned`
    }
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    console.log("list order rental in user:", response.data)
    return response.data
  } catch (error) {
    console.log('Failed to get all ticket orders', error)
  }
}
