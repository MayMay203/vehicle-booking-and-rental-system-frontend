import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllPartners = async (partnerType, status) => {
    console.log(partnerType, status)
  try {
    let url = `/v1/business-partners?filter=partnerType:'${partnerType}'`
    if (status) {
      url += ` and approvalStatus:'${status}'`
    }
    console.log(url)
    const response = await httpRequest.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
