import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllUtilities = async (name = '') => {
  try {
    const params = name ? { filter: `name~'${name}'` } : {}
    const response = await httpRequest.get('/v1/utilities-all', {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (err) {
    console.log('Failed to get all utilities: ', err)
  }
}
