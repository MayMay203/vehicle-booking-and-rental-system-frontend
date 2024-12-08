import { getAccessToken } from '~/utils/cookieUtils'
import * as htppRequest from '~/utils/httpRequest'
export const deleteRating = async (id) => {
    try {
        const response = await htppRequest.DELETE(`/v1/ratings/${id}`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken()
            }
        })
        return response
    }
    catch (error) {
        console.log('Failed to delete rating: ', error)
    }
}