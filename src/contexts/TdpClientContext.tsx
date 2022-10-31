import { createContext, useContext } from 'react'
import {
  Configuration,
  DefaultApi,
  ComponentsApi,
  DeployApi,
  ServicesApi,
} from '@/client-sdk'
import config from 'src/config/api'

type TdpClientType = {
  defaultApi: DefaultApi
  componentsApi: ComponentsApi
  deployApi: DeployApi
  servicesApi: ServicesApi
}

const apiConfig: Configuration = new Configuration({
  basePath: config.apiBasePath,
})

const TdpClientContext = createContext<TdpClientType>({
  defaultApi: new DefaultApi(apiConfig),
  componentsApi: new ComponentsApi(apiConfig),
  deployApi: new DeployApi(apiConfig),
  servicesApi: new ServicesApi(apiConfig),
})

export const useTdpClient = (): TdpClientType => {
  const tdpClient = useContext(TdpClientContext)
  if (!tdpClient) throw new Error('useTdpClient must be inside a Provider')

  return tdpClient
}
