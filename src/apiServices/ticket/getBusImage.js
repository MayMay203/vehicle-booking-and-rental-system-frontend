import * as httpRequest from '~/utils/httpRequest'
export const getBusImage = async (idBus) => {
  try {
    const response = await httpRequest.get(`/v1/user/busTripSchedules/imagesOfBus/${idBus}`);
    return response.data
  } catch (error) {
    console.error('Failed to get bus images: ', error)
  }
}
