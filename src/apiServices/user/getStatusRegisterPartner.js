import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getStatusRegisterPartner = async (typePartner) => {
  try {
    let apiUrl = ''
    let requestConfig = {}
    if (typePartner === 'CAR_RENTAL_PARTNER' || typePartner === 'BUS_PARTNER') {
      apiUrl = '/v1/business-partner/register-status'
      requestConfig = {
        params: { partnerType: typePartner },
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    } else if (typePartner === 'DRIVER') {
      apiUrl = '/v1/drivers/register-status'
      requestConfig = {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    } else {
      throw new Error('Loại đối tác không hợp lệ.')
    }
    const response = await httpRequest.get(apiUrl, requestConfig)
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
