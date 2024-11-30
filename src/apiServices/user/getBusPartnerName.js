import * as httpRequest from '~/utils/httpRequest'

export const getBusinessName = async () => {
  try {
      const response = await httpRequest.get('/v1/bus-partner/businessName')
      console.log(response)
      return response.data
  } catch (error) {
    console.log('Failed to get business name: ', error)
  }
}
