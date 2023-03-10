import { useTdpClient } from 'src/contexts'
import type { ComponentUpdate, ServiceUpdate } from 'src/clients/tdpClient'
import { toast } from 'react-toastify'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { useAppDispatch } from 'src/store'
import { clearUserInput } from 'src/features/userInput'
import { setServiceValue } from 'src/features/variables'
import Link from 'next/link'

export function usePutServiceConfig() {
  const { patchService, patchComponent, getService } = useTdpClient()
  const userInput = useSelectUserInput()
  const dispatch = useAppDispatch()

  async function sendServiceVariables(
    serviceId: string,
    serviceUpdate: ServiceUpdate
  ) {
    return await patchService(serviceId, serviceUpdate)
  }

  async function sendComponentsVariables(
    componentId: string,
    serviceId: string,
    componentUpdate: ComponentUpdate
  ) {
    return await patchComponent(componentId, serviceId, componentUpdate)
  }

  const fetchServices = async () => {
    const service = await getService(userInput.id)
    dispatch(setServiceValue(service))
  }

  async function sendVariables(message: string) {
    if (!userInput.variables && !userInput.components) {
      toast.info('No variables to change')
      return
    }
    try {
      if (userInput.variables) {
        await sendServiceVariables(userInput.id, {
          message,
          variables: userInput.variables,
        })
      }
      if (userInput.components) {
        userInput.components.forEach(async (component) => {
          await sendComponentsVariables(component.id, userInput.id, {
            message,
            variables: component.variables,
          })
        })
      }
      fetchServices()
      dispatch(clearUserInput())
      toast.success(
        <Link href="/deploy/new">
          Variables successfully updated for {userInput.id}
          <br /> click to configure a new deployment
        </Link>
      )
    } catch (error) {
      const parsedError = await error.json()
      toast.error(parsedError.detail)
    }
  }

  return {
    sendVariables,
  }
}
