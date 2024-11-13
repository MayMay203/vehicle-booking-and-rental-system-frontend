import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getUtility = async (id) => {
  try {
    const response = await httpRequest.get(`/v1/utilities?utilityId=${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (err) {
    console.log('Failed to get a utility: ', err)
  }
}
