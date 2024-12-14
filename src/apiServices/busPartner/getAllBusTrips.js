import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'

// Function to fetch all bus trips based on departure and arrival locations
export const getAllBusTrips = async (dep, des) => {
  try {
    let filter = ''
    const filters = []

    // Helper function to sanitize input (removes extra spaces and trims)
    const sanitize = (input) => input.replace(/\s+/g, ' ').trim()

    // Check and sanitize 'dep' and 'des'
    if (typeof dep === 'string' && sanitize(dep) !== '') {
      filters.push(`departureLocation: '${sanitize(dep)}'`)
    }
    if (typeof des === 'string' && sanitize(des) !== '') {
      filters.push(`arrivalLocation: '${sanitize(des)}'`)
    }

    // Combine filters into a query string
    if (filters.length > 0) {
      filter += `${filters.join(' and ')}`
    }

    // Debugging logs
    console.log('dep:', dep)
    console.log('des:', des)
    console.log('filters:', filters)
    console.log('filter--', filter)

    // HTTP request to the server
    const response = await httpRequest.get(`/v1/busTrips${filter ? `?filter=${filter}` : ''}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })

    // Return the response data
    return response.data
  } catch (error) {
    console.error('Error fetching bus trips:', error)
    throw httpRequest.getMessage(error)
  }
}
