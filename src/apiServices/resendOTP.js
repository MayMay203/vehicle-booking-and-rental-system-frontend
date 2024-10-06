import httpRequest from '~/utils/httpRequest'

export const resendOTP = async (email) => {
    console.log(email)
  try {
    const response = await httpRequest.post(`/api/v1/auth/resend_otp?email=${email}`)
    return response.data
  } catch (error) {
    console.log('Failed to resend OTP: ', error)
  }
}
