import * as httpRequest from '~/utils/httpRequest'

export const register = async (email, password, confirmPassword) => {
  try {
    const response = await httpRequest.post('/v1/auth/register', {
      email,
      password,
      confirmPassword,
    })
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
