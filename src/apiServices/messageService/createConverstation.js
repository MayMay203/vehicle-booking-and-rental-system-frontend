import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const createCoversation = async (senderId, senderType, recipientId, recepientType) => {
  // console.log(senderId, senderType, recipientId, recepientType)
  try {
    const response = await httpRequest.post(
      `/v1/chat/create-conversation?sender_id=${senderId}&sender_type=${senderType}&recipient_id=${recipientId}&recipient_type=${recepientType}`,{},
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data.data
  } catch (err) {
    console.error('Failed to create coversation: ', err)
  }
}
