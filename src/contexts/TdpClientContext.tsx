import { createContext, useContext, useMemo } from 'react'
import { Configuration, createTdpClientInstance, TdpClient } from 'src/clients'
import config from 'src/config'
import { authenticationMiddleware } from 'src/middlewares'

const TdpClientContext = createContext<TdpClient>(null)

export const TdpClientContextProvider = ({ children }) => {
  const tdpClient = useMemo(() => {
    const configuration = new Configuration({
      basePath: config.apiBasePath,
      middleware: [authenticationMiddleware],
    })
    return createTdpClientInstance(configuration)
  }, [])

  return (
    <TdpClientContext.Provider value={tdpClient}>
      {children}
    </TdpClientContext.Provider>
  )
}

//TODO: move hook in the hooks dir
export function useTdpClient() {
  const tdpClient = useContext(TdpClientContext)
  if (!tdpClient)
    throw new Error(
      'useTdpClient() hook must be inside a TdpClientContextProvider'
    )

  return tdpClient
}
