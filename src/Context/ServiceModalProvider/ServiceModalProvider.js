import { createContext, useContext, useState } from 'react'

const ServiceModalContext = createContext()
function ServiceModalProvider({ children }) {
  const [modal, setModal] = useState({
    ticket: false,
  })

  const [modalData, setModalData] = useState({})

  const openModal = (modal, data = {}) => {
    setModalData(data)
    setModal((prev) => ({ ...prev, [modal]: true }))
  }

  const closeModal = (modal) => {
    setModal((prev) => ({ ...prev, [modal]: false }))
  }

  const value = {
    modalData,
    isOpenModal: modal,
    openModal,
    closeModal,
  }

  return <ServiceModalContext.Provider value={value}>{children}</ServiceModalContext.Provider>
}

export default ServiceModalProvider
export const useServiceModal = () => useContext(ServiceModalContext)
