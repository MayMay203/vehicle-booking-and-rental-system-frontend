
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllVouchers } from '../../apiServices/vouchers/getAllVouchers'

export const fetchAllVouchers = createAsyncThunk(
  'vouchers/fetchAllVouchers',
  async ({page}) => {
    const data = await getAllVouchers(page)
    console.log(data)
    return data || {}
  },
)

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: {
    voucherList: {},
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVouchers.fulfilled, (state, action) => {
        state.voucherList = action.payload
      })
  },
})

export default voucherSlice.reducer
