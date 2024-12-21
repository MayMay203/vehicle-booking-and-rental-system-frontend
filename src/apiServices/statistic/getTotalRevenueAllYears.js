import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getTotalRevenueAllYears = async() => {
    try {
        const response = await httpRequest.get('/v1/statistic/revenue', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Failed to get total revenue of all years: ', error)
    }
}