import * as httpRequest from '~/utils/httpRequest'

export const getPickReturnLocations = async (busTripId) => {
  try {
    const response = await httpRequest.get(`/v1/user/busTripSchedules/pickup-dropOff-locations/${busTripId}`, )
    return response.data
  } catch (error) {
    console.log('Failed to get pickup and drop off locations ', error)
  }
}
