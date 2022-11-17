import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { Service } from '@/client-sdk'

export function useServiceInfos(serviceId: string) {
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

  async function sendVariables() {
    const res = await servicesApi.patchServiceApiV1ServiceServiceIdPatch(
      serviceId,
      { message: 'test', variables: newVariables }
    )
    //TODO: display success
  }

  return { initialInfos, setNewVariables, sendVariables }
}
