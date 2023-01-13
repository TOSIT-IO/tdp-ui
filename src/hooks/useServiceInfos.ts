import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'
import type {
  ComponentUpdate,
  Service,
  ServiceUpdate,
} from 'src/clients/tdpClient'
import { toast } from 'react-toastify'

export function useServiceInfos(serviceId: string, componentId?: string) {
  const { getComponent, getService, patchService, patchComponent } =
    useTdpClient()
  const [initialVariablesConfig, setInitialVariablesConfig] = useState({})
  const [newVariables, setNewVariables] = useState<Service['variables']>({})

  useEffect(() => {
    async function fetchComponentVariables() {
      const res = await getComponent(serviceId, componentId)
      setInitialVariablesConfig(res.data.variables)
    }
    async function fetchServiceVariables() {
      const res = await getService(serviceId)
      setInitialVariablesConfig(res.data.variables)
    }
    componentId ? fetchComponentVariables() : fetchServiceVariables()
  }, [getService, getComponent, serviceId, componentId])

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
    res?.data?.message && toast.info(res.data.message)
  }

  return {
    initialVariablesConfig,
    setNewVariables,
    sendVariables,
  }
}
