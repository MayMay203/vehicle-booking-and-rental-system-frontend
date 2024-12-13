import axios from 'axios'

// depth = 3 -> wards
export const getLongitudeLatitude = async (province) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${province}&format=json`)
    return response.data
  } catch (error) {
    console.log('Failed to get Longitude Latitude', error)
  }
}
