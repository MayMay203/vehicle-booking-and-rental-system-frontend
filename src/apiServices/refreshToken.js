import * as httpRequest from '~/utils/httpRequest'
export const refreshToken = async () => {
  try {
    const response = await httpRequest.get('/v1/auth/refresh')
    return response.data
  } catch (error) {
    // console.log('Failed to refresh token: ', error)
  }
}
