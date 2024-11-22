import * as httpRequest from '~/utils/httpRequest'
export const getAllTickets = async (currentPage = 1) => {
  try {
    const response = await httpRequest.get(`/v1/busTripSchedules/available?size=6&page=${currentPage}`)
    return response.data
  } catch (error) {
    console.error('Failed to get all tickets: ', error)
  }
}
