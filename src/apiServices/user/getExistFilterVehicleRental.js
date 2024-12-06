import * as httpRequestV2 from '~/utils/httpRequestV2'

export const getExistFilterVehicleRental = async (properties) => {
  try {
    const response = await httpRequestV2.get(
      `user/vehicle-register/get-exist-filter-properties?properties=${properties}`,
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
