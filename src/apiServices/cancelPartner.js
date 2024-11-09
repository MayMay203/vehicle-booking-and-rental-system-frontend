import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelPartner = async (partnerId, partnerType, reason) => {
  try {
    const response = await httpRequest.DELETE(
      '/v1/business-partner/cancel-partnership',
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
      {
        formRegisterId: partnerId,
        partnerType,
        reason,
      },
    )
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
