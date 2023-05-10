import Link from 'next/link'
import { toast } from 'react-toastify'

import {
  usePutServiceApiV1ServiceServiceIdPutMutation,
  usePutComponentApiV1ServiceServiceIdComponentComponentIdPutMutation,
} from 'src/store/api/tdpApi'
import { useAppDispatch, useAppSelector } from 'src/store'
import { clearUserInput } from 'src/store/slices/userInput'

export const usePutVariables = () => {
  const dispatch = useAppDispatch()
  const [putService] = usePutServiceApiV1ServiceServiceIdPutMutation()
  const [putComponent] =
    usePutComponentApiV1ServiceServiceIdComponentComponentIdPutMutation()
  const userInput = useAppSelector((state) => state.userInput)

  const putVariables = async ({ message }: { message: string }) => {
    let patchedIds = []
    if (userInput.variables) {
      const result = await putService({
        serviceId: userInput.id,
        serviceUpdate: {
          message,
          variables: userInput.variables,
        },
      })
      if ('data' in result && result.data) patchedIds.push(userInput.id)
    }
    if (userInput.components) {
      await Promise.all(
        userInput.components.map(async (component) => {
          const result = await putComponent({
            serviceId: userInput.id,
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
            <b>{userInput.id}</b>&quot; service. Click to configure a new
            deployment.
          </Link>
        </div>
      )
    // Cleanup userInput
    dispatch(clearUserInput())
  }
  return putVariables
}
