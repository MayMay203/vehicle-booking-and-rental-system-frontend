import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllBus } from '~/apiServices/busPartner/fetchAllBuses'
import { getAllBusByBusType } from '~/apiServices/busPartner/getAllBusByBusType'
import { getAllBusTrips } from '~/apiServices/busPartner/getAllBusTrips'
import { getAllBusTypes } from '~/apiServices/busPartner/getAllBusTypes'
import { getAllUtilities } from '~/apiServices/busPartner/getAllUtilities'

const initialState = {
  busTypeList: [],
  // inforBusType: {},
  busList: [],
  // inforBus: {},
  utilityList: [],
  busTrips: [],
  busListByBusType: [],
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
export const fetchAllBusesByBusType = createAsyncThunk('busPartner/getAllBusesByBusType', async (nameBusType) => {
  const data = await getAllBusByBusType(nameBusType)
  console.log('dataaaa:', data)
  return data || {}
})
export const fetchAllBusTrips = createAsyncThunk('busPartner/getAllBusTrips', async ({ dep, des }) => {
  // const { dep, des } = params
  const data = await getAllBusTrips(dep, des)
  console.log('dataaaa:', data.result)
  return data.result || []
})
// export const busTypeByID = createAsyncThunk('busPartner/getInforBusTypeByID', async ({ id }) => {
//   const data = await fetchBusTypeByID(id)
//   return data || {}
// })
// export const busByID = createAsyncThunk('busPartner/getInforBusByID', async ({ id }) => {
//   const data = await detailBusByID(id)
//   console.log('dataaaa:', data)
//   return data || {}
// })
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
      // .addCase(busTypeByID.fulfilled, (state, action) => {
      //   state.inforBusType = action.payload
      // })
      .addCase(fetchAllUtilities.fulfilled, (state, action) => {
        state.utilityList = action.payload
      })
      .addCase(fetchAllBusTrips.fulfilled, (state, action) => {
        state.busTrips = action.payload
      })
      .addCase(fetchAllBusesByBusType.fulfilled, (state, action) => {
        state.busListByBusType = action.payload
      })
      // .addCase(busByID.fulfilled, (state, action) => {
      //   state.inforBus = action.payload
      // })
  },
})
export default busPartnerSlice.reducer
