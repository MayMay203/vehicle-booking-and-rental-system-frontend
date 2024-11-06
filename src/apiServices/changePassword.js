import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '../utils/httpRequest'

export const changePassword = async (currentPassword, newPassword, confirmPassword) => {
  try {
    const response = await httpRequest.put(
    `/v1/accounts/update-password`,
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
