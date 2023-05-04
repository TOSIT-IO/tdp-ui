import Link from 'next/link'
import { toast } from 'react-toastify'

import {
  usePatchServiceApiV1ServiceServiceIdPatchMutation,
  usePatchComponentApiV1ServiceServiceIdComponentComponentIdPatchMutation,
} from 'src/store/api/tdpApi'
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

export const usePatchVariables = () => {
  const dispatch = useAppDispatch()
  const [patchService] = usePatchServiceApiV1ServiceServiceIdPatchMutation()
  const [patchComponent] =
    usePatchComponentApiV1ServiceServiceIdComponentComponentIdPatchMutation()

  const patchVariables = async ({
    userInput,
    message,
  }: {
    userInput: UserInput
    message: string
  }) => {
    let patchedIds = []
    if (userInput.variables) {
      const result = await patchService({
        serviceId: userInput.serviceId,
        serviceUpdate: {
          message,
          variables: userInput.variables,
        },
      })
      if ('data' in result && result.data) patchedIds.push(userInput.serviceId)
    }
    if (userInput.components) {
      await Promise.all(
        userInput.components.map(async (component) => {
          const result = await patchComponent({
            serviceId: userInput.serviceId,
            componentId: component.id,
            componentUpdate: {
              message,
              variables: component.variables,
            },
          })
          if ('data' in result && result.data) patchedIds.push(component.id)
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

  return patchVariables
}
