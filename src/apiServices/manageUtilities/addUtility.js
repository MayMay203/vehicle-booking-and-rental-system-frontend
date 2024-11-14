import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const addUtility = async (formData) => {
  try {
    const response = await httpRequest.post('/v1/utilities', formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to add utility:', error)
  }
}
