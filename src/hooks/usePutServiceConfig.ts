import { useTdpClient } from 'src/contexts'
import type { ComponentUpdate, ServiceUpdate } from 'src/clients/tdpClient'
import { toast } from 'react-toastify'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { useAppDispatch } from 'src/store'
import { clearUserInput } from 'src/features/userInput'

export function usePutServiceConfig() {
  const { patchService, patchComponent } = useTdpClient()
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
      dispatch(clearUserInput())
      toast.success('Variables chanded')
    } catch (error) {
      const parsedError = await error.json()
      toast.error(parsedError.detail)
    }
  }

  return {
    sendVariables,
  }
}
