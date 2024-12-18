import * as httpRequest from '~/utils/httpRequest'

export const getAllVouchersInSystem = async () => {
  try {
    const response = await httpRequest.get(`/v1/vouchers/for-users`)
    return response.data
  } catch (error) {
    console.log('Failed to get all vouchers in system', error)
  }
}
