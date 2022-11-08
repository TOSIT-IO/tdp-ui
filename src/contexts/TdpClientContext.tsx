import { createContext, useContext } from 'react'
import config from 'src/config'
import { useAuth } from 'react-oidc-context'
import { createAxiosInstance } from 'src/clients/axiosClient'
import { createTdpClientInstance } from 'src/clients/tdpClient'
import apiConfig from 'src/config'

const TdpClientContext = createContext(
  createTdpClientInstance(null, config.apiBasePath)
)

export const TdpClientContextProvider = ({ children }) => {
  const auth = useAuth()
  const axiosInstance = createAxiosInstance(
    { baseURL: apiConfig.apiBasePath },
    auth.user && auth.user.access_token
  )
  const tdpClientInstance = createTdpClientInstance(
    null,
    config.apiBasePath,
    axiosInstance
  )

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
