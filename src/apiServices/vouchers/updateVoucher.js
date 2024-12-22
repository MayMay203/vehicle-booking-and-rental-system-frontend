import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const deleteVoucher = async (voucherUpdate) => {
    try {
        const response = await httpRequest.patch(`/v1/vouchers`, {
            ...voucherUpdate
        },{
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