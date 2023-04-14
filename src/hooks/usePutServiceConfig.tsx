import Link from 'next/link'
import { toast } from 'react-toastify'

import { useTdpClient } from 'src/contexts'
import type { ComponentUpdate, ServiceUpdate } from 'src/clients/tdpClient'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { useAppDispatch } from 'src/store'
import { setServiceValue } from 'src/features/variables'

export function usePutServiceConfig() {
  const { putService, putComponent, getService } = useTdpClient()
  const userInput = useSelectUserInput()
  const dispatch = useAppDispatch()

  const refreshService = async () => {
    const service = await getService(userInput.id)
    dispatch(setServiceValue(service))
  }

  const sendServiceVariables = async (
    serviceId: string,
    serviceUpdate: ServiceUpdate
  ) => await putService(serviceId, serviceUpdate)

  const sendComponentsVariables = async (
    componentId: string,
    serviceId: string,
    componentUpdate: ComponentUpdate
  ) => await putComponent(componentId, serviceId, componentUpdate)

  type UserInput = {
    serviceId: string
    variables: object
    components: {
      id: string
      variables: object
    }[]
  }

  const putVariablesServiceWide = ({
    userInput,
    message,
  }: {
    userInput: UserInput
    message: string
  }) => {
    if (!userInput && !userInput.variables && !userInput.components) {
      toast.info('No variables to change')
      return
    }
    try {
      if (userInput) {
        sendServiceVariables(userInput.serviceId, {
          message,
          variables: userInput.variables,
        })
      }
      if (userInput.components) {
        userInput.components.forEach(async (component) => {
          sendComponentsVariables(component.id, userInput.serviceId, {
            message,
            variables: component.variables,
          })
        })
      }
      refreshService()
      toast.success(
        <Link href="/deploy/new">
          Variables successfully updated for {userInput.serviceId}
          <br /> click to configure a new deployment
        </Link>
      )
    } catch (error) {
      const parsedError = error.json()
      toast.error(parsedError.detail)
    }
  }

  return putVariablesServiceWide
}
