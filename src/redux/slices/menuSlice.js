import { createSlice } from '@reduxjs/toolkit'
import { config } from '~/config'

const menus = {
  userMenu: [
    { content: 'Trang chủ', to: config.routes.home },
    { content: 'Mua vé', to: config.routes.ticket },
    { content: 'Thuê xe', to: config.routes.renting },
    { content: 'Đặt xe', to: config.routes.booking },
    { content: 'Trở thành đối tác', to: config.routes.partner },
    { content: 'Hỏi đáp', to: config.routes.answer },
    { content: 'Về chúng tôi', to: config.routes.about },
  ],
  adminMenu: [
    { content: 'Tài khoản', to: config.routes.manageAccounts },
    { content: 'Đối tác', to: config.routes.managePartners },
    { content: 'Phí dịch vụ xe', to: config.routes.manageFeeService },
    { content: 'Tiện ích nhà xe', to: config.routes.manageUtilities },
    { content: 'Khuyến mãi', to: config.routes.vouchers },
    { content: 'Thống kê', to: config.routes.statistics },
  ],
  busPartnerMenu: [
    { content: 'Chuyến xe', to: config.routes.busTrip },
    { content: 'Đơn đặt', to: config.routes.accounts },
    { content: 'Loại xe', to: config.routes.statistics },
    { content: 'Thống kê', to: config.routes.vouchers },
  ],
}

const initialState = { currentMenu: menus.userMenu }

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.currentMenu = menus[action.payload]
    },
  },
})

export const { setMenu } = menuSlice.actions
export default menuSlice.reducer
