import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getDetailDriverPartner = async (id) => {
  try {
    const response = await httpRequest.get(`/v1/drivers/detail?formRegisterId=${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
