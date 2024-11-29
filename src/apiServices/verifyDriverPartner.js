import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const verifyDriverPartner = async (idRegister) => {
  try {
    const response = await httpRequest.put(
      `/v1/drivers/verify?formRegisterId=${idRegister}`,
      {},
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
