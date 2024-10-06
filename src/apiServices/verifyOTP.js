import httpRequest from '~/utils/httpRequest'

export const verifyOTP = async (email, otp) => {
  console.log(email)
  console.log(otp)
  try {
    const response = await httpRequest.post('/api/v1/auth/verify', {
      email,
      otp,
    })
    return response.data
  } catch (error) {
    console.log('Failed to verify OTP: ', error)
  }
}
