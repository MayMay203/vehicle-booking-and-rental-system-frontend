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
    type: ''
  },
  buyTicket: {
    isOpen: false,
    type: '',
  },
  loading: false,
  detailPartner: {
    isOpen: false,
    id: '',
    type: '',
    status: '',
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
      const {isOpen, ...modalProps } = action.payload
      state.detailPartner = {
        ...state.detailPartner,
        isOpen,
        ...modalProps
      }
    },
  },
})

export const { setConfirmModalVisible, setTicketModalVisible, setLoadingModalVisible, setDetailModalVisible } =
  generalModalSlice.actions
export default generalModalSlice.reducer
