import * as httpRequest from '~/utils/httpRequest'

export const getPickReturnLocations = async (busTripSchdeduleId, arrivalProvince) => {
  console.log(busTripSchdeduleId, arrivalProvince)
  try {
    const response = await httpRequest.get(
      `/v1/user/busTripSchedules/pickup-dropOff-locations?busTripScheduleId=${busTripSchdeduleId}&arrivalProvince=${arrivalProvince}`,
    )
    return response.data
  } catch (error) {
    console.log('Failed to get pickup and drop off locations ', error)
  }
}
