
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import { useDispatch} from 'react-redux'
import ChangePassword from './Modals/AuthModal/ChangePassword'
// import { config } from './config'
import VoucherModal from './Modals/GeneralModal/VoucherModal'
import DetailDriverPartner from './Modals/GeneralModal/DetailDriverPartnerModal'
import UtilityModal from './Modals/GeneralModal/UtilityModal'
import FeeServiceModal from './Modals/GeneralModal/FeeServiceModal'

function App() {
  const dispatch = useDispatch()
  console.log('re-render app.js')

  useEffect(() => {
    dispatch(checkLogin())
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
          {/* <Route path="*" element={<Navigate to={config.routes.error} />} /> */}
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
        <UtilityModal />
        <FeeServiceModal />
        <VoucherModal />
        <DetailDriverPartner />
      </Router>
    </div>
  )
}

export default App
