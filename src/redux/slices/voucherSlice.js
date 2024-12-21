
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllVouchers } from '../../apiServices/vouchers/getAllVouchers'
import { getVouchersForUser } from '~/apiServices/vouchers/getVouchersForUser'
import { getAllVouchersInSystem } from '~/apiServices/vouchers/getAllVouchersInSystem'

export const fetchAllVouchers = createAsyncThunk('vouchers/fetchAllVouchers', async ({ page }) => {
  const data = await getAllVouchers(page)
  return data || {}
})

export const fetchAllVouchersForUser = createAsyncThunk('vouchers/fetchAllVouchersForUser', async () => {
  const data = await getVouchersForUser()
  console.log('Lên đây')
  return data || []
})

export const fetchAllVouchersInSystem = createAsyncThunk('vouchers/fetchAllVoucherInSystem', async () => {
  const data = await getAllVouchersInSystem()
  return data || []
})

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: {
    voucherList: {},
    voucherUser: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVouchers.fulfilled, (state, action) => {
        state.voucherList = action.payload
      })
      .addCase(fetchAllVouchersForUser.fulfilled, (state, action) => {
        state.voucherUser = action.payload
      })
      .addCase(fetchAllVouchersInSystem.fulfilled, (state, action) => {
        state.voucherUser = action.payload
      })
  },
})

export default voucherSlice.reducer
