import * as httpRequest from '~/utils/httpRequest'

export const checkTokenReset = async(token) => {
  try {
    const response = await httpRequest.get(`/v1/auth/verify-token?token=${token}`)
    return response.data
  } catch (error) {
    console.log('Failed to check token: ', error)
  }
}
