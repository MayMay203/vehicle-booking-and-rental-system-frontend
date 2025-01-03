import * as httpRequest from '~/utils/httpRequest'

export const login = async (email, password) => {
  try {
    const response = await httpRequest.post('/v1/auth/login', {
      username: email,
      password,
    })
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
