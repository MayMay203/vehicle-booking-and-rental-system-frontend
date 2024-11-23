import * as httpRequest from '~/utils/httpRequest'
export const getBusUtilities = async (idBus) => {
  try {
    const response = await httpRequest.get(`/v1/user/busTripSchedules/utilities/${idBus}`)
    return response.data
  } catch (error) {
    console.error('Failed to get utilities: ', error)
  }
}
