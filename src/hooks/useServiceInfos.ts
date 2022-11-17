import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { Service } from '@/client-sdk'
import type { HookInfosType } from 'src/types'

export function useServiceInfos(serviceId: string): HookInfosType<Service> {
  const { servicesApi } = useTdpClient()
  const [initialInfos, setInitialInfos] = useState<Service>(null)
  const [newVariables, setNewVariables] = useState<Service['variables']>(null)

  useEffect(() => {
    async function fetchServiceInfos() {
      const res = await servicesApi.getServiceApiV1ServiceServiceIdGet(
        serviceId
      )
      setInitialInfos(res.data)
    }
    serviceId && fetchServiceInfos()
  }, [servicesApi, serviceId])

  async function sendVariables(message: string) {
    const res = await servicesApi.patchServiceApiV1ServiceServiceIdPatch(
      serviceId,
      { message, variables: newVariables }
    )
    //TODO: display success
  }

  return { initialInfos, setNewVariables, sendVariables }
}
