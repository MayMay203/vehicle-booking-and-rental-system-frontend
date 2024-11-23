import * as httpRequest from '~/utils/httpRequest'
export const getPoliciesTicket = async (idBusTripSchedule) => {
  try {
    const response = await httpRequest.get(`/v1/user/busTripSchedules/policies/${idBusTripSchedule}`)
    return response.data
  } catch (error) {
    console.error('Failed to get policies of ticket: ', error)
  }
}
