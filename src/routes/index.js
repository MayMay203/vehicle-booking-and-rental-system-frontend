import { config } from '~/config'
import Home from '~/pages/Home'
import AnswerHub from '~/pages/AnswerHub'
import BuyTicket from '~/pages/BuyTicket'
import RentVehicle from '~/pages/RentalPage/RentVehicle'
import RentalService from '~/pages/RentalPage/RentalService'
import BookVehicle from '~/pages/BookingPage/BookVehicle'
import BookingService from '~/pages/BookingPage/BookingService'
import RegisterPartner from '~/pages/RegisterPartner'
import About from '~/pages/About'
import OrderManagement from '~/pages/OrderManagement'
import HeaderOnly from '~/layouts/HeaderOnly'
import AccountManagement from '~/pages/AccountManagement'
import RentalServiceDetail from '~/pages/RentalPage/RentalServiceDetail'
import RentalOrder from '~/pages/RentalPage/RentalOrder'
import BookingOrder from '~/pages/BookingPage/BookingOrder'

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.ticket,
    component: BuyTicket,
  },
  {
    path: config.routes.renting,
    component: RentVehicle,
  },
  {
    path: config.routes.booking,
    component: BookVehicle,
  },
  {
    path: config.routes.bookingService,
    component: BookingService,
  },
  {
    path: config.routes.bookingOrder,
    component: BookingOrder,
  },
  {
    path: config.routes.partner,
    component: RegisterPartner,
  },
  {
    path: config.routes.answer,
    component: AnswerHub,
  },
  {
    path: config.routes.about,
    component: About,
  },
  {
    path: config.routes.order,
    component: OrderManagement,
    layout: HeaderOnly,
  },
  {
    path: config.routes.account,
    component: AccountManagement,
    layout: HeaderOnly,
  },
  {
    path: config.routes.rentalService,
    component: RentalService,
  },
  {
    path: config.routes.rentalServiceDetail,
    component: RentalServiceDetail,
  },
  {
    path: config.routes.rentalOrder,
    component: RentalOrder,
  },
]

const privateRoutes = []
export { publicRoutes, privateRoutes }
