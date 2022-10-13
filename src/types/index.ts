import type {
  DefaultApi,
  ComponentsApi,
  DeployApi,
  ServicesApi,
} from '@/client-sdk'

export type TdpClientType = {
  defaultApi: DefaultApi
  componentsApi: ComponentsApi
  deployApi: DeployApi
  servicesApi: ServicesApi
}

export type TdpClientContextValueType = {
  isServerRunning: boolean
}
