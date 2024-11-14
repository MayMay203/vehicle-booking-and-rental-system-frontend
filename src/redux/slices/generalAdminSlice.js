import { getAllUtilities } from '~/apiServices/manageUtilities/getAllUtilities'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllFeeServices } from '~/apiServices/manageFeeService/getAllFeeService'

const initialState = {
  utilitiesList: [],
  feeServices: [],
}

export const fetchAllUtilities = createAsyncThunk('generalManageAd/fetchAllUtilities', async (args = {}) => {
  const { name = '' } = args
  const data = await getAllUtilities(name)
  return data.result || []
})

export const fetchAllFeeServices = createAsyncThunk('generalManageAd/fetchAllFeeServices', async (args = {}) => {
  const { name = '' } = args
  const data = await getAllFeeServices(name)
  return data.result || []
})

const generalAdminSlice = createSlice({
  name: 'generalManagementAd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUtilities.fulfilled, (state, action) => {
        state.utilitiesList = action.payload
      })
      .addCase(fetchAllFeeServices.fulfilled, (state, action) => {
        state.feeServices = action.payload
      })
  },
})

export default generalAdminSlice.reducer
