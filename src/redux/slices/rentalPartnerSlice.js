import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllVehicleTypes } from '~/apiServices/user/getAllVehicleTypes'

const initialState = {
  vehicleTypeList: [],
}
export const fetchAllVehicleTypes = createAsyncThunk('rentalPartner/getAllVehicleTypes', async () => {
  const data = await getAllVehicleTypes()
  return data.result || []
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
  },
})
export default rentalPartnerSlice.reducer
