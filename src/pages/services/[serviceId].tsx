import { ReactElement } from 'react'

import { PageTitle } from 'src/components/Layout'
import { NextPageWithLayout } from 'src/types'
import {
  ParamsContextProvider,
  useParamsContext,
} from 'src/components/Services/ParamsContext'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch } from 'src/store'
import {
  setServiceVariables,
  useSelectUserInput,
} from 'src/store/features/userInput'
import { usePutServiceConfig } from 'src/hooks'
import { useGetServiceApiV1ServiceServiceIdGetQuery } from 'src/store/features/api/tdpApi'

const ServicePage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()
  const putVariablesServiceWide = usePutServiceConfig()
  const { currentServiceId } = useParamsContext()
  const { data, isLoading, isSuccess } =
    useGetServiceApiV1ServiceServiceIdGetQuery({
      serviceId: currentServiceId,
    })

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

  if (isLoading) return <p>Loading...</p>

  if (isSuccess)
    return (
      <>
        <PageTitle>Variables configuration</PageTitle>
        {/* key allows to re-render when changing page (as the ParamsContext is shared accross all services/components) */}
        <ServiceVariables
          key={currentServiceId}
          defaultValue={userInput.variables ?? data.variables}
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
