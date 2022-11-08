import { createContext, useContext, useMemo } from 'react'
import { User } from 'oidc-client-ts'
import { useAuth } from 'react-oidc-context'
import { createAxiosInstance, createTdpClientInstance } from 'src/clients'
import config from 'src/config'

const TdpClientContext = createContext(
  createTdpClientInstance(null, config.apiBasePath)
)

export const TdpClientContextProvider = ({ children }) => {
  const { user } = useAuth()
  const tdpClientInstance = useMemo(() => getTdpClientInstance(user), [user])

  function getTdpClientInstance(user: User) {
    const axiosInstance = createAxiosInstance(
      { baseURL: config.apiBasePath },
      user.access_token
    )
    return createTdpClientInstance(null, config.apiBasePath, axiosInstance)
  }

  return (
    <TdpClientContext.Provider value={tdpClientInstance}>
      {children}
    </TdpClientContext.Provider>
  )
}

export const useTdpClient = () => {
  const tdpClient = useContext(TdpClientContext)
  if (!tdpClient)
    throw new Error('useTdpClient must be inside a TdpClientContextProvider')

  return tdpClient
}
