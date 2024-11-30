import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyAccount } from '~/apiServices/getMyAccount'
import { refreshToken } from '~/apiServices/refreshToken'
import { checkExistCookie } from '~/utils/cookieUtils'
import { setMenu } from './menuSlice'
import { generalModalNames, setConfirmModalVisible } from './generalModalSlice'
// import { generalModalNames, setConfirmModalVisible } from './generalModalSlice'

const initialState = {
  currentUser: {},
  isLogin: false,
  email: '',
  loading: false,
}

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async () => {
  console.log('Vo day nhá')
  const data = await getMyAccount()
  return data
})

export const checkLogin = createAsyncThunk('user/checkLogin', async (_, { dispatch }) => {
  if (checkExistCookie()) {
    const userData = await getMyAccount()
    if (userData) {
      dispatch(setCurrentUser({ currentUser: userData.accountInfo }))
    }
  } else {
    const response = await refreshToken()
    if (response) {
      const userData = await getMyAccount()
      if (userData) {
        dispatch(setCurrentUser({ currentUser: userData.accountInfo }))
        // localStorage.removeItem('accessToken')
        // localStorage.addItem('accessToken', userData.access_token)
        if (userData.accountInfo.roles.includes('ADMIN')) dispatch(setMenu('adminMenu'))
      }
    } else {
      // dispatch(
      //   setConfirmModalVisible({
      //     modalType: 'confirm',
      //     isOpen: true,
      //     title: 'Thông báo',
      //     description: 'Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!',
      //     name: generalModalNames.EXPIRED_SESSION,
      //   }),
      // )
      dispatch(toggleLogin(false))
    }
  }
})

export const checkLoginSession = createAsyncThunk('user/checkLoginSession', async (_, { dispatch }) => {
  if (checkExistCookie()) return true
  const response = await refreshToken()
  if (!response) {
    dispatch(
      setConfirmModalVisible({
        modalType: 'confirm',
        isOpen: true,
        title: 'Thông báo',
        description: 'Phiên đăng nhập đã kết thúc. Vui lòng đăng nhập lại!',
        name: generalModalNames.EXPIRED_SESSION,
      }),
    )
    dispatch(toggleLogin(false))
    return false
  }
  return true
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isLogin = true
      state.currentUser = action.payload.currentUser
    },
    toggleLogin: (state, action) => {
      state.isLogin = action.payload
    },
    saveEmail: (state, action) => {
      state.email = action.payload
    },
    logout: (state) => {
      state.isLogin = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, () => {
        // state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        // state.loading = false
        state.currentUser = action.payload
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        // state.loading = false
        state.currentUser = action.payload
      })
      .addCase(checkLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(checkLogin.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(checkLogin.rejected, (state) => {
        state.loading = false
      })
      .addCase(checkLoginSession.fulfilled, () => {
        // state.loading = false
      })
  },
})

export const { setCurrentUser, toggleLogin, saveEmail, logout } = userSlice.actions
export default userSlice.reducer
