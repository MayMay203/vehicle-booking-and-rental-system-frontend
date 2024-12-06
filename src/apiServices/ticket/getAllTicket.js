import { config } from '~/config'
import * as httpRequest from '~/utils/httpRequest'
export const getAllTickets = async (currentPage = 1, departureLocation, arrivalLocation, busName, departureDate, sortType) => {
  console.log(departureDate, departureLocation, arrivalLocation, busName)
  try {
    let url = `/v1/user/busTripSchedules?departureDate=${departureDate}&size=${config.variables.pagesize}&page=${currentPage}&departureLocation=${departureLocation}&arrivalProvince=${arrivalLocation}`
    if (busName !== 'all') {
      url += `&filter=busTrip.busPartner.businessPartner.businessName:'${busName}'`
    }
    if (sortType !== 'default') {
      url += `&sort=${sortType}`
    }
    console.log(url)
    const response = await httpRequest.get(url)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Failed to get all tickets: ', error)
  }
}
