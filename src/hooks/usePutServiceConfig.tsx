import Link from 'next/link'
import { toast } from 'react-toastify'

import { emptyApi } from 'src/features/api/emptyApi'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { useAppDispatch } from 'src/store'

export function usePutServiceConfig() {
  const userInput = useSelectUserInput()
  const dispatch = useAppDispatch()

  async function sendVariables(message: string) {
    if (
      Object.keys(userInput.variables).length === 0 &&
      userInput.components.length === 0
    ) {
      toast.info('No variables to change')
      return
    }
    if (Object.keys(userInput.variables).length !== 0) {
      const { data } = await dispatch(
        emptyApi.endpoints.patchServiceApiV1ServiceServiceIdPatch.initiate({
          serviceId: userInput.id,
          serviceUpdate: {
            message,
            variables: userInput.variables,
          },
        })
      )
      if (data) toast.success(
        <Link href="/deploy/new">
          Variables successfully updated for {userInput.id}
          <br /> click to configure a new deployment
        </Link>
      )
    }
    if (userInput.components.length !== 0) {
      userInput.components.forEach(async (component) => {
        const { data } = await dispatch(
          emptyApi.endpoints.patchComponentApiV1ServiceServiceIdComponentComponentIdPatch.initiate(
            {
              serviceId: userInput.id,
              componentId: component.id,
              componentUpdate: {
                message,
                variables: component.variables,
              },
            }
          )
        )
        if (data) toast.success(
          <Link href="/deploy/new">
            Variables successfully updated for {component.id}
            <br /> click to configure a new deployment
          </Link>
        )
      })
    }
  }

  return putVariablesServiceWide
}
