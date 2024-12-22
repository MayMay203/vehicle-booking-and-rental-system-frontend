import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getMessageById = async (messageId) => {
  try {
    const response = await httpRequest.get(`/v1/chat/get-message-by-id?messageId=${messageId}`, {
      headers: {
        Authorization: 'Bearer ' + getAccessToken(),
      },
    })
    return response.data
  } catch (error) {
    console.log('Failed to get message: ', error)
  }
}
