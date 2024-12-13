import * as httpRequest from '~/utils/httpRequest'
import { getAccessToken } from '~/utils/cookieUtils'
export const getDurationDistance = async (lonDep, latDep, lonDes, latDes) => {
  try {
    const response = await httpRequest.post(
      '/v1/get-duration-distance-for-journey',
      [
        { longitude: lonDep, latitude: latDep },
        { longitude: lonDes, latitude: latDes }
      ],
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw httpRequest.getMessage(error)
  }
}
