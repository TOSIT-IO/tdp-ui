import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { PageTitle } from 'src/components/Layout'
import {
  ParamsContextProvider,
  VariablesDisplay,
} from 'src/components/Services'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { useSelectComponent } from 'src/features/variables'
import { NextPageWithLayout } from 'src/types'
import { getFirstElementIfArray } from 'src/utils'
import { merge } from 'mixme'

const ComponentPage: NextPageWithLayout = () => {
  const {
    isReady,
    query: { serviceId: tempServiceId, componentId: tempComponentId },
  } = useRouter()
  const serviceId = isReady && getFirstElementIfArray(tempServiceId)
  const componentId = isReady && getFirstElementIfArray(tempComponentId)

  const {
    value: { variables },
  } = useSelectComponent(serviceId, componentId)

  const { components } = useSelectUserInput()
  const userInput =
    components.find((c) => c.id === componentId)?.variables || {}

  if (!variables) return <p>Loading...</p>

  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      {/* key allows to re-render when changing page (as the ParamsContext is shared accross all services/components) */}
      <VariablesDisplay
        key={serviceId + componentId}
        variables={merge(variables, userInput)}
      />
    </>
  )
}

ComponentPage.getLayout = function getLayout(page: ReactElement) {
  return <ParamsContextProvider>{page}</ParamsContextProvider>
}

export default ComponentPage
