import { createSlice } from '@reduxjs/toolkit'

export const generalModalNames = {
  LOGOUT: 'logout',
  EXPIRED_SESSION: 'session',
  LOCK_ACCOUNT: 'lock-account',
  UNLOCK_ACCOUNT: 'unlock-account',
  CANCEL_PARTNER: 'cancelPartner',
  CANCEL_RENTAL_ORDER: 'cancelRentalOrder',
  CANCEL_TICKET: 'cancelTicket',
  LOADING: 'loading',
  BUY_TICKET: 'buyTicket',
  DETAIL_PARTNER: 'detailPartner',
  DETAIL_DRIVER_PARTNER: 'detailDriverPartner',
  CANCEL_DRIVER_PARTNER: 'cancelDriverPartner',
  REFUSE_PARTNER: 'refusePartner',
  REFUSE_DRIVER_PARTNER: 'refuseDriverPartner',
  UTILITY_MODAL: 'utilityModal',
  FEE_SERVICE_MODAL: 'feeServiceModal',
  DEL_BUS_TYPE: 'deleteBusType',
  DEL_BUS_TRIP: 'deleteBusTrip',
  DEL_BUS_TRIP_SCHEDULE_ONE_DAY: 'deleteScheduleOneDay',
  DEL_VOUCHER: 'deleteVoucher',
  SUSPENDED_BUS_SCHEDULE: 'suspendedBusSchedule',
  INFOR_RENTAL_ORDER: 'inforRentalOrder',
  UPDATE_STATUS_RENTAL_ORDERS: 'updateStatusRentalOrder'
}

const initialState = {
  confirm: {
    isOpen: false,
    title: '',
    description: '',
    name: '',
    id: '',
    date: '',
    status: '',
    startDate: '',
  },
  inputConfirm: {
    isOpen: false,
    title: '',
    description: '',
    name: '',
    id: '',
    type: '',
  },
  buyTicket: {
    isOpen: false,
    type: '',
    id: '',
    transactionCode: '',
    isNoti: false,
  },
  loading: false,
  detailPartner: {
    isOpen: false,
    id: '',
    status: '',
    isReadonly: false,
  },
  DetailDriverPartner: {
    isOpen: false,
    id: '',
    type: '',
    status: '',
  },
  utilityModal: {
    isOpen: false,
    id: '',
  },
  feeServiceModal: {
    isOpen: false,
    id: '',
  },
  messageModal: {
    isOpen: false,
    conversationId: '',
  },
  addVoucher: {
    isOpen: false,
    voucherId: '',
  },
  detailVoucher: {
    isOpen: false,
    voucherId: '',
  },
  inforRentalOrder: {
    inforVehicle: {},
    transactionCode: '',
  },
}

const generalModalSlice = createSlice({
  name: 'generalModal',
  initialState,
  reducers: {
    setConfirmModalVisible: (state, action) => {
      const { modalType, ...modalProps } = action.payload
      state[modalType] = {
        ...state[modalType],
        ...modalProps,
      }
    },
    setTicketModalVisible: (state, action) => {
      const { name, ...modalProps } = action.payload
      state[name] = {
        ...state[name],
        ...modalProps,
      }
    },
    setLoadingModalVisible: (state, action) => {
      state[action.payload.name] = action.payload.isOpen
    },
    setDetailModalVisible: (state, action) => {
      const { isOpen, ...modalProps } = action.payload
      state.detailPartner = {
        ...state.detailPartner,
        isOpen,
        ...modalProps,
        ...modalProps,
      }
    },
    setDetailDriverModalVisible: (state, action) => {
      const { isOpen, ...modalProps } = action.payload
      state.DetailDriverPartner = {
        ...state.DetailDriverPartner,
        isOpen,
        ...modalProps,
      }
    },
    setAddVoucherVisible: (state, action) => {
      const { isOpen, voucherId = '' } = action.payload
      state.addVoucher = {
        ...state.addVoucher,
        isOpen,
        voucherId,
      }
    },
    setUtilityModal: (state, action) => {
      const { isOpen, id } = action.payload
      state.utilityModal = {
        ...state.utilityModal,
        isOpen,
        id,
      }
    },
    setFeeServiceModal: (state, action) => {
      const { isOpen, id } = action.payload
      state.feeServiceModal = {
        ...state.feeServiceModal,
        isOpen,
        id,
      }
    },
    setMessageModalVisible: (state, action) => {
      const { isOpen, conversationId = '' } = action.payload
      state.messageModal = {
        ...state.messageModal,
        isOpen,
        conversationId,
      }
    },
    setInforRentalOrderModalVisible: (state, action) => {
      const { inforRentalOrder, transactionCode = '' } = action.payload
      state.inforRentalOrder = {
        ...state.inforRentalOrder,
        inforRentalOrder,
        transactionCode,
      }
    },
  },
})

export const {
  setConfirmModalVisible,
  setTicketModalVisible,
  setLoadingModalVisible,
  setDetailModalVisible,
  setDetailDriverModalVisible,
  setAddVoucherVisible,
  setUtilityModal,
  setFeeServiceModal,
  setMessageModalVisible,
  setVoucherModalVisible,
  setInforRentalOrderModalVisible,
} = generalModalSlice.actions

export default generalModalSlice.reducer
