import * as httpRequest from '../utils/httpRequest'

export const forgetPassword = async (email) => {
  try {
    const response = await httpRequest.get(`/v1/auth/forgot-password?email=${email}`)
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
