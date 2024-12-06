import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllMessagesInConversation = async (conversationId) => {
  try {
    const response = await httpRequest.get(
      `/v1/chat/get-message-by-conversation-id?conversation_id=${conversationId}`,
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to get all messages in conversation: ', error)
  }
}
