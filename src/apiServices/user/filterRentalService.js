import * as httpRequestV2 from '~/utils/httpRequestV2'

export const filterRentalService = async (location, manufacturer, vehicle_type, service_type, start_date, end_date) => {
  try {
    const response = await httpRequestV2.get(
      `user/vehicle-register/filters-rental-service?location=${location}&manufacturer=${manufacturer}&vehicle_type=${vehicle_type}&service_type=${service_type}&start_date=${start_date}&end_date=${end_date}`,
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
