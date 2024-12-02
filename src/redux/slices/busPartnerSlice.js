import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { detailBusByID } from '~/apiServices/busPartner/detailBusByID'
import { fetchAllBus } from '~/apiServices/busPartner/fetchAllBuses'
import { fetchBusTypeByID } from '~/apiServices/busPartner/fetchBusTypeByID'
import { getAllBusTypes } from '~/apiServices/busPartner/getAllBusTypes'
import { getAllUtilities } from '~/apiServices/busPartner/getAllUtilities'

const initialState = {
  busTypeList: [],
  inforBusType: {},
  busList: [],
  inforBus: {},
  utilityList: [],
}
export const fetchAllBusTypes = createAsyncThunk('busPartner/getAllBusTypes', async () => {
  const data = await getAllBusTypes()
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchAllUtilities = createAsyncThunk('busPartner/getAllUtilities', async () => {
  const data = await getAllUtilities()
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchAllBuses = createAsyncThunk('busPartner/getAllBuses', async () => {
  const data = await fetchAllBus()
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const busTypeByID = createAsyncThunk('busPartner/getInforBusTypeByID', async ({ id }) => {
  const data = await fetchBusTypeByID(id)
  return data || {}
})
export const busByID = createAsyncThunk('busPartner/getInforBusByID', async ({ id }) => {
  const data = await detailBusByID(id)
  console.log('dataaaa:', data)
  return data || {}
})
const busPartnerSlice = createSlice({
  name: 'manageBusPartner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBusTypes.fulfilled, (state, action) => {
        state.busTypeList = action.payload
      })
      .addCase(fetchAllBuses.fulfilled, (state, action) => {
        state.busList = action.payload
      })
      .addCase(busTypeByID.fulfilled, (state, action) => {
        state.inforBusType = action.payload
      })
      .addCase(fetchAllUtilities.fulfilled, (state, action) => {
        state.utilityList = action.payload
      })
      .addCase(busByID.fulfilled, (state, action) => {
        state.inforBus = action.payload
      })
  },
})
export default busPartnerSlice.reducer
