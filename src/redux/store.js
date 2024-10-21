import { configureStore } from '@reduxjs/toolkit'
import authModalSlice from './slices/authModalSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    authModal: authModalSlice,
    user: userSlice,
  },
})
