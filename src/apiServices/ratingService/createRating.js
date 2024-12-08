import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const createRating = async (orderId, ratingValue, comment) => {
  console.log(orderId, ratingValue, comment)
  try {
    const response = await httpRequest.post(
      '/v1/ratings',
      {
        orderId,
        ratingValue,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log('Failed to send rating', error)
  }
}
