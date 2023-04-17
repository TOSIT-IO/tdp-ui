import Link from 'next/link'
import { toast } from 'react-toastify'

import { emptyApi } from 'src/features/api/emptyApi'
import { useAppDispatch } from 'src/store'

type UserInput = {
  serviceId: string
  variables: object
  components: {
    id: string
    variables: object
  }[]
}

export function usePutServiceConfig() {
  const dispatch = useAppDispatch()

  async function putVariablesServiceWide({
    userInput,
    message,
  }: {
    userInput: UserInput
    message: string
  }) {
    if (!userInput && !userInput.variables && !userInput.components) {
      toast.info('No variables to change')
      return
    }
    let patchedIds = []
    if (userInput.variables) {
      const { data } = await dispatch(
        emptyApi.endpoints.patchServiceApiV1ServiceServiceIdPatch.initiate({
          serviceId: userInput.serviceId,
          serviceUpdate: {
            message,
            variables: userInput.variables,
          },
        })
      )
      if (data) patchedIds.push(userInput.serviceId)
    }
    if (userInput.components) {
      userInput.components.forEach(async (component) => {
        const { data } = await dispatch(
          emptyApi.endpoints.patchComponentApiV1ServiceServiceIdComponentComponentIdPatch.initiate(
            {
              serviceId: userInput.serviceId,
              componentId: component.id,
              componentUpdate: {
                message,
                variables: component.variables,
              },
            }
          )
        )
        if (data) patchedIds.push(component.id)
      })
    }
    if (patchedIds.length > 0)
      toast.success(
        <Link href="/deploy/new">
          Variables successfully updated for {userInput.serviceId}. Click to
          configure a new deployment
        </Link>
      )
  }

  return putVariablesServiceWide
}
