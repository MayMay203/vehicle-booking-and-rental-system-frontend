import * as httpRequest from '../utils/httpRequest'

export const registerInfo = async (formData) => {
  try {
    const response = await httpRequest.post('/v1/auth/register-info', formData)
    return response.data
  } catch (error) {
      console.log(error)
    throw httpRequest.getMessage(error)
  }
}

