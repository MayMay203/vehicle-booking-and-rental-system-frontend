import { getAllUtilities } from '~/apiServices/manageUtilities/getAllUtilities'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  utilitiesList: [],
}

export const fetchAllUtilities = createAsyncThunk('generalManageAd/fetchAllUtilities', async (args = {}) => {
  const { name = '' } = args
  const data = await getAllUtilities(name)
  return data.result || []
})

const generalAdminSlice = createSlice({
  name: 'generalManagementAd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUtilities.fulfilled, (state, action) => {
      state.utilitiesList = action.payload
    })
  },
})

export default generalAdminSlice.reducer
