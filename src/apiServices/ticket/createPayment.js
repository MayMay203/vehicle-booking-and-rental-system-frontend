import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const createPayment = async (key) => {
  try {
    const response = await httpRequest.get(`/v1/orders/create-payment?key=${key}`, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data.paymentUrl
  } catch (error) {
    console.error(error)
    throw httpRequest.getMessage(error)
  }
}
