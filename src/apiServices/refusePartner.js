import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const refusePartner = async (formRegisterId, reason) => {
  try {
    const response = await httpRequest.DELETE(
      '/v1/business-partner/refuse-register',
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
      {
        formRegisterId,
        reason,
        refuse: true,
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to refuse partner: ', error)
  }
}
