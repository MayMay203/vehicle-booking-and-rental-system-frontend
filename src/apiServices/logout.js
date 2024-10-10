import * as httpRequest from '../utils/httpRequest'
export const logout = async () => {
  console.log(document.cookie.split('=')[1])
  try {
    const response = await httpRequest.post(
      '/v1/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw httpRequest.getMessage(error)
  }
}
