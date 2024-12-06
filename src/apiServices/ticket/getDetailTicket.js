import * as httpRequest from '~/utils/httpRequest'

export const getDetailTicket = async (busTripScheduleId, departureDate, arrivalProvince) => {
  try {
    const response = await httpRequest.get(
      `/v1/user/busTripSchedules/detail?busTripScheduleId=${busTripScheduleId}&departureDate=${departureDate}&arrivalProvince=${arrivalProvince}`,
    )
    return response.data
  } catch (error) {
    console.log('Failed to get ticket detail: ', error)
  }
}
