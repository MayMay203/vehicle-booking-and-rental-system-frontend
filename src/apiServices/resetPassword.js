import * as httpRequest from '~/utils/httpRequest'

export const resetPassword = async (token, password, confirmPassword) => {
  try {
    const response = await httpRequest.post('/v1/auth/change-password', {
      token,
      password,
      confirmPassword,
    })
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
