export const getCookieValue = (cookieName) => {
  const cookieArray = document.cookie.split('; ')
  const cookie = cookieArray.find((c) => c.trim().startsWith(`${cookieName}`))
  return cookie ? cookie.split('=')[1] : null
}

export const checkExistCookie = (cookieName) => {
  return document.cookie.split('; ').some((c) => c.trim().startsWith(`${cookieName}=`))
}

export const getAccessToken = () => {
  return getCookieValue('access_token')
}
