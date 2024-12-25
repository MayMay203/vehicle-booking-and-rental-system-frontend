export const constants = {
  googleClientId: process.env.REACT_APP_GG_CLIENT_ID,
  redirectUrl: process.env.REACT_APP_REDIRECT_URL,
  authGoogleUrl: process.env.REACT_APP_AUTH_GOOGLE_URL,
  busPartner: 'BUS_PARTNER',
  carRentalPartner: 'CAR_RENTAL_PARTNER',
  driverPartner: 'DRIVER_PARTNER',
  current: 'APPROVED',
  notConfirmed: 'PENDING_APPROVAL',
  cancelled: 'CANCEL',
  pagesize: 3,
  busName: 'all',
  departureLocation: 'Thừa Thiên Huế',
  arrivalLocation: 'Đà Nẵng',
  departureDate: new Date().toISOString().split('T')[0],
  BOOKING_COMPLETED: 'BOOKING_COMPLETED',//type: 2
  BOOKING_CANCELLED: 'CANCELLED', //type:1
  NEW_BOOKING: 'NEW_BOOKING', //type: 0
}