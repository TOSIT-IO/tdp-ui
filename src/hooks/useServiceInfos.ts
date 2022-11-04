import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useServiceInfos(serviceId: string) {
  const { servicesApi } = useTdpClient()
  const [serviceInfos, setServiceInfos] = useState({})

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
