import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const updateUnseenMessages = async (conversationId, idAccount, roleAccount) => {
    console.log('Vô rồi nè!')
    console.log(idAccount, roleAccount)
  try {
    const response = await httpRequest.post(
      `/v1/chat/update-unseen-message?conversation_id=${conversationId}&account_id=${Number(idAccount)}&account_type=${roleAccount}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
      )
      console.log(response)
    return response
  } catch (error) {
    console.error('Failed to update unseen messages: ', error)
  }
}
