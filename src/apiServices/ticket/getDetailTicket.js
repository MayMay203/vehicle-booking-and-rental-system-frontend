import * as httpRequest from '~/utils/httpRequest'

export const getDetailTicket = async (busTripScheduleId) => {
  try {
    const response = await httpRequest.get(`/v1/user/busTripSchedules/${busTripScheduleId}`)
    return response.data
  } catch (error) {
    console.log('Failed to get ticket detail: ', error)
  }
}
