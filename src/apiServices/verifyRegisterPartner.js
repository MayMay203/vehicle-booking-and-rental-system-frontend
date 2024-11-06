import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const verifyRegisterParter = async (idRegister, partnerType) => {
    try {
        const response = await httpRequest.put(
            `/v1/business-partner/verify?formRegisterId=${idRegister}&partnerType=${partnerType}`, {}, {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
              },
          }
        )
        return response.data
    }
    catch (error) {
        console.error(error)
    }
}