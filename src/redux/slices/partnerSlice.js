import { getAllPartners } from '~/apiServices/getAllPartners'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  partnerList: [],
}

export const fetchAllRegisterPartners = createAsyncThunk('partners/fetchAllRegisterPartners', async ({ partnerType, type }) => {
  const data = await getAllPartners(partnerType, type)
  return data.result || []
})

const partnerSlice = createSlice({
  name: 'managePartners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchAllRegisterPartners.fulfilled, (state, action) => {
        console.log(action.payload)
      state.partnerList = action.payload
    })
  },
})

export default partnerSlice.reducer
