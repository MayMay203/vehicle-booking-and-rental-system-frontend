
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from './routes'
import { DefaultLayout, ProtectedRoute } from './layouts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Fragment, useEffect } from 'react'
import {
  AuthCodeModal,
  ForgetPasswordModal,
  LoginModal,
  PersonalModal,
  RegisterAdminModal,
  RegisterModal,
} from './Modals/AuthModal'
import { ConfirmModal, DetailPartnerModal, InputConfirmModal, TicketModal } from './Modals/GeneralModal'
import Spinner from './components/Spinner'
import { checkLogin } from './redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import ChangePassword from './Modals/AuthModal/ChangePassword'
import { config } from './config'
import AddUtility from './Modals/GeneralModal/AddUtilityModal'
import VoucherModal from './Modals/GeneralModal/VoucherModal'
import DetailDriverPartner from './Modals/GeneralModal/DetailDriverPartnerModal'
import { setMenu } from './redux/slices/menuSlice'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  console.log('re-render app.js')

  useEffect(() => {
    dispatch(checkLogin())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(currentUser)
    if (currentUser.roles?.includes('ADMIN')) {
      dispatch(setMenu('adminMenu'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout
            const Page = route.component
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute route={route.path}>
                    <Layout>{<Page />}</Layout>
                  </ProtectedRoute>
                }
              ></Route>
            )
          })}
          <Route path="*" element={<Navigate to={config.routes.error} />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{ width: '340px', textAlign: 'left', lineHeight: '1.3' }}
        />
        <LoginModal />
        <AuthCodeModal />
        <ForgetPasswordModal />
        <PersonalModal />
        <RegisterAdminModal />
        <RegisterModal />
        <ConfirmModal />
        <InputConfirmModal />
        <Spinner />
        <TicketModal />
        <ChangePassword />
        <DetailPartnerModal />
        <AddUtility />
        <VoucherModal />
        <DetailDriverPartner />
      </Router>
    </div>
  )
}

export default App
