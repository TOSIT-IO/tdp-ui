import {
  Configuration,
  DefaultApi,
  ComponentsApi,
  DeployApi,
  ServicesApi,
} from '@/client-sdk'
import config from 'src/config/api'

import type { TdpClientType } from 'src/types'

export function TdpClient(): TdpClientType {
  const apiConfig: Configuration = new Configuration({
    basePath: config.apiBasePath,
  })

  return {
    defaultApi: new DefaultApi(apiConfig),
    componentsApi: new ComponentsApi(apiConfig),
    deployApi: new DeployApi(apiConfig),
    servicesApi: new ServicesApi(apiConfig),
  }
}
