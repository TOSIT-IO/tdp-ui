import Link from 'next/link'
import { toast } from 'react-toastify'

import { emptyApi } from 'src/store/api/emptyApi'
import { useAppDispatch } from 'src/store'
import { clearUserInput } from 'src/store/slices/userInput'

type UserInput = {
  serviceId: string
  variables: object
  components: {
    id: string
    variables: object
  }[]
}

export const usePutServiceConfig = () => {
  const dispatch = useAppDispatch()

  const putVariablesServiceWide = async ({
    userInput,
    message,
  }: {
    userInput: UserInput
    message: string
  }) => {
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
      await Promise.all(
        userInput.components.map(async (component) => {
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
      )
    }
    if (patchedIds.length > 0)
      toast.success(
        <div>
          <Link href="/deploy/new">
            Variables successfully updated for the &quot;
            <b>{userInput.serviceId}</b>&quot; service. Click to configure a new
            deployment.
          </Link>
        </div>
      )
    // Cleanup userInput
    dispatch(clearUserInput())
  }

  return putVariablesServiceWide
}
