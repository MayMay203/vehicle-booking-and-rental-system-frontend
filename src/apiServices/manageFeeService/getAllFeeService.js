import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllFeeServices = async (name) => {
  try {
    const params = name ? { filter: `name~'${name}'` } : {}
    const response = await httpRequest.get('/v1/vehicle-types-all', {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (err) {
    console.log('Failed to get all fee services: ', err)
  }
}
