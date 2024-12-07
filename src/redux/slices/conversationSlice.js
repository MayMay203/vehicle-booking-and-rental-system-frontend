import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllConversation } from '~/apiServices/messageService/getAllConversation'

const initialState = {
  conversationList: [],
}

export const fetchAllConversationsByAcc = createAsyncThunk(
  'orders/fetchAllMyOrders',
  async ({ accountId, roleAccount }) => {
    // console.log(isGone)
    const data = await getAllConversation(accountId, roleAccount)
    return data.filter(convers => !convers.lastMessage.includes('null')) || []
  },
)

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllConversationsByAcc.fulfilled, (state, action) => {
      state.conversationList = action.payload
    })
  },
})

export default conversationSlice.reducer
