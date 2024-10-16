
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from "./layouts"
import {
  AuthCodeModal,
  ForgetPasswordModal,
  LoginModal,
  PersonalModal,
  RegisterModal
} from './Modals/AuthModal'

import { ReasonModal, TicketModal } from './Modals/ServiceModal'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {LogoutModal, SessionExpiredModal} from './Modals/GlobalModal'
import { Fragment } from "react"
import Spinner from "./components/Spinner"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout
            const Page = route.component
            return <Route key={index} path={route.path} element={<Layout>{<Page />}</Layout>}></Route>
          })}
        </Routes>
      {/* Render modals */}
      <LoginModal />
      <RegisterModal />
      <AuthCodeModal />
      <PersonalModal />
      <ForgetPasswordModal />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ width: '340px', textAlign: 'left', lineHeight: '1.3' }}
      />
      <ReasonModal />
      <TicketModal />
      <SessionExpiredModal />
      <LogoutModal />
      <Spinner/>
      </Router>
    </div>
  )
}

export default App
