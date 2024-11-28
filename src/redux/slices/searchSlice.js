import { createSlice } from '@reduxjs/toolkit'
import { config } from '~/config'

const initialState = {
  searchTicket: {
    departureLocation: config.variables.departureLocation,
    departureDate: config.variables.departureDate,
    arrivalLocation: config.variables.arrivalLocation,
    busName: config.variables.busName,
  },
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTicket: (state, action) => {
      console.log(action.payload)
      state.searchTicket = {
        ...state.searchTicket,
        ...action.payload,
      }
    },
  },
})

export const { setSearchTicket } = searchSlice.actions
export default searchSlice.reducer