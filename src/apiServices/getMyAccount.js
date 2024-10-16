import * as httpRequest from '~/utils/httpRequest'

export const getMyAccount = async () => {
  try {
    const response = await httpRequest.get('/v1/auth/account', {
      headers: {
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    })
    return response.data
  } catch (error) {
    console.log('Failedto get my account: ', error)
  }
}
