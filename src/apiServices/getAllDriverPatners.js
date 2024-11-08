import { config } from '~/config'
import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getAllDriverPartners = async (status, email, page = 1) => {
  console.log(status)
  try {
    const params = {
      size: config.variables.pagesize,
      page: page,
      filter: `approvalStatus:'${status}'`,
    }
    const response = await httpRequest.get('/v1/drivers', {
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
