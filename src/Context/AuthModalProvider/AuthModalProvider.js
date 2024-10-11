import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

const AuthModalContext = createContext()

function AuthModalProvider({ children }) {
  const [modals, setModals] = useState({
    login: false,
    register: false,
    forget: false,
    authCode: false,
    reset: false,
    info: false,
  })

  const [modalData, setModalData] = useState({})

  const openModal = (modal, data = {}) => {
    setModalData(data)
    setModals((prev) => ({ ...prev, [modal]: true }))
  }

  const closeModal = (modal) => {
    setModals((prev) => ({ ...prev, [modal]: false }))
  }

  const value = {
    isOpenModal: modals,
    modalData,
    openModal,
    closeModal
  }
  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
}

AuthModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthModalProvider
export const useAuthModal = () => useContext(AuthModalContext)
