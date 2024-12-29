import * as httpRequest from '~/utils/httpRequest'

export const getVehicleRental = async (typeService, status, carRentalPartnerID) => {
  try {
    const response = await httpRequest.get(
      `/user/vehicle-register/all?service_type=${typeService}&status=${status}&car_rental_partner_id=${carRentalPartnerID}`
    )
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}
