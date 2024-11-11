import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const updateUtility = (formData) => {
  try {
    const response = httpRequest.put('/v1/utilities', formData, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (err) {
    console.error('Failed to update utility: ', err)
  }
}
