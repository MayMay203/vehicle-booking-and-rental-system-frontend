import { getAllPartners } from '~/apiServices/getAllPartners'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllDriverPartners } from '~/apiServices/getAllDriverPatners'

const initialState = {
  partnerList: {},
}

export const fetchAllRegisterPartners = createAsyncThunk(
  'partners/fetchAllRegisterPartners',
  async ({ partnerType, status, emailOfRepresentative, page }) => {
    const data = await getAllPartners(partnerType, status, emailOfRepresentative, page)
    return data || {}
  },
)

export const fetchAllDriverPartners = createAsyncThunk(
  'partners/fetchAllDriverPartners',
  async ({ status, email, page }) => {
    const data = await getAllDriverPartners(status, email, page)
    console.log(data)
    return data || {}
  },
)

const partnerSlice = createSlice({
  name: 'managePartners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchAllRegisterPartners.fulfilled, (state, action) => {
      state.partnerList = action.payload
      })
      .addCase(fetchAllDriverPartners.fulfilled, (state, action) => {
      state.partnerList = action.payload
    })
  },
})

export default partnerSlice.reducer
