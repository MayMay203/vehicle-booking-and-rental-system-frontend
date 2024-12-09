import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllConversation } from '~/apiServices/messageService/getAllConversation'
import { getAllNotifications } from '~/apiServices/messageService/getAllNotification'

const initialState = {
  conversationList: [],
  notificationList: [],
}

export const fetchAllConversationsByAcc = createAsyncThunk(
  'conversation/fetchAllConversationsByAcc',
  async ({ accountId, roleAccount }) => {
    const data = await getAllConversation(accountId, roleAccount)
    return data?.reverse() || []
  },
)

export const fetchAllNotificationsByAcc = createAsyncThunk(
  'notification/fetchAllNotificationsByAcc',
  async ({ accountId, roleAccount }) => {
    const data = await getAllNotifications(accountId, roleAccount)
    return data?.reverse() || []
  },
)

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConversationsByAcc.fulfilled, (state, action) => {
        state.conversationList = action.payload
      })
      .addCase(fetchAllNotificationsByAcc.fulfilled, (state, action) => {
        state.notificationList = action.payload
      })
  },
})

export default conversationSlice.reducer
