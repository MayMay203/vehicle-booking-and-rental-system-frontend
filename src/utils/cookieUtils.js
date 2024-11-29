import { jwtDecode } from 'jwt-decode'

export const getCookieValue = (cookieName) => {
  const cookieArray = document.cookie.split('; ')
  const cookie = cookieArray.find((c) => c.trim().startsWith(`${cookieName}`))
  return cookie ? cookie.split('=')[1] : null
}

export const checkExistCookie = () => {
  // return document.cookie.split('; ').some((c) => c.trim().startsWith(`${cookieName}=`))
  // add localstorage
  const accessToken = localStorage.getItem('accessToken')
  const decode = jwtDecode(accessToken)
  return decode.exp >= Math.ceil(Date.now() / 1000)
}

export const getAccessToken = () => {
  // return getCookieValue('access_token')
  return localStorage.getItem('accessToken')
}
