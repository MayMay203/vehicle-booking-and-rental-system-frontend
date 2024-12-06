import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllConversation = async (accountId, roleAccount) => {
  try {
    const response = await httpRequest.get(
      `/v1/chat/get-connected-account?account_id=${accountId}&role_account=${roleAccount}`,
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response.data
  } catch (err) {
    console.error('Failed to get all coversation: ', err)
  }
}
