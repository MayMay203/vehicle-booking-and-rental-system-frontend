import { getAccessToken } from '~/utils/cookieUtils'
import * as htppRequest from '~/utils/httpRequest'
export const updatRating = async (ratingId, ratingValue, comment) => {
  try {
    const response = await htppRequest.patch(
      `/v1/ratings`,
      {
        ratingId,
        ratingValue,
        comment,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
    return response
  } catch (error) {
    console.log('Failed to delete rating: ', error)
  }
}
