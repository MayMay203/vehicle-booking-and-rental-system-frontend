import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllBus } from '~/apiServices/busPartner/fetchAllBuses'
import { getAllBusByBusType } from '~/apiServices/busPartner/getAllBusByBusType'
import { getAllBusTrips } from '~/apiServices/busPartner/getAllBusTrips'
import { getAllBusTypes } from '~/apiServices/busPartner/getAllBusTypes'
import { getAllScheduleByBusTrip } from '~/apiServices/busPartner/getAllScheduleByBusTrip'
import { getAllSchedulesByIDBus } from '~/apiServices/busPartner/getAllSchedulesByIDBus'
import { getAllTicket } from '~/apiServices/busPartner/getAllTicket'
import { getAllUtilities } from '~/apiServices/busPartner/getAllUtilities'
import { getOrderOfBusTrip } from '~/apiServices/busPartner/getOrderOfBusTrip'
import { statsBusTicket } from '~/apiServices/busPartner/statsBusTicket'

const initialState = {
  busTypeList: [],
  // inforBusType: {},
  busList: [],
  // inforBus: {},
  utilityList: [],
  busTrips: [],
  busListByBusType: [],
  scheduleListByBusID: [],
  scheduleListByBusTrip: [],
  busTicketList: [],
  orderListBusTrip: [],
  statsBusTrip: [],
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
  const data = await getAllBusTrips(dep, des)
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchAllSchedulesByBusID = createAsyncThunk('busPartner/getAllSchedulesByBusID', async ({ idBus }) => {
  const data = await getAllSchedulesByIDBus(idBus)
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchScheduleListByBusTrip = createAsyncThunk('busPartner/getScheduleListByBusTrip', async ({ date, idBusTrip }) => {
  const data = await getAllScheduleByBusTrip(date, idBusTrip)
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchBusTicketList = createAsyncThunk('busPartner/getBusTicketList', async ({ dep, des }) => {
  const data = await getAllTicket(dep, des)
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchOrderListBusTrip = createAsyncThunk('busPartner/getOrderListBusTrip', async ({ id, date }) => {
  const data = await getOrderOfBusTrip(id, date)
  console.log('dataaaa:', data.result)
  return data.result || []
})
export const fetchStatsBusTrip = createAsyncThunk(
  'busPartner/getStatsBusTrip',
  async ({ route, year, month, startDate, endDate, statsBy }) => {
    const data = await statsBusTicket(route, year, month, startDate, endDate, statsBy)
    console.log('dataaaa:', data.result)
    return data.result || []
  },
)
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
      .addCase(fetchAllUtilities.fulfilled, (state, action) => {
        state.utilityList = action.payload
      })
      .addCase(fetchAllBusTrips.fulfilled, (state, action) => {
        state.busTrips = action.payload
      })
      .addCase(fetchAllBusesByBusType.fulfilled, (state, action) => {
        state.busListByBusType = action.payload
      })
      .addCase(fetchAllSchedulesByBusID.fulfilled, (state, action) => {
        state.scheduleListByBusID = action.payload
      })
      .addCase(fetchScheduleListByBusTrip.fulfilled, (state, action) => {
        state.scheduleListByBusTrip = action.payload
      })
      .addCase(fetchBusTicketList.fulfilled, (state, action) => {
        state.busTicketList = action.payload
      })
      .addCase(fetchOrderListBusTrip.fulfilled, (state, action) => {
        state.orderListBusTrip = action.payload
      })
      .addCase(fetchStatsBusTrip.fulfilled, (state, action) => {
        state.statsBusTrip = action.payload
      })
      // .addCase(busByID.fulfilled, (state, action) => {
      //   state.inforBus = action.payload
      // })
  },
})
export default busPartnerSlice.reducer
