import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllVehicleRental } from '~/apiServices/rentalPartner/getAllVehicleRental'
import { getAllVehicleTypes } from '~/apiServices/user/getAllVehicleTypes'

const initialState = {
  vehicleTypeList: [],
  vehicleList: [],
}
export const fetchAllVehicleTypes = createAsyncThunk('rentalPartner/getAllVehicleTypes', async () => {
  const data = await getAllVehicleTypes()
  return data.result || []
})
export const fetchAllVehicle = createAsyncThunk('rentalPartner/getAllVehicle', async ({typeService, status}) => {
  const data = await getAllVehicleRental(typeService, status)
  return data || []
})
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
  },
})
export default rentalPartnerSlice.reducer
