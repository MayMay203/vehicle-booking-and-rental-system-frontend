import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTicketOrders } from '~/apiServices/user/getAllTicketOrders'

const initialState = {
  myTicketOrders: {},
}

export const fetchAllMyTicketOrders = createAsyncThunk(
  'orders/fetchAllMyOrders',
  async ({ isGone = undefined, isCanceled, page }) => {
    // console.log(isGone)
    const data = await getAllTicketOrders(isCanceled, page, isGone)
    return data || {}
  },
)

const orderSlice = createSlice({
  name: 'manageOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMyTicketOrders.fulfilled, (state, action) => {
      state.myTicketOrders = action.payload
    })
  },
})

export default orderSlice.reducer
