import { ReactElement } from 'react'
import { merge } from 'mixme'

import { PageTitle } from 'src/components/Layout'
import { useSelectService } from 'src/features/variables'
import { NextPageWithLayout } from 'src/types'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import {
  ParamsContextProvider,
  useParamsContext,
} from 'src/components/Services/ParamsContext'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch } from 'src/store'
import { setServiceVariables } from 'src/features/userInput'
import { usePutServiceConfig } from 'src/hooks'

const ServicePage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()
  const putVariablesServiceWide = usePutServiceConfig()
  const { currentServiceId } = useParamsContext()
  const {
    value: { variables: initialVariables },
  } = useSelectService(currentServiceId)

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

  if (!userInput.variables) return <p>Loading...</p>

  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      {/* key allows to re-render when changing page (as the ParamsContext is shared accross all services/components) */}
      <ServiceVariables
        key={currentServiceId}
        defaultValue={merge(initialVariables, userInput.variables)}
        onSave={saveVariablesToStore}
        onSubmit={handleSubmit}
      />
    </>
  )
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <ParamsContextProvider>{page}</ParamsContextProvider>
}

export default ServicePage
