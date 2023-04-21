import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { PageTitle } from 'src/components/Layout'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch } from 'src/store'
import {
  setServiceVariables,
  useSelectUserInput,
  clearUserInput,
  setServiceId,
} from 'src/store/features/userInput'
import { usePutServiceConfig } from 'src/hooks'
import { useLazyGetServiceApiV1ServiceServiceIdGetQuery } from 'src/store/features/api/tdpApi'

const ServicePage = () => {
  const dispatch = useAppDispatch()
  const putVariablesServiceWide = usePutServiceConfig()
  const {
    isReady,
    query: { serviceId },
  } = useRouter()
  const currentServiceId = serviceId.toString()

  const [getVariables, { data, isLoading, isSuccess, isFetching }] =
    useLazyGetServiceApiV1ServiceServiceIdGetQuery()

  // Cleanup on switching a service
  useEffect(() => {
    dispatch(clearUserInput())
    dispatch(setServiceId(currentServiceId))
  }, [dispatch, currentServiceId])

  // Update variables
  useEffect(() => {
    if (isReady) {
      getVariables({
        serviceId: currentServiceId,
      })
    }
  }, [isReady, currentServiceId])

  const userInput = useSelectUserInput()

  function saveVariablesToStore(dirtyVariables: object) {
    if (!dirtyVariables) return
    dispatch(setServiceVariables(dirtyVariables))
  }

  function handleSubmit(dirtyVariables: object, message: string) {
    if (!dirtyVariables) return
    putVariablesServiceWide({
      message,
      userInput: {
        serviceId: currentServiceId,
        variables: dirtyVariables,
        components: userInput.components,
      },
    })
  }

  // TODO: improve behavior, make refreshing smooth
  if (isLoading || isFetching) return <p>Loading...</p>

  if (isSuccess)
    return (
      <>
        <PageTitle>Variables configuration</PageTitle>
        {/* key allows to re-render when changing page (as the ParamsContext is shared accross all services/components) */}
        <ServiceVariables
          defaultValue={userInput.variables ?? data.variables}
          onSave={saveVariablesToStore}
          onSubmit={handleSubmit}
        />
      </>
    )
}

export default ServicePage
