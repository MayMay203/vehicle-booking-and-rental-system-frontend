import { configureStore } from '@reduxjs/toolkit'
import authModalSlice from './slices/authModalSlice'
import generalModalSlice from './slices/generalModalSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    authModal: authModalSlice,
    generalModal: generalModalSlice,
    user: userSlice,
  },
})
