import { config } from '~/config'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getAllPartners = async (partnerType, status, emailOfRepresentative, page = 1) => {
  try {
    const params = {
      size: config.constants.pagesize,
      page: page,
      filter: `partnerType:'${partnerType}' and approvalStatus:'${status}'${
        emailOfRepresentative ? ` and emailOfRepresentative~'${emailOfRepresentative}'` : ''
      }`,
    }
    const response = await httpRequest.get('/v1/business-partners', {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error data:', error)
  }
}
