import * as httpRequestV2 from '~/utils/httpRequestV2'

export const getVehicleRental = async (typeService, status, carRentalPartnerID) => {
  try {
    const response = await httpRequestV2.get(
      `/user/vehicle-register/all?service_type=${typeService}&status=${status}&car_rental_partner_id=${carRentalPartnerID}`
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
