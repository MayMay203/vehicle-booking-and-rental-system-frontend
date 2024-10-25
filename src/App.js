
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from './layouts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Fragment} from 'react'
import {
  AuthCodeModal,
  ForgetPasswordModal,
  LoginModal,
  PersonalModal,
  RegisterAdminModal,
  RegisterModal,
} from './Modals/AuthModal'
import { ConfirmModal, InputConfirmModal, TicketModal } from './Modals/GeneralModal'
// import { useDispatch} from 'react-redux'
// import { checkLogin } from './redux/slices/userSlice'
import Spinner from './components/Spinner'
import { getAccessToken } from "./utils/cookieUtils"

function App() {
  // const dispatch = useDispatch()
  console.log('re-render app.js')
  console.log(getAccessToken())

  // useEffect(() => {
  //   dispatch(checkLogin())
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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
      </Router>
    </div>
  )
}

export default App
