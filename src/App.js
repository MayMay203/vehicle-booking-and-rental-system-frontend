
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

import { TicketModal } from './Modals/ServiceModal'

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
      <TicketModal />
    </div>
  )
}

export default App
