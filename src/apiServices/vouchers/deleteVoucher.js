import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const deleteVoucher = async (voucherId) => {
    try {
        const response = await httpRequest.DELETE(`/v1/vouchers/${voucherId}`, {
            headers: {
                Authorization: 'Bearer ' + getAccessToken()
            }
        })
        return response
    }
    catch (error) {
        console.error('Failed to delete voucher: ', error)
    }
}