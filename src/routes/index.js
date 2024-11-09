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
import AccountSetting from '~/pages/AccountSetting'
import RentalServiceDetail from '~/pages/RentalPage/RentalServiceDetail'
import RentalOrder from '~/pages/RentalPage/RentalOrder'
import BookingOrder from '~/pages/BookingPage/BookingOrder'
import ResetPassword from '~/pages/ResetPassword'
import Message from '~/pages/Message'
import Authenticate from '~/pages/Authenticate'
import BusTrip from '~/pages/BusPartner/BusTripManage/BusTrip'
import DetailBusTrip from '~/pages/BusPartner/BusTripManage/DetailBusTrip'
import AddBusTrip from '~/pages/BusPartner/BusTripManage/AddBusTrip'
import Bus from '~/pages/BusPartner/BusManage/Bus'
import AddBus from '~/pages/BusPartner/BusManage/AddBus'
import Error from '~/pages/Error'
import { ManageAccounts, ManageParners, ManageUtilities, ManageVouchers, Statistics } from '~/pages/Admin'
import UpdateBus from '~/pages/BusPartner/BusManage/UpdateBus/index.js'
import PolicyManage from '~/pages/BusPartner/PolicyManage'
import StatisticsBus from '~/pages/BusPartner/StatisticsBus'

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
    path: config.routes.accountSetting,
    component: AccountSetting,
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
  {
    path: config.routes.resetPassword,
    component: ResetPassword,
    layout: null,
  },
  {
    path: config.routes.authenticate,
    component: Authenticate,
    layout: null,
  },
  {
    path: config.routes.manageAccounts,
    component: ManageAccounts,
    layout: HeaderOnly,
  },
  {
    path: config.routes.managePartners,
    component: ManageParners,
    layout: HeaderOnly,
  },
  {
    path: config.routes.manageUtilities,
    component: ManageUtilities,
    layout: HeaderOnly,
  },
  {
    path: config.routes.vouchers,
    component: ManageVouchers,
    layout: HeaderOnly,
  },
  {
    path: config.routes.statistics,
    component: Statistics,
    layout: HeaderOnly,
  },
  {
    path: config.routes.busTrip,
    component: BusTrip,
  },
  {
    path: config.routes.detailBusTrip,
    component: DetailBusTrip,
  },
  {
    path: config.routes.addBusTrip,
    component: AddBusTrip,
  },
  {
    path: config.routes.bus,
    component: Bus,
  },
  {
    path: config.routes.addBus,
    component: AddBus,
  },
  {
    path: config.routes.updateBus,
    component: UpdateBus,
  },
  {
    path: config.routes.policyManage,
    component: PolicyManage,
  },
  {
    path: config.routes.statisticsBus,
    component: StatisticsBus,
  },
  {
    path: config.routes.message,
    component: Message,
    layout: HeaderOnly,
  },
  {
    path: config.routes.error,
    component: Error,
    layout: null,
  },
]

const privateRoutes = []
export { publicRoutes, privateRoutes }
