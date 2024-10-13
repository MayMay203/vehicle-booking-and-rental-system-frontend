import { createContext, useContext, useState } from 'react'

const GlobalModalContext = createContext()
function GlobalModalProvider({ children }) {
  const [modal, setModal] = useState({
    expiredSession: false,
    logout: false,
  })

  const openGlobalModal = (modalType) => {
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const closeGlobalModal = (modal) => {
    setModal((prev) => ({ ...prev, [modal]: false }))
  }

  const value = {
    isOpenGlobalModal: modal,
    openGlobalModal,
    closeGlobalModal,
  }

  return <GlobalModalContext.Provider value={value}>{children}</GlobalModalContext.Provider>
}

export default GlobalModalProvider
export const useGlobalModal = () => useContext(GlobalModalContext)
