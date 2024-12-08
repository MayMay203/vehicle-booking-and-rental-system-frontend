import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllConversation } from '~/apiServices/messageService/getAllConversation'

const initialState = {
  conversationList: [],
}

export const fetchAllConversationsByAcc = createAsyncThunk(
  'conversation/fetchAllConversationsByAcc',
  async ({ accountId, roleAccount }) => {
    const data = await getAllConversation(accountId, roleAccount)
    console.log(data)
    return data || []
  },
)

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllConversationsByAcc.fulfilled, (state, action) => {
      console.log(action.payload)
      state.conversationList = action.payload
    })
  },
})

export default conversationSlice.reducer
