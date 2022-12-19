import {
  ComponentsApi,
  DefaultApi,
  DeployApi,
  ServicesApi,
  PlanApi,
} from '@/client-sdk'
import type { Configuration, Service, Component } from '@/client-sdk'
import type { AxiosInstance } from 'axios'

export function createTdpClientInstance(
  configuration?: Configuration,
  basePath?: string,
  axiosInstance?: AxiosInstance
) {
  return {
    defaultApi: new DefaultApi(configuration, basePath, axiosInstance),
    componentsApi: new ComponentsApi(configuration, basePath, axiosInstance),
    deployApi: new DeployApi(configuration, basePath, axiosInstance),
    planApi: new PlanApi(configuration, basePath, axiosInstance),
    servicesApi: new ServicesApi(configuration, basePath, axiosInstance),
  }
}

export type VariablesType = Service['variables'] | Component['variables']

export type { Service, Component }
