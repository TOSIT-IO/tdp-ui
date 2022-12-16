import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { Service } from '@/client-sdk'
import { toast } from 'react-toastify'

export function useServiceInfos(serviceId: string) {
  const { servicesApi } = useTdpClient()
  const [initialServiceConfig, setInitialServiceConfig] =
    useState<Service>(null)
  const [newVariables, setNewVariables] = useState<Service['variables']>({})

  useEffect(() => {
    async function fetchServiceInfos() {
      const res = await servicesApi.getServiceApiV1ServiceServiceIdGet(
        serviceId
      )
      setInitialServiceConfig(res.data)
    }
    serviceId && fetchServiceInfos()
  }, [servicesApi, serviceId])

  async function sendVariables(message: string) {
    const res = await servicesApi.patchServiceApiV1ServiceServiceIdPatch(
      serviceId,
      { message, variables: newVariables }
    )
    res?.data?.message && toast.info(res.data.message)
  }

  return { initialServiceConfig, setNewVariables, sendVariables }
}
