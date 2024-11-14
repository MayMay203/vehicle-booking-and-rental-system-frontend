import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelPartner = async (partnerId, reason) => {
  try {
    const response = await httpRequest.put(
      '/v1/business-partner/cancel-partnership',
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
    throw httpRequest.getMessage(error)
  }
}
