import { createContext, useContext, useMemo } from 'react'
import { useAuth } from 'react-oidc-context'
import { Configuration, createTdpClientInstance, TdpClient } from 'src/clients'
import { useSelectConfig } from 'src/features/config'
import { authenticationMiddleware, parseErrorMiddleware } from 'src/middlewares'

const TdpClientContext = createContext<TdpClient>(null)

export const TdpClientContextProvider = ({ children }) => {
  const { value: config } = useSelectConfig()
  const { user } = useAuth()

  const tdpClient = useMemo(() => {
    const configuration = new Configuration({
      basePath: config.apiBasePath,
      middleware: [authenticationMiddleware(user), parseErrorMiddleware],
    })
    return createTdpClientInstance(configuration)
  }, [config.apiBasePath, user])

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
