import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const deleteUtility = async (idUtility) => {
  try {
    const response = await httpRequest.DELETE(`/v1/utilities?idUtility=${idUtility}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
