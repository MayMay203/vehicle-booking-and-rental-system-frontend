import { createSlice } from '@reduxjs/toolkit'

export const modalNames = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT: 'forgot',
  AUTH_CODE: 'authCode',
  INFO: 'info',
  REGISTER_ADMIN: 'registerAdmin',
}

const initialState = {
  login: false,
  register: false,
  forgot: false,
  authCode: false,
  info: false,
  registerAdmin: false,
}

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setAuthModalVisible: (state, action) => {
      const { modalName, isVisible } = action.payload
      state[modalName] = isVisible
    },
  },
})

export const { setAuthModalVisible } = authModalSlice.actions
export default authModalSlice.reducer
