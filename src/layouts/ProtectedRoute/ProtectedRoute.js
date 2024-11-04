import { useSelector } from 'react-redux'
// import { Navigate, parsePath } from 'react-router-dom'
// import { config } from '~/config'

function ProtectedRoute({ children, route }) {
  const currentUser = useSelector((state) => state.user.currentUser)

  console.log('Current User:', currentUser) // kiểm tra currentUser
  console.log('Current Route:', route) // kiểm tra route

  // let isAdmin = false
  // if (currentUser?.roles) {
  //   isAdmin = currentUser.roles[0] === 'ADMIN'
  // }
  // const isRestrictedRoute = route === config.routes.managePartners || route === config.routes.manageAccounts

  // if (!isAdmin && isRestrictedRoute) {
  //   return <Navigate to={config.routes.error} />
  // }
  return children
}

export default ProtectedRoute
