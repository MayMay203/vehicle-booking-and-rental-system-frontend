import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const getAllNotifications = async (accountId, roleAccount) => {
  console.log(accountId, roleAccount)
  try {
    const response = await httpRequest.get(
      `/v1/notification/get-notification-by-userId?account_id=${accountId}&account_type=${roleAccount}`, {
        headers: {
          Authorization: 'Bearer ' + getAccessToken()
        }
      }
    )
    console.log(response)
    return response.data
  } catch (error) {
    console.log('Failed to get all notifications: ', error)
  }
}
