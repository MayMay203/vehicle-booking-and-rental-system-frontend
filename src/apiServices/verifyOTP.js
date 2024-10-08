import * as httpRequest from '~/utils/httpRequest'

export const verifyOTP = async (email, otp) => {
  try {
    const response = await httpRequest.post('/api/v1/auth/verify', {
      email,
      otp,
    })
    return response.data
  } catch (error) {
    httpRequest.getMessage(error)
  }
}
