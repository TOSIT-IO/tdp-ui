import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { Service, ServiceUpdateResponse } from '@/client-sdk'
import type { HookInfosType } from 'src/types'
import { toast } from 'react-toastify'

export function useServiceInfos(
  serviceId: string
): HookInfosType<Service, ServiceUpdateResponse> {
  const { servicesApi } = useTdpClient()
  const [initialInfos, setInitialInfos] = useState<Service>(null)
  const [newVariables, setNewVariables] = useState<Service['variables']>({})

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
    res?.data?.message && toast.info(res.data.message)
  }

  return { initialInfos, setNewVariables, sendVariables }
}
