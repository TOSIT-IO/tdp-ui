import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type { HookInfosType } from 'src/types'
import type { Component, ComponentUpdateResponse } from '@/client-sdk'
import { toast } from 'react-toastify'

export function useComponentInfos(
  serviceId: string,
  componentId: string
): HookInfosType<Component, ComponentUpdateResponse> {
  const { componentsApi } = useTdpClient()
  const [initialInfos, setInitialInfos] = useState<Component>(null)
  const [newVariables, setNewVariables] = useState<Component['variables']>(null)

  useEffect(() => {
    async function fetchComponentInfos() {
      const res =
        await componentsApi.getComponentApiV1ServiceServiceIdComponentComponentIdGet(
          serviceId,
          componentId
        )
      setInitialInfos(res.data)
    }
    serviceId && componentId && fetchComponentInfos()
  }, [componentsApi, serviceId, componentId])

  async function sendVariables(message: string) {
    const res =
      await componentsApi.patchComponentApiV1ServiceServiceIdComponentComponentIdPatch(
        serviceId,
        componentId,
        { message, variables: newVariables }
      )
    res?.data?.message && toast.info(res.data.message)
  }

  return { initialInfos, setNewVariables, sendVariables }
}