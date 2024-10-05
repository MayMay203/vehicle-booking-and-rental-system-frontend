import httpRequest from '~/utils/httpRequest'

export const register = async (email, password, confirmPassword) => {
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
  try {
    const response = await httpRequest.post('/api/v1/auth/register', {
      email,
      password,
      confirmPassword,
    })
    return response.data
  } catch (error) {
    console.log('Failed to register: ', error)
  }
}
