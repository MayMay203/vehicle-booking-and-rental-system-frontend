import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelDriverPartner = async (partnerId, reason) => {
  console.log(partnerId)
  try {
    const response = await httpRequest.put(
      '/v1/drivers/cancel-partnership',
      {
        formRegisterId: partnerId,
        partnerType: 'DRIVER',
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
    throw httpRequest.getMessage(error)
  }
}
