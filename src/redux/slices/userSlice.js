import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: {},
  isLogin: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer
