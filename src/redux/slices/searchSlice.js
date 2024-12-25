import { createSlice } from '@reduxjs/toolkit'
import { config } from '~/config'

const initialState = {
  searchTicket: {
    departureLocation: config.constants.departureLocation,
    departureDate: config.constants.departureDate,
    arrivalLocation: config.constants.arrivalLocation,
    busName: config.constants.busName,
  },
  searchBusTrip: {
    departureLocation: '',
    arrivalLocation: '',
  },
  searchTicketPartner: {
    departureLocation: '',
    arrivalLocation: '',
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
    setSearchBusTrip: (state, action) => {
      console.log(action.payload)
      state.searchBusTrip = {
        ...state.searchBusTrip,
        ...action.payload,
      }
    },
    setSearchTicketPartner: (state, action) => {
      console.log(action.payload)
      state.searchTicketPartner = {
        ...state.searchTicketPartner,
        ...action.payload,
      }
    },
  },
})

export const { setSearchTicket } = searchSlice.actions
export default searchSlice.reducer
