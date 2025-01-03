import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllOrder } from '~/apiServices/rentalPartner/getAllOrder'
import { getAllVehicleRental } from '~/apiServices/rentalPartner/getAllVehicleRental'
import { statsRental } from '~/apiServices/rentalPartner/statsRental'
import { getAllVehicleTypes } from '~/apiServices/user/getAllVehicleTypes'

const initialState = {
  vehicleTypeList: [],
  vehicleList: [],
  orderList: [],
  statsRental: [],
}
export const fetchAllVehicleTypes = createAsyncThunk('rentalPartner/getAllVehicleTypes', async () => {
  const data = await getAllVehicleTypes()
  return data.result || []
})
export const fetchAllVehicle = createAsyncThunk('rentalPartner/getAllVehicle', async ({typeService, status}) => {
  const data = await getAllVehicleRental(typeService, status)
  return data || []
})
export const fetchAllOrder = createAsyncThunk('rentalPartner/getAllOrder', async () => {
  const data = await getAllOrder()
  return data || []
})
export const fetchStatsRental = createAsyncThunk(
  'busPartner/getStatsRental',
  async ({ location, vehicleType, year, month, startDate, endDate, statsBy }) => {
    const data = await statsRental(location, vehicleType, year, month, startDate, endDate, statsBy)
    console.log('dataaaa:', data)
    return data || []
  },
)
const rentalPartnerSlice = createSlice({
  name: 'manageRentalPartner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVehicleTypes.fulfilled, (state, action) => {
        state.vehicleTypeList = action.payload
      })
      .addCase(fetchAllVehicle.fulfilled, (state, action) => {
        state.vehicleList = action.payload
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.orderList = action.payload
      })
      .addCase(fetchStatsRental.fulfilled, (state, action) => {
        state.statsRental = action.payload
      })
  },
})
export default rentalPartnerSlice.reducer
