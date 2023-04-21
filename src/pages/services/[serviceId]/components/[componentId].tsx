import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageTitle } from 'src/components/Layout'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch } from 'src/store'
import { setComponent, useSelectUserInput } from 'src/store/features/userInput'
import { usePutServiceConfig } from 'src/hooks'
import { useLazyGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery } from 'src/store/features/api/tdpApi'

const ComponentPage = () => {
  const dispatch = useAppDispatch()
  const putVariablesServiceWide = usePutServiceConfig()
  const {
    isReady,
    query: { serviceId, componentId },
  } = useRouter()
  const currentServiceId = serviceId.toString()
  const currentComponentId = componentId.toString()
  const [getVariables, { data, isLoading, isFetching }] =
    useLazyGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery()

  // Update variables
  useEffect(() => {
    if (isReady) {
      getVariables({
        serviceId: currentServiceId,
        componentId: currentComponentId,
      })
    }
  }, [isReady, currentServiceId, currentComponentId])

  const userInput = useSelectUserInput()
  const currentComponentVariables = userInput.components.find(
    (c) => c.id === componentId
  )?.variables

  function saveVariablesToStore(dirtyVariables: object) {
    if (!dirtyVariables) return
    dispatch(
      setComponent({
        componentId: currentComponentId,
        variables: dirtyVariables,
      })
    )
  }

  function handleSubmit(dirtyVariables: object, message: string) {
    if (!dirtyVariables) return
    putVariablesServiceWide({
      message,
      userInput: {
        serviceId: currentServiceId,
        variables: userInput.variables,
        components: [
          ...userInput.components,
          { id: currentComponentId, variables: dirtyVariables },
        ],
      },
    })
  }

  // TODO: improve behavior, make refreshing smooth
  if (isLoading || isFetching) return <p>Loading...</p>

  if (data) {
    return (
      <>
        <PageTitle>Variables configuration</PageTitle>
        <ServiceVariables
          defaultValue={currentComponentVariables ?? data.variables}
          onSave={saveVariablesToStore}
          onSubmit={handleSubmit}
        />
      </>
    )
  }
}

export default ComponentPage
