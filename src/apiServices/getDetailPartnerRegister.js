import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getDetailPartnerRegister = async (id, partnerType) => {
  try {
    const response = await httpRequest.get(
      `/v1/business-partner/detail?formRegisterId=${id}&partnerType=${partnerType}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
