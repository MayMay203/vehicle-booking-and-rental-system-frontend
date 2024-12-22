import * as httpRequest from '~/utils/httpRequest'
export const getPopularRoutes = async () => {
  try {
    const response = await httpRequest.get('/v1/home-page/popular-routes')
    return response.data
  } catch (error) {
    console.log('Failed to get popular routes ', error)
  }
}
