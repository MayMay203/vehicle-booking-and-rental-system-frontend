
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from "./layouts"
import { AuthCodeModal, ForgetPasswordModal, LoginModal, PersonalModal, RegisterModal, ResetPasswordModal } from "./Modals"
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
      <ToastContainer position="top-center" autoClose={3000}/>
    </div>
  )
}

export default App
