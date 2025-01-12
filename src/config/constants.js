export const constants = {
  googleClientId: process.env.REACT_APP_GG_CLIENT_ID,
  redirectUrl: process.env.REACT_APP_REDIRECT_URL,
  authGoogleUrl: process.env.REACT_APP_AUTH_GOOGLE_URL,
  // partner type
  busPartner: 'BUS_PARTNER',
  carRentalPartner: 'CAR_RENTAL_PARTNER',
  driverPartner: 'DRIVER_PARTNER',
  // partner status
  current: 'APPROVED',
  notConfirmed: 'PENDING_APPROVAL',
  cancelled: 'CANCEL',
  pagesize: 5,
  busName: 'all',
  departureLocation: 'Đà Nẵng',
  arrivalLocation: 'Nghệ An',
  departureDate: new Date().toISOString().split('T')[0],
  // notification type
  NEW_BOOKING: 'NEW_BOOKING',
  BOOKING_CANCELLED: 'CANCELED_BOOKING',
  BOOKING_COMPLETED: 'BOOKING_COMPLETED',
  RECEIVED_REGISTER_PARTNER: 'RECEIVED_REGISTER_PARTNER_FORM',
  APPROVAL_REGISTER_PARTNER: 'APPROVAL_REGISTER_PARTNER_FORM',
  CANCELED_REGISTER_PARTNER: 'CANCELED_REGISTER_PARTNER_FORM',
  REFUSED_REGISTER_PARTNER: 'REFUSED_REGISTER_PARTNER_FORM',
  // order type
  BUS_TRIP_ORDER: 'BUS_TRIP_ORDER',
  CAR_RENTAL_ORDER: 'CAR_RENTAL_ORDER',
}