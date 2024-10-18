import * as httpRequest from '~/utils/httpRequest'

export const loginWithGoogle = async (code) => {
  try {
    const response = await httpRequest.post(`http://localhost:8080/identity/auth/outbound/authentication?code=${code}`)
    return response.data
  } catch (error) {
    console.log('Faild to login with google', error)
  }
}
