import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { Service } from '@/client-sdk'

export function useServiceInfos(serviceId: string): Service {
  const { servicesApi } = useTdpClient()
  const [serviceInfos, setServiceInfos] = useState(null)

  useEffect(() => {
    async function fetchServiceInfos() {
      const res = await servicesApi.getServiceApiV1ServiceServiceIdGet(
        serviceId
      )
      setServiceInfos(res.data)
    }
    serviceId && fetchServiceInfos()
  }, [servicesApi, serviceId])

  return serviceInfos
}
