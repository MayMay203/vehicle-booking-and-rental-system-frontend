import { createContext, useContext, useState } from 'react'

const ServiceModalContext = createContext()
function ServiceModalProvider({ children }) {

  const [modal, setModal] = useState({
    ticket: false,
    cancel: false,
    lock: false,
  })

  const [serviceModalData, setServiceModalData] = useState({})

  const openServiceModal = (modalType, data = {}) => {
    setServiceModalData(data)
    setModal((prev) => ({ ...prev, [modalType]: true }))
  }

  const closeServiceModal = (modal) => {
    setModal((prev) => ({ ...prev, [modal]: false }))
  }

  const value = {
    serviceModalData,
    isOpenServiceModal: modal,
    openServiceModal,
    closeServiceModal,
  }

  return <ServiceModalContext.Provider value={value}>{children}</ServiceModalContext.Provider>
}

export default ServiceModalProvider
export const useServiceModal = () => useContext(ServiceModalContext)
