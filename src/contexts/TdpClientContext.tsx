import { createContext, useContext } from 'react'
import { DefaultApi, ComponentsApi, DeployApi, ServicesApi } from '@/client-sdk'
import config from 'src/config'
import { useAuth } from 'react-oidc-context'
import axios from 'axios'

type TdpClientType = {
  defaultApi: DefaultApi
  componentsApi: ComponentsApi
  deployApi: DeployApi
  servicesApi: ServicesApi
}

const TdpClientContext = createContext<TdpClientType | null>(null)

export const TdpClientContextProvider = ({ children }) => {
  const auth = useAuth()

  const axiosInstance = axios.create({
    baseURL: config.apiBasePath,
  })

  auth.user &&
    axiosInstance.interceptors.request.use((config) => {
      const token = auth.user.access_token
      token
        ? (config.headers.Authorization = `Bearer ${token}`)
        : delete axiosInstance.defaults.headers.common.Authorization
      return config
    })

  const tdpClient = {
    defaultApi: new DefaultApi(null, config.apiBasePath, axiosInstance),
    componentsApi: new ComponentsApi(null, config.apiBasePath, axiosInstance),
    deployApi: new DeployApi(null, config.apiBasePath, axiosInstance),
    servicesApi: new ServicesApi(null, config.apiBasePath, axiosInstance),
  }

  return (
    <TdpClientContext.Provider value={tdpClient}>
      {children}
    </TdpClientContext.Provider>
  )
}

export const useTdpClient = (): TdpClientType => {
  const tdpClient = useContext(TdpClientContext)
  if (!tdpClient)
    throw new Error('useTdpClient must be inside a TdpClientContextProvider')

  return tdpClient
}
