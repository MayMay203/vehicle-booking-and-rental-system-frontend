import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

const AuthModalContext = createContext()

function AuthModalProvider({ children }) {
  const [modals, setModals] = useState({
    login: false,
    register: false,
    forget: false,
    authCode: false,
    info: false,
    registerAdmin: false,
  })

  const [modalAuthData, setModalAuthData] = useState({})

  const openAuthModal = (modal, data = {}) => {
    setModalAuthData(data)
    setModals((prev) => ({ ...prev, [modal]: true }))
  }

  const closeAuthModal = (modal) => {
    setModals((prev) => ({ ...prev, [modal]: false }))
  }

  const value = {
    isOpenAuthModal: modals,
    modalAuthData,
    openAuthModal,
    closeAuthModal
  }
  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
}

AuthModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthModalProvider
export const useAuthModal = () => useContext(AuthModalContext)
