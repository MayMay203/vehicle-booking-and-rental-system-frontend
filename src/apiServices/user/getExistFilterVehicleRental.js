import * as httpRequest from '~/utils/httpRequest'

export const getExistFilterVehicleRental = async (properties) => {
  try {
    const response = await httpRequest.get(
      `user/vehicle-register/get-exist-filter-properties?properties=${properties}`,
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
