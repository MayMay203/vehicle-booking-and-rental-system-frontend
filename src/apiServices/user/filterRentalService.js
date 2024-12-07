import * as httpRequestV2 from '~/utils/httpRequestV2'

export const filterRentalService = async (location, manufacturer, vehicle_type, service_type) => {
  try {
    const response = await httpRequestV2.get(
      `user/vehicle-register/filters-rental-service?location=${location}&manufacturer=${manufacturer}&vehicle_type=${vehicle_type}&service_type=${service_type}`,
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
