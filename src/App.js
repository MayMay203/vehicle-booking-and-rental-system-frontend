
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from "./layouts"
import {
  AuthCodeModal,
  ForgetPasswordModal,
  LoginModal,
  PersonalModal,
  RegisterModal,
  ResetPasswordModal,
} from './Modals/AuthModal'

import { ReasonModal, TicketModal } from './Modals/ServiceModal'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout
            const Page = route.component
            return <Route key={index} path={route.path} element={<Layout>{<Page />}</Layout>}></Route>
          })}
        </Routes>
      </Router>
      {/* Render modals */}
      <LoginModal />
      <RegisterModal />
      <AuthCodeModal />
      <PersonalModal />
      <ResetPasswordModal />
      <ForgetPasswordModal />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{width: '340px',textAlign: 'left', lineHeight: '1.3' }}
      />
      <ReasonModal/>
      <TicketModal />
    </div>
  )
}

export default App
