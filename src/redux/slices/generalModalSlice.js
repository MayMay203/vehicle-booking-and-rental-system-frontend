import { createSlice } from '@reduxjs/toolkit'

export const generalModalNames = {
  LOGOUT: 'logout',
  EXPIRED_SESSION: 'session',
  LOCK_ACCOUNT: 'lock-account',
  UNLOCK_ACCOUNT: 'unlock-account',
  CANCEL_PARTNER: 'cancel-partner',
  CANCEL_TICKET: 'cancel-ticket',
  LOADING: 'loading',
  BUY_TICKET: 'buyTicket',
}

const initialState = {
  confirm: {
    isOpen: false,
    title: '',
    description: '',
    name: '',
  },
  inputConfirm: {
    isOpen: false,
    title: '',
    description: '',
    name: '',
  },
  buyTicket: {
    isOpen: false,
    type: '',
  },
  loading: false,
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
      state[action.payload.modalName] = action.payload.isOpen
    },
  },
})

export const { setConfirmModalVisible, setTicketModalVisible, setLoadingModalVisible } = generalModalSlice.actions
export default generalModalSlice.reducer
