import { createContext, useState } from 'react'
import { TdpClient } from 'src/clients'

import type { TdpClientContextValueType } from 'src/types'

const TdpClientContextValue = (): TdpClientContextValueType => {
  const { defaultApi, componentsApi, deployApi, servicesApi } = TdpClient()
  const [isServerRunning, setIsServerRunning] = useState(null)
  const [servicesList, setServicesList] = useState([])

  async function getStatus() {
    setTimeout(async () => {
      const res = await defaultApi.rootGet()
      setIsServerRunning(!!res.data)
    }, 1000)
  }
  getStatus()

  async function getServicesList() {
    const res = await servicesApi.getServicesApiV1ServiceGet()
    setServicesList(res.data.map((service) => service.id))
  }
  getServicesList()

  return { isServerRunning, servicesList }
}

export const TdpClientContext = createContext<null | TdpClientContextValueType>(
  null
)

export const TdpClientContextProvider = ({ children }) => {
  const tdpClientContextValue = TdpClientContextValue()

  return (
    <TdpClientContext.Provider value={tdpClientContextValue}>
      {children}
    </TdpClientContext.Provider>
  )
}
