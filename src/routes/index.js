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
import Bus from '~/pages/BusPartner/BusManage/Bus'
import AddBus from '~/pages/BusPartner/BusManage/AddBus'
import Error from '~/pages/Error'
import {
  ManageAccounts,
  ManageParners,
  ManageUtilities,
  ManageVouchers,
  Statistics,
  ManageFeeService,
} from '~/pages/Admin'
import UpdateBus from '~/pages/BusPartner/BusManage/UpdateBus/index.js'
import PolicyManage from '~/pages/BusPartner/PolicyManage'
import StatisticsBus from '~/pages/BusPartner/StatisticsBus'
import BusTicket from '~/pages/BusPartner/BusTicketManage/BusTicket'
import ServiceManage from '~/pages/VehiclePartner/ServiceManage/ServiceManage'
import DetailServiceRental from '~/pages/VehiclePartner/ServiceManage/DetailServiceRental'
import AddServiceRental from '~/pages/VehiclePartner/ServiceManage/AddServiceRental'
import EditServiceRental from '~/pages/VehiclePartner/ServiceManage/EditServiceRental'
import PolicyVehicleRental from '~/pages/VehiclePartner/PolicyVehicleRental'
import StatisticsVehicleRental from '~/pages/VehiclePartner/StatisticsVehicleRental'
import OrderManage from '~/pages/VehiclePartner/OrderManage/OrderManage'
import PaymentSuccess from '~/pages/Payment/PaymentSuccess'
import PaymentFailure from '~/pages/Payment/PaymentFairlure'
import BusTypeManage from '~/pages/BusPartner/BusType/BusTypeManage'

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
    path: config.routes.bus,
    component: Bus,
  },
  {
    path: config.routes.addBus,
    component: AddBus,
  },
  {
    path: config.routes.busType,
    component: BusTypeManage,
  },
  {
    path: config.routes.updateBus,
    component: UpdateBus,
  },
  {
    path: config.routes.busTicket,
    component: BusTicket,
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
    path: config.routes.serviceManage,
    component: ServiceManage,
  },
  {
    path: config.routes.detailServiceRental,
    component: DetailServiceRental,
  },
  {
    path: config.routes.editServiceRental,
    component: EditServiceRental,
  },
  {
    path: config.routes.addServiceRental,
    component: AddServiceRental,
  },
  {
    path: config.routes.orderManage,
    component: OrderManage,
  },
  {
    path: config.routes.policyVehicleRental,
    component: PolicyVehicleRental,
  },
  {
    path: config.routes.statisticsVehicleRental,
    component: StatisticsVehicleRental,
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
  {
    path: config.routes.manageFeeService,
    component: ManageFeeService,
    layout: HeaderOnly,
  },
  {
    path: config.routes.paymentSuccess,
    component: PaymentSuccess,
    layout: HeaderOnly,
  },
  {
    path: config.routes.paymentFailure,
    component: PaymentFailure,
    layout: HeaderOnly,
  },
]

const privateRoutes = []
export { publicRoutes, privateRoutes }
