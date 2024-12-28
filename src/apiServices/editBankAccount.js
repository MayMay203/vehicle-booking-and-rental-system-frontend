import { getAccessToken } from '~/utils/cookieUtils'
import * as httpRequest from '~/utils/httpRequest'

export const editBankAccount = async (bankAccountId, accountNumber, accountHolderName, bankName) => {
  try {
    await httpRequest.put(
      '/v1/bankAccount',
      {
        bankAccountId,
        accountNumber,
        accountHolderName,
        bankName,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getAccessToken(),
        },
      },
    )
  } catch (error) {
    console.error('Failed to edit bank account: ', error)
  }
}
