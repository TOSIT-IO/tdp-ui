import { useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type {
  ComponentUpdate,
  Service,
  ServiceUpdate,
} from 'src/clients/tdpClient'
import { toast } from 'react-toastify'

export function useServiceInfos(serviceId: string, componentId?: string) {
  const { patchService, patchComponent } = useTdpClient()
  const [newVariables, setNewVariables] = useState<Service['variables']>({})

  async function sendServiceVariables(
    serviceId: string,
    serviceUpdate: ServiceUpdate
  ) {
    const res = await patchService(serviceId, serviceUpdate)
    return res
  }

  async function sendComponentsVariables(
    serviceId: string,
    componentId: string,
    componentUpdate: ComponentUpdate
  ) {
    const res = await patchComponent(serviceId, componentId, componentUpdate)
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
    res?.message && toast.info(res.message)
  }

  return {
    setNewVariables,
    sendVariables,
  }
}
