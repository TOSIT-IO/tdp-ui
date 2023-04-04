import { ReactElement } from 'react'
import { merge } from 'mixme'

import { PageTitle } from 'src/components/Layout'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { useSelectComponent } from 'src/features/variables'
import { NextPageWithLayout } from 'src/types'
import {
  ParamsContextProvider,
  useParamsContext,
} from 'src/components/Services/ParamsContext'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch } from 'src/store'
import { setComponent } from 'src/features/userInput'
import { usePutServiceConfig } from 'src/hooks'

const ComponentPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()
  const putVariablesServiceWide = usePutServiceConfig()
  const { currentServiceId, currentComponentId } = useParamsContext()
  const {
    value: { variables: initialVariables },
  } = useSelectComponent(currentServiceId, currentComponentId)

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
    saveVariablesToStore(dirtyVariables)
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

  if (!initialVariables) return <p>Loading...</p>

  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      <ServiceVariables
        // key allows to re-render when changing page (as the ParamsContext is shared accross all services/components)
        key={currentServiceId + currentComponentId}
        defaultValue={merge(initialVariables, currentComponentVariables)}
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
