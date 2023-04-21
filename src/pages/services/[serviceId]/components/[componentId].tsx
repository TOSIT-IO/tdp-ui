import { ReactElement } from 'react'

import { PageTitle } from 'src/components/Layout'
import { NextPageWithLayout } from 'src/types'
import {
  ParamsContextProvider,
  useParamsContext,
} from 'src/components/Services/ParamsContext'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch } from 'src/store'
import { setComponent, useSelectUserInput } from 'src/store/features/userInput'
import { usePutServiceConfig } from 'src/hooks'
import { useGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery } from 'src/store/features/api/tdpApi'

const ComponentPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()
  const putVariablesServiceWide = usePutServiceConfig()
  const { currentServiceId, currentComponentId } = useParamsContext()
  const { data, isLoading, isSuccess } =
    useGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery({
      serviceId: currentServiceId,
      componentId: currentComponentId,
    })

  const userInput = useSelectUserInput()
  const currentComponentVariables = userInput.components.find(
    (c) => c.id === currentComponentId
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

  if (isLoading) return <p>Loading...</p>

  if (isSuccess)
    return (
      <>
        <PageTitle>Variables configuration</PageTitle>
        <ServiceVariables
          // key allows to re-render when changing page (as the ParamsContext is shared accross all services/components)
          key={currentServiceId + currentComponentId}
          defaultValue={currentComponentVariables ?? data.variables}
          onSave={saveVariablesToStore}
          onSubmit={handleSubmit}
        />
      </>
    )
}

ComponentPage.getLayout = function getLayout(page: ReactElement) {
  return <ParamsContextProvider>{page}</ParamsContextProvider>
}

export default ComponentPage
