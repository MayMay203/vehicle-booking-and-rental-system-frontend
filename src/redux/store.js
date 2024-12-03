import { configureStore } from '@reduxjs/toolkit'
import authModalSlice from './slices/authModalSlice'
import generalModalSlice from './slices/generalModalSlice'
import userSlice from './slices/userSlice'
import accountSlice from './slices/accountSlice'
import partnerSlice from './slices/partnerSlice'
import menuSlice from './slices/menuSlice'
import generalAdminSlice from './slices/generalAdminSlice'
import searchSlice from './slices/searchSlice'
import orderSlice from './slices/orderSlice'
import busPartnerSlice from './slices/busPartnerSlice'

export const store = configureStore({
  reducer: {
    authModal: authModalSlice,
    generalModal: generalModalSlice,
    user: userSlice,
    accounts: accountSlice,
    partners: partnerSlice,
    menu: menuSlice,
    generalAdmin: generalAdminSlice,
    search: searchSlice,
    orders: orderSlice,
    busPartner: busPartnerSlice,
  },
})
