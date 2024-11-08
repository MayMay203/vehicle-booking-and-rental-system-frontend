import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const cancelDriverPartner = async (partnerId, reasonCancel) => {
  try {
    const response = await httpRequest.DELETE(
      '/v1/drivers/cancel-partnership',
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
      {
        formRegisterId: partnerId,
        partnerType: 'DRIVER',
        reasonCancel,
      },
    )
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
