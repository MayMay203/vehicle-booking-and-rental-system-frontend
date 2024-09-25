
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from "./layouts"
import { LoginModal, RegisterModal } from "./Modals"

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
    </div>
  )
}

export default App
