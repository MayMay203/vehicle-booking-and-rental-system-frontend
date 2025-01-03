import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllAccounts } from '~/apiServices/getAllAccounts'
import { lockAccount } from '~/apiServices/lockAccount'
import { unlockAccount } from '~/apiServices/unlockAccount'

const initialState = {
  dataAccounts: {},
  isLoading: false,
}

export const fetchAllAccounts = createAsyncThunk('account/getAllAccounts', async (params) => {
  const { email, active, page} = params
  const data = await getAllAccounts(email, active, page)
  return data
})

export const fetchLockAccount = createAsyncThunk('account/lockAccount', async (id) => {
  try {
    const data = await lockAccount(id)
    return data
  } catch (message) {
    console.error(message)
  }
})

export const fetchUnlockAccount = createAsyncThunk('account/unlockAccount', async (id) => {
  try {
    const data = await unlockAccount(id)
    return data
  } catch (message) {
    console.error(message)
  }
})

const accountSlice = createSlice({
  name: 'manageAccount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccounts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataAccounts = action.payload
      })
      .addCase(fetchLockAccount.fulfilled, () => {})
      .addCase(fetchUnlockAccount.fulfilled, () => {})
  },
})

export default accountSlice.reducer
