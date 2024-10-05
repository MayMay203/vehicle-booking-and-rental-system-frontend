import httpRequest from '~/utils/httpRequest'

export const login = async (email, password) => {
  console.log(email)
  console.log(password)
  try {
    const response = await httpRequest.post('/api/v1/auth/login', {
        username: email,
        password
    })
    return response.data
  } catch (error) {
    console.log('Failed to login: ', error)
  }
}
