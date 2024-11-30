import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBusTypeByID } from '~/apiServices/busPartner/fetchBusTypeByID'
import { getAllBusTypes } from '~/apiServices/busPartner/getAllBusTypes'

const initialState = {
  busTypeList: [],
  inforBusType: {},
  busList: [],
}
export const allBusTypes = createAsyncThunk('busPartner/getAllBusTypes', async () => {
  const data = await getAllBusTypes()
  return data || []
})
export const busTypeByID = createAsyncThunk('busPartner/getInforBusTypeByID', async ({ id }) => {
  const data = await fetchBusTypeByID(id)
  return data || {}
})
const busPartnerSlice = createSlice({
  name: 'manageBusPartner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allBusTypes.fulfilled, (state, action) => {
        state.busTypeList = action.payload
      })
      .addCase(busTypeByID.fulfilled, (state, action) => {
        state.inforBusType = action.payload
      })
  },
})
export default busPartnerSlice.reducer
