import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'
export const getAllAccounts = async (page, size=6, email) => {
    try {
        let url = `/v1/accounts`
        let params = []
        if (page !== undefined) {
            params.push(`page=${page}`)
        }
        if (size!== undefined) {
            params.push(`size=${size}`)
        }
        if (email !== undefined && email !== '') {
            params.push(`email=${email}`)
        } 

        if (params.length > 0) {
            url += `?${params.join('&')}`   
        }

        const response = await httpRequest.get(url, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        })
        return response.data
    }
    catch (error) {
        console.error(error)
    }
}