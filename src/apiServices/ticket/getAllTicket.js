import { config } from '~/config'
import * as httpRequest from '~/utils/httpRequest'
export const getAllTickets = async (currentPage = 1, departureLocation, arrivalLocation, busName, departureDate) => {
  console.log(departureDate, departureLocation, arrivalLocation, busName)
  try {
    let url = `/v1/user/busTripSchedules?departureDate=${departureDate}&size=${config.variables.pagesize}&page=${currentPage}&filter=busTrip.departureLocation: '${departureLocation}'`
    if (busName !== 'all') {
      url += ` and busTrip.busPartner.businessPartner.businessName:'${busName}'`
    }
    const response = await httpRequest.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to get all tickets: ', error)
  }
}
