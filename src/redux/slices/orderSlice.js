import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTicketOrders } from '~/apiServices/user/getAllTicketOrders'

const initialState = {
  myTicketOrders: {},
}

export const fetchAllMyTicketOrders = createAsyncThunk(
  'orders/fetchAllMyOrders',
  async ({ isGone, isCanceled, page }) => {
    const data = await getAllTicketOrders(isGone, isCanceled, page)
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
