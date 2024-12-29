import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllOrderRental } from '~/apiServices/user/getAllOrderRental'
import { getAllTicketOrders } from '~/apiServices/user/getAllTicketOrders'

const initialState = {
  myTicketOrders: {},
  myRentalOrders: [],
}

export const fetchAllMyTicketOrders = createAsyncThunk(
  'orders/fetchAllMyOrders',
  async ({ isGone = undefined, isCanceled, page }) => {
    // console.log(isGone)
    const data = await getAllTicketOrders(isCanceled, page, isGone)
    return data || {}
  },
)
export const fetchAllMyRentalOrders = createAsyncThunk('orders/fetchAllMyRentalOrders', async ({ status }) => {
  // console.log(isGone)
  const data = await getAllOrderRental(status)
  return data || []
})

const orderSlice = createSlice({
  name: 'manageOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMyTicketOrders.fulfilled, (state, action) => {
        state.myTicketOrders = action.payload
      })
      .addCase(fetchAllMyRentalOrders.fulfilled, (state, action) => {
        state.myRentalOrders = action.payload
      })
  },
})

export default orderSlice.reducer
