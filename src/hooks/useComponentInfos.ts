import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { Component } from '@/client-sdk'

export function useComponentInfos(
  serviceId: string,
  componentId: string
): Component {
  const { componentsApi } = useTdpClient()
  const [componentInfos, setComponentInfos] = useState(null)

  useEffect(() => {
    async function fetchComponentInfos() {
      const res =
        await componentsApi.getComponentApiV1ServiceServiceIdComponentComponentIdGet(
          serviceId,
          componentId
        )
      setComponentInfos(res.data)
    }
    serviceId && componentId && fetchComponentInfos()
  }, [componentsApi, serviceId, componentId])

  return componentInfos
}
