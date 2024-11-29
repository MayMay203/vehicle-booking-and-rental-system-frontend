import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelDriverPartner = async (partnerId, reason) => {
  console.log(partnerId)
  try {
    const response = await httpRequest.put(
      '/v1/drivers/cancel-partnership',
      {
        formRegisterId: partnerId,
        reason,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
