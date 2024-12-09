import { config } from '~/config'
import * as httpRequest from '~/utils/httpRequest'
export const getAllTickets = async (currentPage = 1, departureLocation, arrivalLocation, busName, departureDate, sortType) => {
  try {
    let url = `/v1/user/busTripSchedules?departureDate=${departureDate}&size=${config.variables.pagesize}&page=${currentPage}&departureLocation=${departureLocation}&arrivalProvince=${arrivalLocation}`
    if (busName !== 'all') {
      url += `&filter=busTrip.busPartner.businessPartner.businessName:'${busName}'`
    }
    if (sortType !== 'default') {
      url += `&sort=${sortType}`
    }
    const response = await httpRequest.get(url)
    return response.data
  } catch (error) {
    console.error('Failed to get all tickets: ', error)
  }
}
