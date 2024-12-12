import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const updateStatusNotification = async (accountId, accountType, notificationId) => {
  try {
    await httpRequest.post(
      `/v1/notification/update-unseen-notification?account_id=${accountId}&account_type=${accountType}&notification_id=${notificationId}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
  } catch (error) {
    console.log('Failed to update status notification: ', error)
  }
}
