import { config } from '~/config'
import * as httpRequest from '~/utils/httpRequest'
export const getAllTickets = async (currentPage = 1, departureLocation, arrivalLocation, busName, departureDate) => {
  console.log(departureDate, departureLocation, arrivalLocation, busName)
  try {
    const response = await httpRequest.get(
      `/v1/user/busTripSchedules?size=${config.variables.pagesize}&page=${currentPage}&filter=busTrip.departureLocation: '${departureLocation}' and busTrip.arrivalLocation: '${arrivalLocation}' and busTrip.busPartner.businessPartner.businessName:'${busName}'&departureDate=${departureDate}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get all tickets: ', error)
  }
}
