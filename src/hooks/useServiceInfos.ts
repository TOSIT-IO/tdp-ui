import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { ComponentUpdate, Service, ServiceUpdate } from '@/client-sdk'
import { toast } from 'react-toastify'

export function useServiceInfos(serviceId: string, componentId?: string) {
  const { servicesApi, componentsApi } = useTdpClient()
  const [initialVariablesConfig, setInitialVariablesConfig] = useState({})
  const [newVariables, setNewVariables] = useState<Service['variables']>({})

  useEffect(() => {
    async function fetchComponentVariables() {
      const res =
        await componentsApi.getComponentApiV1ServiceServiceIdComponentComponentIdGet(
          serviceId,
          componentId
        )
      setInitialVariablesConfig(res.data.variables)
    }
    async function fetchServiceVariables() {
      const res = await servicesApi.getServiceApiV1ServiceServiceIdGet(
        serviceId
      )
      setInitialVariablesConfig(res.data.variables)
    }
    componentId ? fetchComponentVariables() : fetchServiceVariables()
  }, [componentsApi, servicesApi, serviceId, componentId])

  async function sendServiceVariables(
    serviceId: string,
    serviceUpdate: ServiceUpdate
  ) {
    const res = await servicesApi.patchServiceApiV1ServiceServiceIdPatch(
      serviceId,
      serviceUpdate
    )
    return res
  }

  async function sendComponentsVariables(
    serviceId: string,
    componentId: string,
    componentUpdate: ComponentUpdate
  ) {
    const res =
      await componentsApi.patchComponentApiV1ServiceServiceIdComponentComponentIdPatch(
        serviceId,
        componentId,
        componentUpdate
      )
    return res
  }

  async function sendVariables(message: string) {
    const res = !componentId
      ? await sendServiceVariables(serviceId, {
          message,
          variables: newVariables,
        })
      : await sendComponentsVariables(serviceId, componentId, {
          message,
          variables: newVariables,
        })
    setNewVariables({})
    res?.data?.message && toast.info(res.data.message)
  }

  return {
    initialVariablesConfig,
    setNewVariables,
    sendVariables,
  }
}
