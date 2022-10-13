import { createContext, useState } from 'react'
import { TdpClient } from 'src/clients'

import type { TdpClientContextValueType } from 'src/types'

const TdpClientContextValue = (): TdpClientContextValueType => {
  const { defaultApi, componentsApi, deployApi, servicesApi } = TdpClient()
  const [isServerRunning, setIsServerRunning] = useState(null)

  async function getStatus() {
    setTimeout(async () => {
      const res = await defaultApi.rootGet()
      setIsServerRunning(!!res.data)
    }, 1000)
  }
  getStatus()

  return { isServerRunning }
}

export const TdpClientContext = createContext<
  undefined | TdpClientContextValueType
>(undefined)

export const TdpClientContextProvider = ({ children }) => {
  const tdpClientContextValue = TdpClientContextValue()

  return (
    <TdpClientContext.Provider value={tdpClientContextValue}>
      {children}
    </TdpClientContext.Provider>
  )
}
