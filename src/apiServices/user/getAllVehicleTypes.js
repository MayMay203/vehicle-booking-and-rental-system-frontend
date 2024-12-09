import * as httpRequest from '~/utils/httpRequest'
export const getAllVehicleTypes = async () => {
  try {
    const response = await httpRequest.get(
      '/v1/vehicle-types',
      //   {
      //   headers: {
      //     Authorization: `Bearer ${getAccessToken()}`,
      //   },
      // }
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
