import { createSlice } from '@reduxjs/toolkit'

export const generalModalNames = {
  LOGOUT: 'logout',
  EXPIRED_SESSION: 'session',
  LOCK_ACCOUNT: 'lock-account',
  UNLOCK_ACCOUNT: 'unlock-account',
  CANCEL_PARTNER: 'cancelPartner',
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
}

const initialState = {
  confirm: {
    isOpen: false,
    title: '',
    description: '',
    name: '',
    id: '',
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
  },
  loading: false,
  detailPartner: {
    isOpen: false,
    id: '',
    status: '',
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
  addVoucher: false,
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
      state.addVoucher = action.payload
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
      console.log(action.payload)
      state.messageModal = {
        ...state.messageModal,
        isOpen,
        conversationId,
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
  setMessageModalVisible
} = generalModalSlice.actions

export default generalModalSlice.reducer
